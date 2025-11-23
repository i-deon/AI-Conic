import type { GuardianType } from "../guardian/guardian.data";

export interface Message {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  timestamp: Date;
}

// 수호자별 응답 리스트 (랜덤 선택용)
const REPLIES: Record<GuardianType, (text: string) => string[]> = {
  WARMTH: (text) => [
    `그랬구나... "${text}"라고 생각했구나. 많이 힘들었지?`,
    "네 마음 다 알아. 여기서만큼은 무거운 짐을 내려놓아도 돼.",
    `"${text}"... 그런 일이 있었구나. 네 잘못이 아니야.`,
    "지금은 아무 생각 하지 말고, 따뜻한 차 한 잔 마신다고 생각하자.",
    "내가 항상 여기 있을게. 언제든 편하게 이야기해.",
    `"${text}" 때문에 마음이 아팠구나. 내가 꼭 안아줄게.`
  ],
  ACTION: (text) => [
    `"${text}" 상황이군. 감정은 잠시 접어두고, 해결책에 집중해보자.`,
    "우선순위를 정해볼까? 지금 당장 처리할 수 있는 가장 작은 일은 뭐야?",
    `"${text}"... 복잡해 보이지만 하나씩 쪼개면 별거 아니야.`,
    "좋아, 상황 파악 완료. 내일 아침에 가장 먼저 할 일 1가지만 정해봐.",
    "지금 고민만 하고 있는 건 아닐까? 몸을 움직이면 머리도 맑아질 거야.",
    `"${text}" 문제를 해결하기 위해 필요한 도구나 도움이 있어?`
  ],
  INSIGHT: (text) => [
    `흐음, "${text}"... 그 감정의 이면에 다른 원인이 있을 것 같아요.`,
    "혹시 전에도 비슷한 상황에서 같은 감정을 느낀 적이 있나요?",
    `"${text}"라고 느끼게 된 결정적인 계기가 무엇이었나요?`,
    "그 감정을 색깔이나 모양으로 표현한다면 어떤 느낌일까요?",
    "지금 느끼는 그 감정이 당신에게 어떤 신호를 보내고 있는 걸지도 몰라요.",
    `"${text}"... 흥미로운 패턴이네요. 조금 더 깊이 들여다볼까요?`
  ],
  STORM: (text) => [
    `그래! "${text}"!! 더 크게 소리쳐! 속에 있는 거 다 끄집어내버려!!`,
    "참지 마! 화나는 건 화나는 거야! 여기서 다 부숴버려!",
    `"${text}"? 웃기지 말라고 해! 너는 절대 지지 않아!`,
    "답답한 건 딱 질색이야. 그냥 시원하게 욕이라도 한 번 해봐!",
    "가슴이 뻥 뚫릴 때까지 쏟아내는 거야! 더! 더 세게!",
    `"${text}" 때문에 억눌려 있지 마. 너는 폭풍이야! 다 날려버려!`
  ]
};

export const getMockReply = (type: GuardianType, userText: string): string => {
  const candidates = REPLIES[type](userText);
  
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
};