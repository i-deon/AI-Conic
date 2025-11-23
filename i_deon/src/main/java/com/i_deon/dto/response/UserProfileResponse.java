package com.i_deon.dto.response;

import java.util.List;

public record UserProfileResponse(
        String nickname,
        int level,
        int currentExp,
        int maxExp,
        String title,
        EqStats eqStats,
        List<CollectedBoss> collectedBosses
) {
    public record EqStats(
            int WARMTH,
            int ACTION,
            int INSIGHT,
            int STORM
    ) {}

    public record CollectedBoss(
            String name,
            int level
    ) {}
}
