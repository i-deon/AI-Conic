package com.i_deon.controller;

import com.i_deon.dto.response.GuardianCodexResponse;
import com.i_deon.dto.response.UserProfileResponse;
import com.i_deon.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "User API", description = "유저 관련 API 모음")
public class UserController {

    private final UserService userService;

    @Operation(summary = "내 프로필 확인")
    @GetMapping("/me")
    public UserProfileResponse getMyProfile(@RequestHeader("X-USER-ID") Long userId) {
        return userService.getMyProfile(userId);
    }

    @GetMapping("/codex")
    public List<GuardianCodexResponse> getCodex(
            @RequestHeader("X-USER-ID") Long userId
    ) {
        return userService.getCodex(userId);
    }
}
