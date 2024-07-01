package com.indiero.repository;

import com.indiero.domain.Policy;
import com.indiero.dto.response.RecommendationPolicyResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {

    // 조회수 증가
    @Modifying
    @Transactional
    @Query("UPDATE Policy p SET p.views = p.views + 1 WHERE p.id = :id")
    void updateViews(Long id);

    // 모두보기
    @Query("SELECT p FROM Policy p WHERE p.category LIKE %:categoryName% AND p.region IN :regionNames ORDER BY p.views DESC")
    List<Policy> findPoliciesSortedByViews(@Param("categoryName") String categoryName, @Param("regionNames") List<String> regionNames);

    @Query("SELECT p FROM Policy p WHERE p.category LIKE %:categoryName% AND p.region IN :regionNames AND p.endDate >= CURRENT_DATE ORDER BY p.endDate ASC")
    List<Policy> findActivePolicies(@Param("categoryName") String categoryName, @Param("regionNames") List<String> regionNames);

    @Query("SELECT p FROM Policy p WHERE p.category LIKE %:categoryName% AND p.region IN :regionNames AND p.duration = '상시'")
    List<Policy> findOngoingPolicies(@Param("categoryName") String categoryName, @Param("regionNames") List<String> regionNames);


    @Query("SELECT p FROM Policy p WHERE p.category LIKE %:categoryName% AND p.region IN :regionNames AND p.endDate < CURRENT_DATE ORDER BY p.endDate DESC")
    List<Policy> findExpiredPolicies(@Param("categoryName") String categoryName, @Param("regionNames") List<String> regionNames);



    // 모두보기 - 필터링
    String FILTER_QUERY_CONDITIONS =
            "(p.ageCode LIKE %:ageId% AND p.category LIKE %:categoryName% AND p.region IN :regionNames)";

    @Query("SELECT p FROM Policy p WHERE (" + FILTER_QUERY_CONDITIONS + ") AND p.endDate >= CURRENT_DATE ORDER BY p.endDate ASC")
    List<Policy> findActivePolicies (@Param("ageId") int ageId,
                                     @Param("categoryName") String categoryName,
                                     @Param("regionNames") List<String> regionNames);

    @Query("SELECT p FROM Policy p WHERE p.duration = '상시' AND (" + FILTER_QUERY_CONDITIONS + ")")
    List<Policy> findOngoingPolicies(@Param("ageId") int ageId,
                                     @Param("categoryName") String categoryName,
                                     @Param("regionNames") List<String> regionNames);

    @Query("SELECT p FROM Policy p WHERE (" + FILTER_QUERY_CONDITIONS + ") AND p.endDate < CURRENT_DATE ORDER BY p.endDate DESC")
    List<Policy> findExpiredPolicies(@Param("ageId") int ageId,
                                     @Param("categoryName") String categoryName,
                                     @Param("regionNames") List<String> regionNames);

    @Query("SELECT p FROM Policy p WHERE " + FILTER_QUERY_CONDITIONS + " ORDER BY p.views DESC")
    List<Policy> findPoliciesSortedByViews(@Param("ageId") int ageId,
                                           @Param("categoryName") String categoryName,
                                           @Param("regionNames") List<String> regionNames);


    // AI 추천 정책 조회
    @Query
    List<RecommendationPolicyResponse> findRecommendationPoliciesById(Long id);
}
