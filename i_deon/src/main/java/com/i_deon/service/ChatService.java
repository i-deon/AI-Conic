package com.i_deon.service;

import com.i_deon.client.AiClient;
import com.i_deon.domain.*;
import com.i_deon.dto.request.*;
import com.i_deon.dto.response.*;
import com.i_deon.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final UserRepository userRepository;
    private final ChatSessionRepository sessionRepository;
    private final ChatMessageRepository messageRepository;
    private final AnalysisReportRepository reportRepository;
    private final AiClient aiClient;  // AI 클라이언트 주입

    @Transactional
    public StartChatResponse startSession(Long userId, StartChatRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        GuardianType guardianType = GuardianType.valueOf(request.guardianType());

        ChatSession session = ChatSession.builder()
                .user(user)
                .guardianType(guardianType)
                .initialEmotion(request.emotion())
                .build();

        sessionRepository.save(session);

        // AI 서버에서 개인화된 인사말 생성
        String greeting = aiClient.sendChatMessage(
                "수호자 타입: " + guardianType + ", 초기 감정: " + request.emotion() + "에 맞는 인사말을 생성해주세요.",
                "llama3.2:latest"  // 또는 사용할 모델명
        );

        return new StartChatResponse(session.getSessionId(), greeting);
    }

    @Transactional
    public SendMessageResponse sendMessage(Long userId, SendMessageRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        ChatSession session = sessionRepository.findBySessionIdAndUser(request.sessionId(), user)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));

        if (!session.isActive()) {
            throw new IllegalStateException("Session is already ended");
        }

        // 사용자 메시지 저장
        ChatMessage userMessage = ChatMessage.builder()
                .session(session)
                .senderType("USER")
                .content(request.content())
                .build();
        messageRepository.save(userMessage);

        // AI 서버에서 응답 생성
        String aiReply = aiClient.sendChatMessage(
                request.content(),
                "llama3.2:latest"
        );

        // AI 응답 저장
        ChatMessage aiMessage = ChatMessage.builder()
                .session(session)
                .senderType("AI")
                .content(aiReply)
                .build();
        messageRepository.save(aiMessage);

        return new SendMessageResponse("AI", aiReply);
    }

    @Transactional
    public EndChatResponse endSession(Long userId, EndChatRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        ChatSession session = sessionRepository.findBySessionIdAndUser(request.sessionId(), user)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));

        session.endSession();

        List<ChatMessage> messages = messageRepository.findBySessionOrderByCreatedAtAsc(session);

        // 대화 내용을 텍스트로 변환
        String conversationText = messages.stream()
                .map(msg -> msg.getSenderType() + ": " + msg.getContent())
                .collect(Collectors.joining("\n"));

        // AI 서버에서 대화 분석
        Map<String, Object> analysisResult = aiClient.analyzeConversation(conversationText);

        // 분석 결과를 DTO로 변환 (실제 응답 구조에 맞게 수정 필요)
        EndChatResponse response = convertToEndChatResponse(analysisResult);

        // 분석 리포트 저장
        AnalysisReport report = AnalysisReport.builder()
                .user(user)
                .mainEmotionKeyword(response.primaryEmotion())
                .emotionComposition(convertStatsToJson(response.stats()))
                .bossName(response.boss().name())
                .bossDescription(response.boss().description())
                .bossImageCode(response.boss().title())
                .missionType(session.getGuardianType().name())
                .missionTitle(response.mission())
                .missionDescription(response.boss().weakness())
                .build();
        reportRepository.save(report);

        return new EndChatResponse(
                report.getReportId(),
                response.date(),
                response.primaryEmotion(),
                response.stats(),
                response.boss(),
                response.mission()
        );
    }

    // 이메일 기반 메서드들
    @Transactional
    public StartChatResponse startSessionByEmail(String email, StartChatRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return startSession(user.getUserId(), request);
    }

    @Transactional
    public SendMessageResponse sendMessageByEmail(String email, SendMessageRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return sendMessage(user.getUserId(), request);
    }

    @Transactional
    public EndChatResponse endSessionByEmail(String email, EndChatRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return endSession(user.getUserId(), request);
    }

    // 헬퍼 메서드
    private EndChatResponse convertToEndChatResponse(Map<String, Object> analysisResult) {
        // AI 서버 응답 구조에 맞게 변환
        // 실제 구현은 Python FastAPI 응답 형식에 맞춰 수정 필요
        return new EndChatResponse(
                null,
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
                (String) analysisResult.get("primary_emotion"),
                List.of(),  // 실제 통계 변환
                null,  // 실제 보스 정보 변환
                (String) analysisResult.get("mission")
        );
    }

    private String convertStatsToJson(List<EndChatResponse.EmotionStat> stats) {
        StringBuilder json = new StringBuilder("{");
        for (int i = 0; i < stats.size(); i++) {
            EndChatResponse.EmotionStat stat = stats.get(i);
            json.append("\"").append(stat.type()).append("\":").append(stat.percentage());
            if (i < stats.size() - 1) json.append(",");
        }
        json.append("}");
        return json.toString();
    }
}
