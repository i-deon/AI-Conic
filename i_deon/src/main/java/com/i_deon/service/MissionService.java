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

    private final AnalysisReportRepository reportRepository;
    private final UserRepository userRepository;
    private final GuardianAffinityRepository affinityRepository;

    private static final int BASE_EXP_GAIN = 50;
    private static final int AFFINITY_GAIN = 1;

    @Transactional
    public MissionCompleteResponse completeMission(Long userId, Long reportId) {
        // 1. 리포트 조회 및 검증
        AnalysisReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new IllegalArgumentException("Report not found"));

        // 2. 유저 검증 (본인의 리포트인지 확인)
        if (!report.getUser().getUserId().equals(userId)) {
            throw new IllegalArgumentException("This report does not belong to the user");
        }

        // 3. 이미 완료된 미션인지 확인
        if (report.isMissionCleared()) {
            throw new IllegalStateException("Mission already completed");
        }

        // 4. 미션 완료 처리
        report.setMissionCleared(true);

        // 5. 유저 조회
        User user = report.getUser();

        // 6. 경험치 획득 및 레벨업 처리
        int expGained = BASE_EXP_GAIN;
        boolean leveledUp = false;

        int newExp = user.getCurrentExp() + expGained;

        // 레벨업 체크 (여러 레벨 상승 가능)
        while (newExp >= user.getMaxExp()) {
            newExp -= user.getMaxExp();
            user.setLevel(user.getLevel() + 1);
            user.setMaxExp(calculateNextLevelExp(user.getLevel()));
            leveledUp = true;
        }
        user.setCurrentExp(newExp);

        // 7. 수호자 친밀도 증가
        GuardianType guardianType = GuardianType.valueOf(report.getMissionType());
        GuardianAffinity affinity = affinityRepository
                .findByUserAndGuardianType(user, guardianType)
                .orElseGet(() -> createNewAffinity(user, guardianType));

        // 친밀도 레벨 증가
        affinity.setAffinityLevel(affinity.getAffinityLevel() + AFFINITY_GAIN);

        // 친밀도가 일정 수준 이상이면 스토리 해금
        if (affinity.getAffinityLevel() % 5 == 0) {
            affinity.setStoryProgress(affinity.getStoryProgress() + 1);
        }

        affinityRepository.save(affinity);

        // 8. 응답 생성
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
        // 레벨업에 필요한 경험치 계산 (예: 100 * 1.5^(level-1))
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
