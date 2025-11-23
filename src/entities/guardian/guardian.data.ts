import lumiImg from '../../shared/assets/guardians/lumi.jpg';
import brickImg from '../../shared/assets/guardians/brick.jpg';
import irisImg from '../../shared/assets/guardians/iris.png';
import blazeImg from '../../shared/assets/guardians/blaze.jpg';
import groupImg from '../../shared/assets/guardians/group_photo.jpg';
export type GuardianType = 'WARMTH' | 'ACTION' | 'INSIGHT' | 'STORM';

export interface StoryChapter {
  level: number;
  title: string;
  content: string;
  isLocked: boolean;
  image?: string;
}

export interface Guardian {
  id: GuardianType;
  name: string;
  title: string;
  color: string;
  bgColor: string;
  bgGradient: string;
  desc: string;
  quote: string;
  stories: StoryChapter[];
  imageSrc: string;
  affinityLevel: number;
}

export const GUARDIANS: Record<GuardianType, Guardian> = {
  WARMTH: {
    id: 'WARMTH',
    name: '루미 (Lumi)',
    title: '공감의 숲',
    color: 'text-pink-400',
    bgColor: 'pink-500',
    bgGradient: 'from-pink-900/50 to-purple-900/50',
    desc: '판단하지 않고 따뜻하게 들어줍니다.',
    quote: '많이 힘들었지? 여기선 푹 쉬어도 돼.',
    imageSrc: lumiImg,
    affinityLevel: 10, // LV.4 -> 챕터 3까지 해금됨
    stories: [
      { 
        level: 1, 
        title: "프롤로그: 수호자들의 결성", 
        content: "우주 먼 곳에서 당신의 감정 신호를 감지하고 우리 네 명이 모였어. 앞으로 잘 부탁해!", 
        isLocked: false,
        image: groupImg 
      },
      { 
        level: 1, 
        title: "기원: 작은 불씨", 
        content: "나는 우주가 처음 생겨날 때, 차가운 별들을 위로하기 위해 태어난 첫 번째 온기였어.", 
        isLocked: false 
      },
      { 
        level: 3, 
        title: "잃어버린 위로", 
        content: "너무 많은 슬픔을 흡수하다 내 빛이 꺼질 뻔한 적이 있었지. 그때 네가 나타나서 내 이야기를 들어주었어.", 
        isLocked: false // [수정됨] LV.4니까 해금!
      },
      { 
        level: 5, 
        title: "영원한 약속", 
        content: "이제 약속할게. 네 마음이 아무리 추운 겨울이라도, 내가 항상 곁에서 봄을 기다려줄 거야.", 
        isLocked: true 
      },
    ]
  },
  ACTION: {
    id: 'ACTION',
    name: '브릭 (Brick)',
    title: '해결의 대장간',
    color: 'text-orange-400',
    bgColor: 'orange-500',
    bgGradient: 'from-orange-900/50 to-red-900/50',
    desc: '복잡한 문제를 할 일로 정리해줍니다.',
    quote: '감정은 연료야. 어떻게 쓸지 정해볼까?',
    imageSrc: brickImg,
    affinityLevel: 2, // LV.2 -> 챕터 2까지 해금
    stories: [
      { 
        level: 1, 
        title: "프롤로그: 수호자들의 결성", 
        content: "우주 먼 곳에서 당신의 감정 신호를 감지하고 우리 네 명이 모였어. 앞으로 잘 부탁해!", 
        isLocked: false,
        image: groupImg 
      },
      { 
        level: 2, 
        title: "기원: 질서의 톱니", 
        content: "혼돈뿐인 우주에 규칙을 세우기 위해 대장간의 가장 뜨거운 불꽃에서 태어났네.", 
        isLocked: false 
      },
      { 
        level: 3, 
        title: "무너진 성벽", 
        content: "나조차도 해결할 수 없는 거대한 문제 앞에 무너진 적이 있지. 하지만 부서진 조각을 다시 맞추면 더 단단해진다는 걸 배웠어.", 
        isLocked: true 
      },
      { 
        level: 5, 
        title: "강철의 의지", 
        content: "이제 어떤 시련이 와도 두렵지 않아. 너와 함께라면 우리는 무엇이든 건설할 수 있으니까.", 
        isLocked: true 
      }
    ]
  },
  INSIGHT: {
    id: 'INSIGHT',
    name: '아이리스 (Iris)',
    title: '통찰의 첨탑',
    color: 'text-blue-400',
    bgColor: 'blue-500',
    bgGradient: 'from-blue-900/50 to-cyan-900/50',
    desc: '감정의 원인과 패턴을 분석합니다.',
    quote: '흥미로운 감정이군요. 그 이면을 볼까요?',
    imageSrc: irisImg,
    affinityLevel: 3, 
    stories: [
      { 
        level: 1, 
        title: "프롤로그: 수호자들의 결성", 
        content: "우주 먼 곳에서 당신의 감정 신호를 감지하고 우리 네 명이 모였어. 앞으로 잘 부탁해!", 
        isLocked: false,
        image: groupImg 
      },
      { 
        level: 2, 
        title: "기원: 관찰하는 눈", 
        content: "감정의 파동을 데이터로 해석하는 것이 나의 즐거움이죠. 별들의 움직임에도 패턴이 있듯, 마음에도 공식이 있습니다.", 
        isLocked: false 
      },
      { 
        level: 3, 
        title: "흐릿한 안개", 
        content: "어느 날, 분석할 수 없는 감정을 만났어요. 논리로는 설명되지 않는 '모순'들... 그게 바로 인간다움이란 걸 깨달았죠.", 
        isLocked: false 
      },
      { 
        level: 5, 
        title: "투명한 진실", 
        content: "이제 보여요. 당신의 복잡한 마음속에 숨겨진 보석 같은 진심이. 내가 그걸 찾아줄게요.", 
        isLocked: true 
      }
    ]
  },
  STORM: {
    id: 'STORM',
    name: '블레이즈 (Blaze)',
    title: '해소의 심연',
    color: 'text-red-500',
    bgColor: 'red-600',
    bgGradient: 'from-red-900/50 to-black',
    desc: '억눌린 감정을 시원하게 터뜨립니다.',
    quote: '참지 마! 소리쳐! 다 부숴버려!',
    imageSrc: blazeImg,
    affinityLevel: 1,
    stories: [
      { 
        level: 1, 
        title: "프롤로그: 수호자들의 결성", 
        content: "우주 먼 곳에서 당신의 감정 신호를 감지하고 우리 네 명이 모였어. 앞으로 잘 부탁해!", 
        isLocked: false,
        image: groupImg 
      },
      { 
        level: 2, 
        title: "기원: 폭발하는 별", 
        content: "모두가 조용히 하라고 할 때, 나는 비명을 지르며 태어났지! 그게 나야! 조용한 우주 따위 지루하잖아?", 
        isLocked: true 
      },
      { 
        level: 3, 
        title: "억눌린 분노", 
        content: "참는 건 독이야. 블랙홀도 너무 많이 삼키면 뱉어낸다고. 너도 가끔은 폭발해야 살 수 있어.", 
        isLocked: true 
      },
      { 
        level: 5, 
        title: "진정한 자유", 
        content: "이제 알겠어? 네 감정을 있는 그대로 터뜨릴 때, 너는 가장 아름다운 불꽃이야. 나와 함께 다 태워버리자!", 
        isLocked: true 
      },
    ]
  }
};