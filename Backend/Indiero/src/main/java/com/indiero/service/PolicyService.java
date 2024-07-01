package com.indiero.service;

import com.indiero.domain.KeywordCount;
import com.indiero.domain.Policy;
import com.indiero.domain.Word;
import com.indiero.dto.Description;
import com.indiero.dto.OtherInfo;
import com.indiero.dto.Qualification;
import com.indiero.dto.Tag;
import com.indiero.dto.request.AllPolicyParams;
import com.indiero.dto.request.SearchPolicyParams;
import com.indiero.dto.request.UserPolicyParams;
import com.indiero.dto.response.*;
import com.indiero.repository.KeywordRepository;
import com.indiero.repository.PolicyQueryRepository;
import com.indiero.repository.PolicyRepository;
import com.indiero.repository.UserPolicyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PolicyService {
    private final PolicyRepository policyRepository;
    private final UserPolicyRepository userPolicyRepository;
    private final MetadataService metadataService;
    private final PolicyQueryRepository policyQueryRepository;
    private final KeywordRepository keywordRepository;

    private static final int SORT_BY_VIEWS = 2;
    private static final int ALWAYS_OPEN = 1;
    private static final int RECRUITING = 2;
    private static final int RECRUITING_SOON = 3;
    private static final int CLOSED = 4;

    public PolicyService(PolicyRepository policyRepository, UserPolicyRepository userPolicyRepository, MetadataService metadataService, PolicyQueryRepository policyQueryRepository, KeywordRepository keywordRepository) {
        this.policyRepository = policyRepository;
        this.userPolicyRepository = userPolicyRepository;
        this.metadataService = metadataService;
        this.policyQueryRepository = policyQueryRepository;
        this.keywordRepository = keywordRepository;
    }

    // 정책 상세 조회 기능
    public DetailPolicyResponse findPolicyById(Long id) {
        // 조회수 증가
        policyRepository.updateViews(id);

        Policy policy = policyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid policy id: " + id));
        return convertToPolicyDetailResponse(policy);
    }

    private DetailPolicyResponse convertToPolicyDetailResponse(Policy policy) {
        return new DetailPolicyResponse(
                policy.getId(),
                policy.getTitle(),
                determinePeriod(policy),
                generateTags(policy),
                policy.getUrl(),
                List.of(new Description(policy.getInfo(), policy.getDetail())),
                List.of(new Qualification(
                        policy.getAge(), policy.getResidenceIncome(), policy.getRestriction(),
                        policy.getAdditionalInfo(), policy.getEducation(), policy.getMajor(), policy.getJobStatus()
                )),
                List.of(new OtherInfo(policy.getDocuments(), policy.getContacts()))
        );
    }

    // 정책 Response 로 변환
    private PolicyResponse convertToPolicyResponse(Policy policy) {
        PolicyResponse response = new PolicyResponse();
        response.setId(policy.getId());
        response.setTitle(policy.getTitle());
        response.setPeriod(determinePeriod(policy));
        response.setTags(generateTags(policy));
        return response;
    }

    // 사용자 맞춤정보 조회
    public ListPolicyResponse getUserPolicy(UserPolicyParams params) {
        // id(Integer)들을 DB에 저장된 name(String)으로 변환
        List<String> categoryNames = getCategoryNames(params.getCategoryIds());
        List<String> regionNames = getRegionNames(params.getRegionIds());
        List<Policy> policies = fetchUserPolicies(params.getAgeId(), categoryNames, regionNames, params.getLastPolicyId(), params.getSortBy());
        List<PolicyResponse> policyResponses = policies.stream()
                .map(this::convertToPolicyResponse)
                .collect(Collectors.toList());
        long totalCount = userPolicyRepository.countUserPolicies(params.getAgeId(), categoryNames, regionNames);
        boolean hasNext = false;
        return new ListPolicyResponse(hasNext, totalCount, policyResponses);
    }

    private List<String> getCategoryNames(List<Integer> categoryIds) {
        if (categoryIds == null || categoryIds.isEmpty()) {
            return metadataService.getAllCategoryNames();
        } else {
            return metadataService.convertCategoryIdsToNames(categoryIds);
        }
    }

    private List<Policy> fetchUserPolicies(int ageId, List<String> categoryNames, List<String> regionNames,
                                           Long lastPolicyId, Integer sortBy) {
        if (sortBy != null && sortBy == SORT_BY_VIEWS) {
            return userPolicyRepository.findPoliciesSortedByViews(ageId, categoryNames, regionNames, lastPolicyId);
        } else {
            List<Policy> policies = new ArrayList<>();
            policies.addAll(userPolicyRepository.findActivePolicies(ageId, categoryNames, regionNames, lastPolicyId));
            policies.addAll(userPolicyRepository.findOngoingPolicies(ageId, categoryNames, regionNames, lastPolicyId));
            policies.addAll(userPolicyRepository.findExpiredPolicies(ageId, categoryNames, regionNames, lastPolicyId));
            return policies;
        }
    }

    // 키워드 검색결과 조회
    public ListPolicyResponse searchPolicy(SearchPolicyParams params) {
        String query = preprocessQuery(params.getQuery());
        boolean isIndependenceQuery = isIndependenceQuery(query);
        long totalCount = countPolicies(query, isIndependenceQuery);
        List<Policy> policies = fetchPoliciesSorted(query, params.getSortBy(), isIndependenceQuery);
        List<PolicyResponse> policyResponses = policies.stream()
                .map(this::convertToPolicyResponse)
                .collect(Collectors.toList());
        boolean hasNext = false;
        return new ListPolicyResponse(hasNext, totalCount, policyResponses);
    }

    // query 공백 제거 및 첫 단어만 가져오기
    public static String preprocessQuery(String query) {
        if (query == null || query.isEmpty()) {
            return "";
        }
        return query.trim().split("\\s+")[0];
    }

    @Transactional
    public void saveOrUpdateKeyword(String query) {
        String keyword = preprocessQuery(query);
        if (!keyword.isEmpty()) {
            KeywordCount keywordCount = keywordRepository.findById(keyword)
                    .orElse(new KeywordCount());
            keywordCount.setKeyword(keyword);
            keywordCount.setCount(keywordCount.getCount() + 1);
            keywordRepository.save(keywordCount);
        }
    }

    // 자립준비청년 특화 검색 키워드인지 확인하기
    private boolean isIndependenceQuery(String query) {
        return "자립".equals(query) || "준비".equals(query) || "자립준비".equals(query);
    }

    private long countPolicies(String query, boolean isIndependenceQuery) {
        return isIndependenceQuery ? policyQueryRepository.countIndependencePolicies(query)
                : policyQueryRepository.countCommonPolicies(query);
    }

    private List<Policy> fetchPoliciesSorted(String query, Integer sortBy, boolean isIndependenceQuery) {
        // 조회순
        if (sortBy != null && sortBy == SORT_BY_VIEWS) {
            return isIndependenceQuery ? policyQueryRepository.findIndependencePoliciesSortedByViews(query)
                    : policyQueryRepository.findCommonPoliciesSortedByViews(query);
        } else {
            // 마감순
            return isIndependenceQuery ? fetchIndependencePolicies(query) : fetchCommonPolicies(query);
        }
    }

    private List<Policy> fetchIndependencePolicies(String query) {
        List<Policy> policies = new ArrayList<>();
        policies.addAll(policyQueryRepository.findActiveIndependencePolicies(query));
        policies.addAll(policyQueryRepository.findOngoingIndependencePolicies(query));
        policies.addAll(policyQueryRepository.findExpiredIndependencePolicies(query));
        return policies;
    }

    private List<Policy> fetchCommonPolicies(String query) {
        List<Policy> policies = new ArrayList<>();
        policies.addAll(policyQueryRepository.findActiveCommonPolicies(query));
        policies.addAll(policyQueryRepository.findOngoingCommonPolicies(query));
        policies.addAll(policyQueryRepository.findExpiredCommonPolicies(query));
        return policies;
    }

    // 모두보기 결과 조회
    public ListPolicyResponse getAllPolicy(AllPolicyParams params) {
        String categoryName = metadataService.getCategoryName(params.getCategoryId());
        List<String> regionNames = getRegionNames(params.getRegionIds());
        List<Policy> policies;

        if (params.getAgeId() == 0) {
            policies = fetchPoliciesWithoutAgeFilter(categoryName, regionNames, params.getSortBy());
        } else {
            policies = fetchPoliciesWithAgeFilter(params.getAgeId(), categoryName, regionNames, params.getSortBy());
        }

        policies = filterByOpeningStatus(policies, params.getOpeningStatusId());
        List<PolicyResponse> policyResponses = policies.stream()
                .map(this::convertToPolicyResponse)
                .collect(Collectors.toList());
        boolean hasNext = false;
        long totalCount = policyResponses.size();
        return new ListPolicyResponse(hasNext, totalCount, policyResponses);
    }

    private List<String> getRegionNames(List<Integer> regionIds) {
        if (regionIds == null || regionIds.isEmpty()) {
            return metadataService.getAllRegionNames();
        } else {
            return metadataService.convertRegionIdsToNames(regionIds);
        }
    }

    private List<Policy> fetchPoliciesWithoutAgeFilter(String categoryName, List<String> regionNames, Integer sortBy) {
        if (sortBy != null && sortBy == SORT_BY_VIEWS) {
            return policyRepository.findPoliciesSortedByViews(categoryName, regionNames);
        } else {
            return fetchGeneralPolicies(categoryName, regionNames);
        }
    }

    private List<Policy> fetchGeneralPolicies(String categoryName, List<String> regionNames) {
        List<Policy> policies = new ArrayList<>();
        policies.addAll(policyRepository.findActivePolicies(categoryName, regionNames));
        policies.addAll(policyRepository.findOngoingPolicies(categoryName, regionNames));
        policies.addAll(policyRepository.findExpiredPolicies(categoryName, regionNames));
        return policies;
    }

    private List<Policy> fetchPoliciesWithAgeFilter(int ageId, String categoryName, List<String> regionNames, Integer sortBy) {
        if (sortBy != null && sortBy == SORT_BY_VIEWS) {
            return policyRepository.findPoliciesSortedByViews(ageId, categoryName, regionNames);
        } else {
            return fetchAgeFilteredPolicies(ageId, categoryName, regionNames);
        }
    }

    private List<Policy> fetchAgeFilteredPolicies(int ageId, String categoryName, List<String> regionNames) {
        List<Policy> policies = new ArrayList<>();
        policies.addAll(policyRepository.findActivePolicies(ageId, categoryName, regionNames));
        policies.addAll(policyRepository.findOngoingPolicies(ageId, categoryName, regionNames));
        policies.addAll(policyRepository.findExpiredPolicies(ageId, categoryName, regionNames));
        return policies;
    }

    private List<Policy> filterByOpeningStatus(List<Policy> policies, Integer openingStatusId) {
        if (openingStatusId == null) return policies;
        return policies.stream()
                .filter(policy -> determineOpeningStatusId(policy) == openingStatusId)
                .collect(Collectors.toList());
    }

    // 워드클라우드 조회
    public WordCloudResponse getWordCloud() {
        List<Word> words = Arrays.asList(
                new Word("지원금", 339),
                new Word("자립수당", 15),
                new Word("장학금", 78),
                new Word("보증금", 262),
                new Word("자립", 1310),
                new Word("보호종료", 210),
                new Word("주택", 203),
                new Word("취업", 672),
                new Word("일자리", 234),
                new Word("창업", 653),
                new Word("자격증", 167),
                new Word("면접", 246),
                new Word("교육", 662),
                new Word("대학생", 170),
                new Word("대출", 248)
        );
        return new WordCloudResponse(words);
    }

    // AI 추천 정책 조회
    public Map<String, Object> getRecommendationsById(Long id) {

        List<RecommendationPolicyResponse> recommendedPolicies;
        if (id == null) {
            recommendedPolicies = getDefaultRecommendations();
        } else {
            Policy policy = policyRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid policy id: " + id));

            recommendedPolicies = List.of(
                    new RecommendationPolicyResponse(policy.getS1_id().longValue(), policy.getS1_title()),
                    new RecommendationPolicyResponse(policy.getS2_id().longValue(), policy.getS2_title())
            );
        }

        Map<String, Object> response = new HashMap<>();
        response.put("recommendedPolicies", recommendedPolicies);

        return response;
    }

    private List<RecommendationPolicyResponse> getDefaultRecommendations() {
        return List.of(
                new RecommendationPolicyResponse(1821L, "2024년 자립준비청년(청년 유형) 전세임대"),
                new RecommendationPolicyResponse(1830L, "자립준비청년 의료비 지원 사업")
        );
    }

    // 기간 계산
    private String determinePeriod(Policy policy) {
        return "상시".equals(policy.getDuration()) ? null : policy.getStartDate() + " ~ " + policy.getEndDate();
    }

    // 태그 생성
    private List<Tag> generateTags(Policy policy) {
        List<Tag> tags = new ArrayList<>();
        tags.add(new Tag(1, "분야", policy.getCategory()));
        tags.add(new Tag(2, "지역", policy.getRegion()));
        tags.add(new Tag(3, "모집현황", determineOpeningStatus(policy)));
        tags.add(new Tag(4, "디데이", "D-" + calculateDDay(policy)));
        return tags;
    }

    // 모집현황 계산
    private String determineOpeningStatus(Policy policy) {
        return metadataService.getOpeningStatusName(determineOpeningStatusId(policy));
    }

    private int determineOpeningStatusId(Policy policy) {
        if ("상시".equals(policy.getDuration())) {
            return ALWAYS_OPEN; // 상시모집
        }
        LocalDate today = LocalDate.now();
        if (policy.getStartDate().isAfter(today)) {
            return RECRUITING_SOON; // 모집 예정
        } else if (policy.getEndDate().isBefore(today)) {
            return CLOSED; // 마감
        } else {
            return RECRUITING; // 모집 중
        }
    }

    private long calculateDDay(Policy policy) {
        LocalDate endDate = policy.getEndDate();
        if (endDate == null) {
            return -1;
        }
        return ChronoUnit.DAYS.between(LocalDate.now(), endDate);
    }
}
