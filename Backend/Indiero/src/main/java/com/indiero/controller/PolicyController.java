package com.indiero.controller;

import com.indiero.dto.response.DetailPolicyResponse;
import com.indiero.dto.response.UserPolicyResponse;
import com.indiero.service.PolicyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {

    private final PolicyService policyService;
    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    // 정책 상세 조회
    @GetMapping("/{id}")
    public DetailPolicyResponse findPolicyById(@PathVariable Long id) {
        return policyService.findPolicyById(id);
    }

    // 사용자 맞춤정보 조회
    @GetMapping("/user")
    public UserPolicyResponse getUserPolicy(
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false) Long lastPolicyId,
            @RequestParam List<Integer> categoryIds,
            @RequestParam List<Integer> regionIds,
            @RequestParam int ageId,
            @RequestParam(required = false, defaultValue = "1") int sortBy
    ) {
        return policyService.getUserPolicy(size, lastPolicyId, categoryIds, regionIds, ageId, sortBy);
    }
}
