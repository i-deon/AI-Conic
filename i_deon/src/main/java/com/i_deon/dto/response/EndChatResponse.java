package com.i_deon.dto.response;

import java.util.List;

public record EndChatResponse(
        Long reportId,
        String date,
        String primaryEmotion,
        List<EmotionStat> stats,
        BossInfo boss,
        String mission
) {
    public record EmotionStat(
            String type,
            int percentage
    ) {}

    public record BossInfo(
            String name,
            String title,
            String description,
            String weakness,
            int level
    ) {}
}
