import type { ShadowBoss } from "../report/report.model";

export interface UserProfile {
  nickname: string;
  level: number;
  currentExp: number;
  maxExp: number;
  title: string;
  eqStats: {
    WARMTH: number;
    ACTION: number;
    INSIGHT: number;
    STORM: number;
  };
  collectedBosses: ShadowBoss[]; // 도감
}

// (Mock) 가짜 유저 데이터
export const MOCK_USER: UserProfile = {
  nickname: "Player 1",
  level: 3,
  currentExp: 250,
  maxExp: 500,
  title: "별을 쫓는 여행자",
  eqStats: {
    WARMTH: 15,
    ACTION: 8,
    INSIGHT: 22,
    STORM: 45
  },
  collectedBosses: [
    { 
        name: "미루기의 늪괴물", title: "The Swamp of Procrastination", 
        description: "", weakness: "", level: 1 
    },
    { 
        name: "불안의 안개유령", title: "The Fog of Anxiety", 
        description: "", weakness: "", level: 3 
    }
  ]
};