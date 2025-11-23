package com.i_deon.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "guardian_affinities")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class GuardianAffinity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long affinityId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private GuardianType guardianType;

    @Builder.Default
    private int affinityLevel = 1;

    @Builder.Default
    private int storyProgress = 1;

    // 도메인 메서드
    public void increaseAffinity(int amount) {
        this.affinityLevel += amount;
    }

    public void setAffinityLevel(int affinityLevel) {
        this.affinityLevel = affinityLevel;
    }

    public void setStoryProgress(int storyProgress) {
        this.storyProgress = storyProgress;
    }
}
