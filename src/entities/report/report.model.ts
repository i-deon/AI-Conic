import type { GuardianType } from "../guardian/guardian.data";

export interface ShadowBoss {
  name: string;
  title: string;
  description: string;
  weakness: string; 
  level: number;
}

export interface AnalysisResult {
  id: string;
  date: string;
  primaryEmotion: string;
  stats: {
    type: GuardianType;
    percentage: number;
  }[];
  boss: ShadowBoss;
  mission: string; 
}

export const generateMockReport = (emotion: string): AnalysisResult => {
  
  // 1. 감정 키워드에 따라 메인 타입 결정
  let mainType: GuardianType = 'WARMTH';
  let missionText = "따뜻한 차 한 잔 마시며 휴식하기";
  let bossName = "흐릿한 안개 망령";

  if (emotion.includes('짜증') || emotion.includes('화') || emotion.includes('분노')) {
    mainType = 'STORM';
    missionText = "안전한 곳에서 소리 지르거나 베개 치기";
    bossName = "붉은 화염의 거인";
  } else if (emotion.includes('해결') || emotion.includes('할일') || emotion.includes('복잡')) {
    mainType = 'ACTION';
    missionText = "책상 위를 5분만 정리하고, 물 한 잔 마시기";
    bossName = "엉킨 실타래 괴물";
  } else if (emotion.includes('왜') || emotion.includes('이유') || emotion.includes('생각')) {
    mainType = 'INSIGHT';
    missionText = "감정의 원인을 한 문장으로 적어보기";
    bossName = "차가운 거울의 환영";
  } else {
    // WARMTH (기본)
    mainType = 'WARMTH';
    missionText = "오늘 있었던 감사한 일 3가지 찾아보기";
    bossName = "축축한 늪의 슬라임";
  }

  // 2. [핵심 수정] 나머지 타입들을 중복되지 않게 계산
  const allTypes: GuardianType[] = ['WARMTH', 'ACTION', 'INSIGHT', 'STORM'];
  const otherTypes = allTypes.filter(type => type !== mainType);

  return {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString(),
    primaryEmotion: emotion,
    // 3. 통계 데이터 생성 (메인 60%, 나머지 20/10/10% 배분)
    stats: [
      { type: mainType, percentage: 60 },
      { type: otherTypes[0], percentage: 20 },
      { type: otherTypes[1], percentage: 10 },
      { type: otherTypes[2], percentage: 10 },
    ].sort((a, b) => b.percentage - a.percentage), 
    
    boss: {
      name: bossName,
      title: `The Shadow of ${emotion}`,
      description: `${emotion}의 감정이 뭉쳐서 만들어진 몬스터입니다.`,
      weakness: missionText,
      level: Math.floor(Math.random() * 5) + 1
    },
    mission: missionText
  };
};