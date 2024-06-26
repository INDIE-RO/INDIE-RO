package com.indiero.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class ListPolicyResponse {
    private boolean hasNext;
    private long totalCount;
    private List<PolicyResponse> policies;

    public ListPolicyResponse(boolean hasNext, long totalCount, List<PolicyResponse> policies) {
        this.hasNext = hasNext;
        this.totalCount = totalCount;
        this.policies = policies;
    }
}
