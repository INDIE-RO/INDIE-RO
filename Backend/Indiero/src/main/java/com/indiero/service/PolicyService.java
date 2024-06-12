package com.indiero.service;

import com.indiero.domain.Policy;
import com.indiero.dto.Description;
import com.indiero.dto.OtherInfo;
import com.indiero.dto.Qualification;
import com.indiero.dto.Tag;
import com.indiero.dto.response.DetailPolicyResponse;
import com.indiero.dto.response.PolicyResponse;
import com.indiero.dto.response.UserPolicyResponse;
import com.indiero.repository.PolicyRepository;
import com.indiero.repository.UserPolicyRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PolicyService {
    private final PolicyRepository policyRepository;
    private final UserPolicyRepository userPolicyRepository;
    private final MetadataService metadataService;
    public PolicyService(PolicyRepository policyRepository, UserPolicyRepository userPolicyRepository, MetadataService metadataService) {
        this.policyRepository = policyRepository;
        this.userPolicyRepository = userPolicyRepository;
        this.metadataService = metadataService;
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
        DetailPolicyResponse response = new DetailPolicyResponse();
        response.setId(policy.getId());
        response.setTitle(policy.getTitle());
        response.setPeriod(determinePeriod(policy));
        response.setTags(generateTags(policy));
        response.setUrl(policy.getUrl());

        // 상세내용
        List<Description> description = new ArrayList<>();
        description.add(new Description(policy.getInfo(), policy.getDetail()));
        response.setDescription(description);

        // 신청자격
        List<Qualification> qualification = new ArrayList<>();
        qualification.add(new Qualification(policy.getAge(), policy.getResidenceIncome(), policy.getRestriction(),
                policy.getAdditionalInfo(), policy.getEducation(), policy.getMajor(), policy.getJobStatus()));
        response.setQualification(qualification);

        // 기타사항
        List<OtherInfo> otherInfo = new ArrayList<>();
        otherInfo.add(new OtherInfo(policy.getDocuments(), policy.getContacts()));
        response.setOtherInfo(otherInfo);

        return response;
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
    public UserPolicyResponse getUserPolicy(Integer size, Long lastPolicyId, List<Integer> categoryIds, List<Integer> regionIds, int ageId, Integer sortBy) {

        // id(Integer)들을 DB에 저장된 name(String)으로 변환
        List<String> categoryNames = metadataService.convertCategoryIdsToNames(categoryIds);
        List<String> regionNames = metadataService.convertRegionIdsToNames(regionIds);
        List<Policy> policies = new ArrayList<>();

        long totalCount = userPolicyRepository.countUserPolicies(ageId, categoryNames, regionNames);
        boolean hasNext = false;

        // 조회순 정렬
        if (sortBy != null && sortBy == 2) {
            policies = userPolicyRepository.findPoliciesSortedByViews(ageId, categoryNames, regionNames, lastPolicyId);
        } else {
            // 마감순 정렬
            policies.addAll(userPolicyRepository.findActivePolicies(ageId, categoryNames, regionNames, lastPolicyId));
            policies.addAll(userPolicyRepository.findOngoingPolicies(ageId, categoryNames, regionNames, lastPolicyId));
            policies.addAll(userPolicyRepository.findExpiredPolicies(ageId, categoryNames, regionNames, lastPolicyId));
        }
        List<PolicyResponse> policyResponse = policies.stream()
                .map(this::convertToPolicyResponse)
                .collect(Collectors.toList());

        return new UserPolicyResponse(hasNext, totalCount, policyResponse);

    }

    // 기간 계산
    private String determinePeriod(Policy policy) {
        return "상시".equals(policy.getDuration()) ? null : policy.getStartDate() + " ~ " + policy.getEndDate();
    }

    // 태그 생성
    private List<Tag> generateTags(Policy policy) {
        List<Tag> tags = new ArrayList<>();
        Tag categoryTag = new Tag(1, "분야", policy.getCategory());
        Tag regionTag = new Tag(2, "지역", policy.getRegion());
        Tag openingStatusTag = new Tag(3, "모집현황", determineOpeningStatus(policy));
        Tag dDayTag = new Tag(4, "디데이", "D-" + calculateDDay(policy));

        tags.add(categoryTag);
        tags.add(regionTag);
        tags.add(openingStatusTag);
        tags.add(dDayTag);

        return tags;
    }

    // 모집현황 계산
    private String determineOpeningStatus(Policy policy) {
        if ("상시".equals(policy.getDuration())) {
            return metadataService.getOpeningStatusName(1); // 상시모집
        }
        LocalDate today = LocalDate.now();
        if (policy.getStartDate().isAfter(today)) {
            return metadataService.getOpeningStatusName(3); // 모집 예정
        } else if (policy.getEndDate().isBefore(today)) {
            return metadataService.getOpeningStatusName(4); // 마감
        } else {
            return metadataService.getOpeningStatusName(2); // 모집 중
        }
    }

    private long calculateDDay(Policy policy) {
        return ChronoUnit.DAYS.between(LocalDate.now(), policy.getEndDate());
    }
}
