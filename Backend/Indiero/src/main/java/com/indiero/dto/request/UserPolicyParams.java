package com.indiero.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
public class UserPolicyParams {
    private Integer size;
    private Long lastPolicyId;
    private List<Integer> categoryIds;
    private List<Integer> regionIds;
    private int ageId;
    private int sortBy = 1;
}
