package com.i_deon.service;

import com.i_deon.domain.*;
import com.i_deon.dto.response.MissionCompleteResponse;
import com.i_deon.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MissionService {

    private final UserRepository userRepository;
    private final AnalysisReportRepository reportRepository;
    private final GuardianAffinityRepository affinityRepository;

    private static final int BASE_EXP_GAIN = 50;
    private static final int AFFINITY_GAIN = 1;

    @Transactional
    public MissionCompleteResponse completeMissionByEmail(String email, Long reportId) {
        // 1. 유저 조회
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // 2. 리포트 조회 및 검증
        AnalysisReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new IllegalArgumentException("Report not found"));

        if (!report.getUser().getUserId().equals(user.getUserId())) {
            throw new IllegalArgumentException("This report does not belong to the user");
        }

        // 3. 이미 완료된 미션인지 확인
        if (report.isMissionCleared()) {
            throw new IllegalStateException("Mission already completed");
        }

        // 4. 미션 완료 처리
        report.setMissionCleared(true);

        // 5. 경험치 획득 및 레벨업 처리
        int expGained = BASE_EXP_GAIN;
        boolean leveledUp = false;

        int newExp = user.getCurrentExp() + expGained;

        while (newExp >= user.getMaxExp()) {
            newExp -= user.getMaxExp();
            user.setLevel(user.getLevel() + 1);
            user.setMaxExp(calculateNextLevelExp(user.getLevel()));
            leveledUp = true;
        }
        user.setCurrentExp(newExp);

        // 6. 수호자 친밀도 증가
        GuardianType guardianType = GuardianType.valueOf(report.getMissionType());
        GuardianAffinity affinity = affinityRepository.findByUserAndGuardianType(user, guardianType)
                .orElseGet(() -> createNewAffinity(user, guardianType));

        affinity.setAffinityLevel(affinity.getAffinityLevel() + AFFINITY_GAIN);

        if (affinity.getAffinityLevel() % 5 == 0) {
            affinity.setStoryProgress(affinity.getStoryProgress() + 1);
        }

        affinityRepository.save(affinity);

        // 7. 응답 생성
        return new MissionCompleteResponse(
                report.getReportId(),
                true,
                new MissionCompleteResponse.UserLevelInfo(
                        user.getLevel(),
                        user.getCurrentExp(),
                        user.getMaxExp(),
                        leveledUp
                ),
                new MissionCompleteResponse.GuardianAffinityInfo(
                        affinity.getGuardianType().name(),
                        affinity.getAffinityLevel(),
                        affinity.getStoryProgress()
                ),
                expGained
        );
    }

    // === 헬퍼 메서드 ===

    private int calculateNextLevelExp(int level) {
        return (int) (100 * Math.pow(1.5, level - 1));
    }

    private GuardianAffinity createNewAffinity(User user, GuardianType guardianType) {
        return GuardianAffinity.builder()
                .user(user)
                .guardianType(guardianType)
                .affinityLevel(1)
                .storyProgress(1)
                .build();
    }
}
