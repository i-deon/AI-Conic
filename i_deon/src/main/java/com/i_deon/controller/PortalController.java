package com.i_deon.controller;

import com.i_deon.dto.request.PortalAnalyzeRequest;
import com.i_deon.dto.response.PortalAnalyzeResponse;
import com.i_deon.service.PortalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/portal")
@RequiredArgsConstructor
public class PortalController {

    private final PortalService portalService;

    @PostMapping("/analyze")
    public PortalAnalyzeResponse analyzeEmotion(@RequestBody PortalAnalyzeRequest request) {
        return portalService.analyzeEmotion(request);
    }
}
