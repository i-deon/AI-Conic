package com.i_deon.dto.response;

public record MissionCompleteResponse(
        Long reportId,
        boolean missionCleared,
        UserLevelInfo userLevelInfo,
        GuardianAffinityInfo guardianAffinity,
        int expGained
) {
    public record UserLevelInfo(
            int level,
            int currentExp,
            int maxExp,
            boolean leveledUp
    ) {}

    public record GuardianAffinityInfo(
            String guardianType,
            int affinityLevel,
            int storyProgress
    ) {}
}
