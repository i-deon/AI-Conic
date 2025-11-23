package com.i_deon.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "analysis_reports")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class AnalysisReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(length = 50)
    private String mainEmotionKeyword;

    @Column(columnDefinition = "json")
    private String emotionComposition;

    @Column(length = 100)
    private String bossName;

    @Lob
    private String bossDescription;

    @Column(length = 50)
    private String bossImageCode;

    @Column(length = 20)
    private String missionType;

    @Column(length = 200)
    private String missionTitle;

    @Lob
    private String missionDescription;

    @Builder.Default
    private boolean isMissionCleared = false;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    public void completeMission() {
        this.isMissionCleared = true;
    }
}
