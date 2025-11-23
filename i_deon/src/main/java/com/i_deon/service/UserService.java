package com.i_deon.service;

import com.i_deon.domain.AnalysisReport;
import com.i_deon.domain.GuardianAffinity;
import com.i_deon.domain.GuardianType;
import com.i_deon.domain.User;
import com.i_deon.dto.response.GuardianCodexResponse;
import com.i_deon.dto.response.UserProfileResponse;
import com.i_deon.repository.AnalysisReportRepository;
import com.i_deon.repository.GuardianAffinityRepository;
import com.i_deon.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final GuardianAffinityRepository affinityRepository;
    private final AnalysisReportRepository reportRepository;

    @Transactional(readOnly = true)
    public UserProfileResponse getMyProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<GuardianAffinity> affinities = affinityRepository.findByUser(user);
        Map<GuardianType, Integer> eqMap = initEqMap();

        for (GuardianAffinity affinity : affinities) {
            int value = affinity.getAffinityLevel() * 10;
            eqMap.merge(affinity.getGuardianType(), value, Integer::sum);
        }

        UserProfileResponse.EqStats eqStats = new UserProfileResponse.EqStats(
                eqMap.get(GuardianType.WARMTH),
                eqMap.get(GuardianType.ACTION),
                eqMap.get(GuardianType.INSIGHT),
                eqMap.get(GuardianType.STORM)
        );

        List<AnalysisReport> reports = reportRepository.findAllByUser(user);
        List<UserProfileResponse.CollectedBoss> bosses = reports.stream()
                .map(r -> new UserProfileResponse.CollectedBoss(
                        r.getBossName(),
                        1
                ))
                .toList();

        return new UserProfileResponse(
                user.getNickname(),
                user.getLevel(),
                user.getCurrentExp(),
                user.getMaxExp(),
                user.getTitle(),
                eqStats,
                bosses
        );
    }

    private Map<GuardianType, Integer> initEqMap() {
        Map<GuardianType, Integer> map = new EnumMap<>(GuardianType.class);
        for (GuardianType type : GuardianType.values()) {
            map.put(type, 0);
        }
        return map;
    }

    @Transactional(readOnly = true)
    public List<GuardianCodexResponse> getCodex(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<GuardianAffinity> affinities = affinityRepository.findByUser(user);

        return affinities.stream()
                .map(a -> new GuardianCodexResponse(
                        a.getGuardianType().name(),
                        a.getAffinityLevel(),
                        a.getStoryProgress()
                ))
                .toList();
    }
}
