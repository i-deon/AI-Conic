package com.i_deon.controller;

import com.i_deon.dto.response.MissionCompleteResponse;
import com.i_deon.service.MissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/missions")
@RequiredArgsConstructor
public class MissionController {

    private final MissionService missionService;

    @PostMapping("/{reportId}/complete")
    public MissionCompleteResponse completeMission(
            @RequestHeader("X-USER-ID") Long userId,
            @PathVariable Long reportId
    ) {
        return missionService.completeMission(userId, reportId);
    }
}
