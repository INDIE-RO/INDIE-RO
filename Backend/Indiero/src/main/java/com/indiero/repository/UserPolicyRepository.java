package com.indiero.repository;

import com.indiero.domain.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserPolicyRepository extends JpaRepository<Policy, Long> {

    /*
    마감순 정렬
    1. 진행 중이면서 마감 날짜와 오늘 날짜의 차이가 가장 작은 순
    2. 상시 정책
    3. 마감되었지만 마감 날짜와 오늘 날짜의 차이가 가장 작은 순
     */

    String USER_FILTER_CONDITIONS =
            "(p.ageCode LIKE %:ageId% AND p.category IN :categoryNames AND p.region IN :regionNames AND (:lastPolicyId IS NULL OR p.id < :lastPolicyId))";

    // 1. 진행 중인 정책
    @Query("SELECT p FROM Policy p WHERE (" + USER_FILTER_CONDITIONS + ") AND p.endDate >= CURRENT_DATE ORDER BY p.endDate ASC")
    List<Policy> findActivePolicies (
            @Param("ageId") Integer ageId,
            @Param("categoryNames") List<String> categoryNames,
            @Param("regionNames") List<String> regionNames,
            @Param("lastPolicyId") Long lastPolicyId
    );

    // 2. 상시 정책
    @Query("SELECT p FROM Policy p WHERE (" + USER_FILTER_CONDITIONS + ") AND p.duration = '상시'")
    List<Policy> findOngoingPolicies (
            @Param("ageId") Integer ageId,
            @Param("categoryNames") List<String> categoryNames,
            @Param("regionNames") List<String> regionNames,
            @Param("lastPolicyId") Long lastPolicyId
    );

    // 3. 마감된 정책
    @Query("SELECT p FROM Policy p WHERE (" + USER_FILTER_CONDITIONS + ") AND p.endDate < CURRENT_DATE ORDER BY p.endDate DESC")
    List<Policy> findExpiredPolicies (
            @Param("ageId") Integer ageId,
            @Param("categoryNames") List<String> categoryNames,
            @Param("regionNames") List<String> regionNames,
            @Param("lastPolicyId") Long lastPolicyId
    );

    /*
    조회순 정렬
     */
    @Query("SELECT p FROM Policy p WHERE " + USER_FILTER_CONDITIONS + " ORDER BY p.views DESC")
    List<Policy> findPoliciesSortedByViews(
            @Param("ageId") Integer ageId,
            @Param("categoryNames") List<String> categoryNames,
            @Param("regionNames") List<String> regionNames,
            @Param("lastPolicyId") Long lastPolicyId
    );

    /*
    totalCount 구하기
     */
    @Query("""
        SELECT COUNT(p) FROM Policy p
        WHERE p.ageCode LIKE %:ageId%
        AND p.category IN :categoryNames
        AND p.region IN :regionNames
    """)
    long countUserPolicies(
            @Param("ageId") Integer ageId,
            @Param("categoryNames") List<String> categoryNames,
            @Param("regionNames") List<String> regionNames
    );
}
