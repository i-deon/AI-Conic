package com.i_deon.controller;

import com.i_deon.dto.request.EndChatRequest;
import com.i_deon.dto.request.SendMessageRequest;
import com.i_deon.dto.request.StartChatRequest;
import com.i_deon.dto.response.EndChatResponse;
import com.i_deon.dto.response.SendMessageResponse;
import com.i_deon.dto.response.StartChatResponse;
import com.i_deon.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
@Tag(name = "Chat API", description = "챗봇 관련 API")
public class ChatController {

    private final ChatService chatService;

    @Operation(summary = "챗 세션 시작")
    @PostMapping("/start")
    public StartChatResponse startChat(@AuthenticationPrincipal OAuth2User principal, @RequestBody StartChatRequest request) {
        String email = principal.getAttribute("email");
        return chatService.startSessionByEmail(email, request);
    }

    @Operation(summary = "메시지 전송")
    @PostMapping("/message")
    public SendMessageResponse sendMessage(@AuthenticationPrincipal OAuth2User principal, @RequestBody SendMessageRequest request) {
        String email = principal.getAttribute("email");
        return chatService.sendMessageByEmail(email, request);
    }

    @Operation(summary = "챗 세션 종료")
    @PostMapping("/end")
    public EndChatResponse endChat(@AuthenticationPrincipal OAuth2User principal, @RequestBody EndChatRequest request) {
        String email = principal.getAttribute("email");
        return chatService.endSessionByEmail(email, request);
    }
}
