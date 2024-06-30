package com.indiero.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RecommendationPolicyResponse {
    private Long id;
    private String title;

    public RecommendationPolicyResponse(Long id, String title) {
        this.id = id;
        this.title = title;
    }
}