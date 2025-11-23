package com.i_deon.dto.request;

public record SendMessageRequest(
        Long sessionId,
        String content
) {}
