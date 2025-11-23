package com.i_deon.controller;

import com.i_deon.dto.response.MissionCompleteResponse;
import com.i_deon.service.MissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/missions")
@RequiredArgsConstructor
@Tag(name = "Mission API", description = "미션 완료 관련 API")
public class MissionController {

    private final MissionService missionService;

    @Operation(summary = "미션 완료 처리")
    @PostMapping("/{reportId}/complete")
    public MissionCompleteResponse completeMission(@AuthenticationPrincipal OAuth2User principal,
                                                   @PathVariable Long reportId) {
        String email = principal.getAttribute("email");
        return missionService.completeMissionByEmail(email, reportId);
    }
}
