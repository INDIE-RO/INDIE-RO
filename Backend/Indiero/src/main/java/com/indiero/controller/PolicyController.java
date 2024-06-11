package com.indiero.controller;

import com.indiero.dto.response.DetailPolicyResponse;
import com.indiero.service.PolicyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
