package com.indiero.dto.request;

import lombok.Getter;

import java.util.List;

@Getter
public class AllPolicyParams {
    private Integer size;
    private Long lastPolicyId;
    private int sortBy = 1;
    private int categoryId = 1;
    private Integer openingStatusId;
    private Integer ageId = 0;
    private List<Integer> regionIds;
}
