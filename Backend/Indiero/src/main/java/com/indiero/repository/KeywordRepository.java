package com.indiero.repository;

import com.indiero.domain.KeywordCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeywordRepository extends JpaRepository<KeywordCount, String> {
}
