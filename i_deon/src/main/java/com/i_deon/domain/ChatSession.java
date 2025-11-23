package com.i_deon.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_sessions")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ChatSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sessionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private GuardianType guardianType;

    @Lob
    private String initialEmotion;

    @Builder.Default
    private LocalDateTime startedAt = LocalDateTime.now();

    private LocalDateTime endedAt;

    // 도메인 메서드
    public void endSession() {
        this.endedAt = LocalDateTime.now();
    }

    public boolean isActive() {
        return this.endedAt == null;
    }
}
