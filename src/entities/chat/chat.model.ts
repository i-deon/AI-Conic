export interface Message {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  timestamp: Date;
}

// (임시) AI 응답 생성기
import type { GuardianType } from "../guardian/guardian.data";

export const getMockReply = (type: GuardianType, userText: string): string => {
  const random = Math.random();
  
  if (type === 'WARMTH') {
    return random > 0.5 
      ? `그랬구나... "${userText}"라고 느꼈다니 마음이 무거웠겠다.` 
      : "네 마음 다 알아. 여기서만큼은 편하게 내려놓아도 돼.";
  }
  if (type === 'ACTION') {
    return `"${userText}" 상황이군. 우선순위를 정해볼까? 가장 먼저 해결하고 싶은 게 뭐야?`;
  }
  if (type === 'INSIGHT') {
    return `흐음, "${userText}"... 그 감정의 이면에 다른 원인이 있을 것 같아요. 혹시 전에도 이런 적이 있었나요?`;
  }
  if (type === 'STORM') {
    return `그래! "${userText}"!! 더 크게 소리쳐! 속에 있는 거 다 끄집어내버려!!`;
  }
  return "당신의 이야기를 듣고 있습니다.";
};