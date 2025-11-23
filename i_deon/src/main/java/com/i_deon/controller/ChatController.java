package com.i_deon.controller;

import com.i_deon.dto.request.EndChatRequest;
import com.i_deon.dto.request.SendMessageRequest;
import com.i_deon.dto.request.StartChatRequest;
import com.i_deon.dto.response.EndChatResponse;
import com.i_deon.dto.response.SendMessageResponse;
import com.i_deon.dto.response.StartChatResponse;
import com.i_deon.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/start")
    public StartChatResponse startChat(
            @RequestHeader("X-USER-ID") Long userId,
            @RequestBody StartChatRequest request
    ) {
        return chatService.startSession(userId, request);
    }

    @PostMapping("/message")
    public SendMessageResponse sendMessage(
            @RequestHeader("X-USER-ID") Long userId,
            @RequestBody SendMessageRequest request
    ) {
        return chatService.sendMessage(userId, request);
    }

    @PostMapping("/end")
    public EndChatResponse endChat(
            @RequestHeader("X-USER-ID") Long userId,
            @RequestBody EndChatRequest request
    ) {
        return chatService.endSession(userId, request);
    }
}
