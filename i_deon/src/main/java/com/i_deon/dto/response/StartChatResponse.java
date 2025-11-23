package com.i_deon.dto.response;

public record StartChatResponse(
        Long sessionId,
        String greeting
) {}