package com.i_deon.service;

import com.i_deon.domain.*;
import com.i_deon.dto.request.EndChatRequest;
import com.i_deon.dto.request.SendMessageRequest;
import com.i_deon.dto.request.StartChatRequest;
import com.i_deon.dto.response.EndChatResponse;
import com.i_deon.dto.response.SendMessageResponse;
import com.i_deon.dto.response.StartChatResponse;
import com.i_deon.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final UserRepository userRepository;
    private final ChatSessionRepository sessionRepository;
    private final ChatMessageRepository messageRepository;
    private final AnalysisReportRepository reportRepository;
    private final GuardianAffinityRepository affinityRepository;

    // TODO: LLM 클라이언트 주입 필요
    // private final LlmClient llmClient;

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

        // TODO: LLM으로 개인화된 인사말 생성
        String greeting = getGreetingByGuardian(guardianType);

        return new StartChatResponse(
                session.getSessionId(),
                greeting
        );
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

        // TODO: LLM 호출하여 응답 생성
        String aiReply = generateAiReply(session, request.content());

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

        // 세션 종료
        session.endSession();

        // 전체 대화 내역 조회
        List<ChatMessage> messages = messageRepository.findBySessionOrderByCreatedAtAsc(session);

        // TODO: LLM으로 대화 분석 및 리포트 생성
        EndChatResponse analysisResult = analyzeConversation(messages, session);

        // 분석 리포트 저장
        AnalysisReport report = AnalysisReport.builder()
                .user(user)
                .mainEmotionKeyword(analysisResult.primaryEmotion())
                .emotionComposition(convertStatsToJson(analysisResult.stats()))
                .bossName(analysisResult.boss().name())
                .bossDescription(analysisResult.boss().description())
                .bossImageCode(analysisResult.boss().title())
                .missionType(session.getGuardianType().name())
                .missionTitle(analysisResult.mission())
                .missionDescription(analysisResult.boss().weakness())
                .build();
        reportRepository.save(report);

        return new EndChatResponse(
                report.getReportId(),
                analysisResult.date(),
                analysisResult.primaryEmotion(),
                analysisResult.stats(),
                analysisResult.boss(),
                analysisResult.mission()
        );
    }

    // === 헬퍼 메서드 ===

    private String getGreetingByGuardian(GuardianType type) {
        return switch (type) {
            case WARMTH -> "어서와... 오늘 하루 어땠어? 천천히 이야기해줘도 괜찮아.";
            case ACTION -> "안녕! 오늘은 어떤 문제를 함께 해결해볼까?";
            case INSIGHT -> "반가워요. 오늘의 감정을 함께 들여다볼 준비가 되었나요?";
            case STORM -> "왔구나! 오늘 뭐든 시원하게 털어놔봐. 다 받아줄게!";
        };
    }

    private String generateAiReply(ChatSession session, String userMessage) {
        // TODO: LLM 연동
        // 임시 응답
        GuardianType type = session.getGuardianType();
        return switch (type) {
            case WARMTH -> "그랬구나... 그런 상황이었다면 정말 힘들었겠어. 네 감정은 충분히 타당해.";
            case ACTION -> "상황을 정리해보자. 지금 당장 할 수 있는 첫 번째 단계는 뭘까?";
            case INSIGHT -> "흥미롭네요. 그 감정 뒤에는 어떤 생각이나 기억이 있을까요?";
            case STORM -> "그래그래, 다 쏟아내! 참지 말고 네가 느낀 그대로 말해봐!";
        };
    }

    private EndChatResponse analyzeConversation(List<ChatMessage> messages, ChatSession session) {
        // TODO: LLM으로 실제 분석
        // 임시 더미 데이터
        return new EndChatResponse(
                null, // reportId는 저장 후 설정됨
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
                "불안",
                List.of(
                        new EndChatResponse.EmotionStat("WARMTH", 60),
                        new EndChatResponse.EmotionStat("INSIGHT", 20),
                        new EndChatResponse.EmotionStat("ACTION", 10),
                        new EndChatResponse.EmotionStat("STORM", 10)
                ),
                new EndChatResponse.BossInfo(
                        "축축한 늪의 슬라임",
                        "The Shadow of Anxiety",
                        "두려움의 감정이 뭉쳐서 만들어진 몬스터입니다.",
                        "오늘 있었던 감사한 일 3가지 찾아보기",
                        1
                ),
                "오늘 있었던 감사한 일 3가지 찾아보기"
        );
    }

    private String convertStatsToJson(List<EndChatResponse.EmotionStat> stats) {
        // 간단한 JSON 문자열 생성 (Jackson 사용 권장)
        StringBuilder json = new StringBuilder("{");
        for (int i = 0; i < stats.size(); i++) {
            EndChatResponse.EmotionStat stat = stats.get(i);
            json.append("\"").append(stat.type()).append("\":").append(stat.percentage());
            if (i < stats.size() - 1) {
                json.append(",");
            }
        }
        json.append("}");
        return json.toString();
    }
}
