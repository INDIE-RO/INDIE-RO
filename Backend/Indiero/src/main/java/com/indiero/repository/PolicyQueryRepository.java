package com.indiero.repository;

import com.indiero.domain.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PolicyQueryRepository extends JpaRepository<Policy, Long> {
    // 자립준비청년 특화 정책 검색 조건
    String INDEPENDENCE_QUERY_CONDITIONS =
            "(p.title LIKE %:query% OR p.info LIKE %:query% OR p.detail LIKE %:query%) OR " +
                    "(p.title LIKE '%자립준비청년%' OR p.info LIKE '%자립준비청년%' OR p.detail LIKE '%자립준비청년%' OR " +
                    "p.title LIKE '%퇴소청소년%' OR p.info LIKE '%퇴소청소년%' OR p.detail LIKE '%퇴소청소년%' OR " +
                    "p.title LIKE '%보호종료아동%' OR p.info LIKE '%보호종료아동%' OR p.detail LIKE '%보호종료아동%' OR " +
                    "p.title LIKE '%위기청소년%' OR p.info LIKE '%위기청소년%' OR p.detail LIKE '%위기청소년%' OR " +
                    "p.title LIKE '%위탁아동%' OR p.info LIKE '%위탁아동%' OR p.detail LIKE '%위탁아동%')";

    /*
    마감순 정렬
    1. 진행 중이면서 마감 날짜와 오늘 날짜의 차이가 가장 작은 순
    2. 상시 정책
    3. 마감되었지만 마감 날짜와 오늘 날짜의 차이가 가장 작은 순
     */
    @Query("SELECT p FROM Policy p WHERE (" + INDEPENDENCE_QUERY_CONDITIONS + ") AND p.endDate >= CURRENT_DATE ORDER BY p.endDate ASC")
    List<Policy> findActiveIndependencePolicies(@Param("query") String query);
    @Query("SELECT p FROM Policy p WHERE p.duration = '상시' AND (" + INDEPENDENCE_QUERY_CONDITIONS + ")")
    List<Policy> findOngoingIndependencePolicies(@Param("query") String query);
    @Query("SELECT p FROM Policy p WHERE (" + INDEPENDENCE_QUERY_CONDITIONS + ") AND p.endDate < CURRENT_DATE ORDER BY p.endDate DESC")
    List<Policy> findExpiredIndependencePolicies(@Param("query") String query);

    // 조회순 정렬
    @Query("SELECT p FROM Policy p WHERE " + INDEPENDENCE_QUERY_CONDITIONS + " ORDER BY p.views DESC")
    List<Policy> findIndependencePoliciesSortedByViews(@Param("query") String query);

    // totalCount
    @Query("SELECT COUNT(p) FROM Policy p WHERE " + INDEPENDENCE_QUERY_CONDITIONS)
    long countIndependencePolicies(@Param("query") String query);

    // 일반 정책 검색 조건
    String COMMON_QUERY_CONDITIONS =
            "(p.title LIKE %:query% OR p.info LIKE %:query% OR p.detail LIKE %:query%)";

    // 마감순 정렬
    @Query("SELECT p FROM Policy p WHERE (" + COMMON_QUERY_CONDITIONS + ") AND p.endDate >= CURRENT_DATE ORDER BY p.endDate ASC")
    List<Policy> findActiveCommonPolicies(@Param("query") String query);
    @Query("SELECT p FROM Policy p WHERE p.duration = '상시' AND (" + COMMON_QUERY_CONDITIONS + ")")
    List<Policy> findOngoingCommonPolicies(@Param("query") String query);
    @Query("SELECT p FROM Policy p WHERE (" + COMMON_QUERY_CONDITIONS + ") AND p.endDate < CURRENT_DATE ORDER BY p.endDate DESC")
    List<Policy> findExpiredCommonPolicies(@Param("query") String query);

    // 조회순 정렬
    @Query("SELECT p FROM Policy p WHERE " + COMMON_QUERY_CONDITIONS + " ORDER BY p.views DESC")
    List<Policy> findCommonPoliciesSortedByViews(@Param("query") String query);

    // totalCount
    @Query("SELECT COUNT(p) FROM Policy p WHERE " + COMMON_QUERY_CONDITIONS)
    long countCommonPolicies(@Param("query") String query);
}
