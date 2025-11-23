package com.i_deon.dto.request;

public record StartChatRequest(
        String guardianType,
        String emotion
) {}