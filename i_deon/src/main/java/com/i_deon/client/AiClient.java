package com.i_deon.client;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class AiClient {

    @Value("${ai.server.url:http://localhost:8000}")  // application.yml에서 설정
    private String aiServerUrl;

    private final RestTemplate restTemplate;

    /**
     * AI 서버에 챗봇 메시지 전송
     */
    public String sendChatMessage(String prompt, String model) {
        String url = aiServerUrl + "/ai-chat";

        Map<String, String> requestBody = Map.of(
                "prompt", prompt,
                "model", model
        );

        try {
            Map<String, Object> response = restTemplate.postForObject(
                    url,
                    requestBody,
                    Map.class
            );

            return response != null ? (String) response.get("response") : "";
        } catch (Exception e) {
            // 에러 처리
            throw new RuntimeException("AI 서버 통신 실패: " + e.getMessage(), e);
        }
    }

    /**
     * AI 서버에 감정 분석 요청
     */
    public Map<String, Object> analyzeEmotion(String emotion) {
        String url = aiServerUrl + "/analyze-emotion";

        Map<String, String> requestBody = Map.of("emotion", emotion);

        try {
            return restTemplate.postForObject(url, requestBody, Map.class);
        } catch (Exception e) {
            throw new RuntimeException("감정 분석 실패: " + e.getMessage(), e);
        }
    }

    /**
     * AI 서버에 대화 분석 요청
     */
    public Map<String, Object> analyzeConversation(String conversationText) {
        String url = aiServerUrl + "/analyze-conversation";

        Map<String, String> requestBody = Map.of("conversation", conversationText);

        try {
            return restTemplate.postForObject(url, requestBody, Map.class);
        } catch (Exception e) {
            throw new RuntimeException("대화 분석 실패: " + e.getMessage(), e);
        }
    }
}
