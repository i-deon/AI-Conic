package com.i_deon.service;

import com.i_deon.domain.GuardianType;
import com.i_deon.dto.request.PortalAnalyzeRequest;
import com.i_deon.dto.response.PortalAnalyzeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PortalService {

    // TODO: LLM 클라이언트 주입 필요
    // private final LlmClient llmClient;

    public PortalAnalyzeResponse analyzeEmotion(PortalAnalyzeRequest request) {
        // TODO: LLM 연동하여 감정 분석 후 수호자 추천
        // 임시로 간단한 키워드 매칭 로직
        String emotion = request.emotion().toLowerCase();

        GuardianType recommended;
        String reason;

        if (emotion.contains("힘들") || emotion.contains("지쳐") || emotion.contains("외로")) {
            recommended = GuardianType.WARMTH;
            reason = "따뜻한 위로와 공감이 필요해 보여요. 루미가 함께할게요.";
        } else if (emotion.contains("해결") || emotion.contains("방법") || emotion.contains("어떻게")) {
            recommended = GuardianType.ACTION;
            reason = "구체적인 해결책이 필요한 상황이네요. 브릭이 도와드릴게요.";
        } else if (emotion.contains("왜") || emotion.contains("이유") || emotion.contains("원인")) {
            recommended = GuardianType.INSIGHT;
            reason = "감정의 원인을 파악하고 싶으신가봐요. 아이리스와 함께 살펴봐요.";
        } else {
            recommended = GuardianType.STORM;
            reason = "감정을 시원하게 풀어낼 시간이에요. 블레이즈가 함께할게요.";
        }

        return new PortalAnalyzeResponse(
                recommended.name(),
                reason
        );
    }
}
