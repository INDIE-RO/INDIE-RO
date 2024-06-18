package com.indiero.controller;

import com.indiero.dto.request.AllPolicyParams;
import com.indiero.dto.request.SearchPolicyParams;
import com.indiero.dto.request.UserPolicyParams;
import com.indiero.dto.response.DetailPolicyResponse;
import com.indiero.dto.response.ListPolicyResponse;
import com.indiero.dto.response.WordCloudResponse;
import com.indiero.service.PolicyService;
import org.springframework.web.bind.annotation.*;

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
    public ListPolicyResponse getUserPolicy(@ModelAttribute UserPolicyParams params) {
        return policyService.getUserPolicy(params);
    }

    // 키워드 검색결과 조회
    @GetMapping("/search")
    public ListPolicyResponse searchPolicy(@ModelAttribute SearchPolicyParams params) {
        return policyService.searchPolicy(params);
    }

    // 모두보기 결과 조회
    @GetMapping
    public ListPolicyResponse getAllPolicy(@ModelAttribute AllPolicyParams params) {
        return policyService.getAllPolicy(params);
    }

    // 워드클라우드 조회
    @GetMapping("/wordCloud")
    public WordCloudResponse getWordCloud() {
        return policyService.getWordCloud();
    }
}
