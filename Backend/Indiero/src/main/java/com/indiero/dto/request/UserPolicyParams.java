package com.indiero.dto.request;

import lombok.Getter;

import java.util.List;

@Getter
public class UserPolicyParams {
    private Integer size;
    private Long lastPolicyId;
    private List<Integer> categoryIds;
    private List<Integer> regionIds;
    private int ageId;
    private int sortBy;
}
