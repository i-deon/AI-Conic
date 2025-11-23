package com.i_deon.dto.response;

public record SendMessageResponse(
        String sender,
        String reply
) {}