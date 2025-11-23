package com.i_deon.dto.response;

public record GuardianCodexResponse(
        String guardianId,
        int affinityLevel,
        int unlockedChapterCount
) {}