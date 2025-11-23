package com.i_deon.repository;

import com.i_deon.domain.ChatSession;
import com.i_deon.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {
    List<ChatSession> findByUser(User user);
    Optional<ChatSession> findBySessionIdAndUser(Long sessionId, User user);
}
