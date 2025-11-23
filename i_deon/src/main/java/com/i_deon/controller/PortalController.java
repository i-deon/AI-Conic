package com.i_deon.controller;

import com.i_deon.dto.request.PortalAnalyzeRequest;
import com.i_deon.dto.response.PortalAnalyzeResponse;
import com.i_deon.service.PortalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/portal")
@RequiredArgsConstructor
@Tag(name = "Portal API", description = "포털 감정 분석 API")
public class PortalController {

    private final PortalService portalService;

    @Operation(summary = "감정 분석", description = "입력된 감정을 분석하여 추천 수호자를 반환합니다.")
    @PostMapping("/analyze")
    public PortalAnalyzeResponse analyzeEmotion(@RequestBody PortalAnalyzeRequest request) {
        return portalService.analyzeEmotion(request);
    }
}
