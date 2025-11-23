package com.i_deon.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 50)
    private String nickname;

    @Builder.Default
    private int level = 1;

    @Builder.Default
    private int currentExp = 0;

    @Builder.Default
    private int maxExp = 100;

    @Column(length = 100)
    private String title;

    @Column(nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    // 도메인 메서드
    public void gainExp(int exp) {
        this.currentExp += exp;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public void setCurrentExp(int currentExp) {
        this.currentExp = currentExp;
    }

    public void setMaxExp(int maxExp) {
        this.maxExp = maxExp;
    }

    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

    public void changeTitle(String title) {
        this.title = title;
    }
}
