package com.i_deon.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // 개발용, 프로덕션에서는 적절한 CSRF 정책 필요
                .authorizeHttpRequests(auth -> auth
                        // 인증이 필요한 API 경로
                        .requestMatchers(
                                "/api/v1/users/me",
                                "/api/v1/users/codex",
                                "/api/v1/chat/**",
                                "/api/v1/portal/analyze",
                                "/api/v1/missions/**"
                        ).authenticated()
                        // Swagger UI와 API docs는 인증 없이 접근 허용
                        .requestMatchers(
                                "/swagger-ui.html",
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui/index.html"
                        ).permitAll()
                        // 기타 모든 요청 허용
                        .anyRequest().permitAll()
                )
                .oauth2Login(Customizer.withDefaults())
                .logout(logout -> logout.logoutSuccessUrl("/"));

        return http.build();
    }
}
