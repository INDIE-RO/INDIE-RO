package com.indiero.repository;

import com.indiero.domain.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {

    // 조회수 증가
    @Modifying
    @Transactional
    @Query("UPDATE Policy p SET p.views = p.views + 1 WHERE p.id = :id")
    void updateViews(Long id);
}
