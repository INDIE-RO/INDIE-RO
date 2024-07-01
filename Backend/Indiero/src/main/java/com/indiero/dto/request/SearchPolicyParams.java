package com.indiero.dto.request;

import lombok.Getter;

@Getter
public class SearchPolicyParams {
    private Integer size;
    private Long lastPolicyId;
    private String query;
    private int sortBy = 1;
}
