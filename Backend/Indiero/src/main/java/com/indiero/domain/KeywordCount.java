package com.indiero.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class KeywordCount {

    @Id
    private String keyword;
    private int count;

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
