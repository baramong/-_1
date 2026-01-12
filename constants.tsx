
import { SiteContent } from './types';

export const INITIAL_CONTENT: SiteContent = {
  heroTitle: "비즈니스의 가치를 증명하는\n실전형 홍보 디자인 전문가",
  heroSubtitle: "단순히 예쁜 디자인을 넘어, 고객의 행동을 유도하고 매출을 일으키는 목적형 디자인을 제공합니다.",
  strengths: [
    {
      title: "기획력 중심 디자인",
      description: "홍보 목적을 완벽히 분석하여 타겟의 시선을 사로잡는 레이아웃을 구성합니다.",
      icon: "🎯"
    },
    {
      title: "압도적 재의뢰율",
      description: "한 번 맡기면 끝이 아닌, 비즈니스 파트너로서 지속적인 퀄리티를 보장합니다.",
      icon: "🤝"
    },
    {
      title: "빠르고 정확한 피드백",
      description: "정해진 일정을 엄수하며, 전문적인 소통으로 수정 시간을 단축합니다.",
      icon: "⚡"
    }
  ],
  portfolio: [
    { id: '1', title: '신제품 런칭 SNS 캠페인', category: 'SNS 홍보', images: ['https://picsum.photos/800/600?random=1'] },
    { id: '2', title: 'IT 컨퍼런스 메인 포스터', category: '포스터/배너', images: ['https://picsum.photos/800/600?random=2'] },
    { id: '3', title: '친환경 코스메틱 상세페이지', category: '상세페이지', images: ['https://picsum.photos/800/600?random=3'] }
  ],
  processes: [
    { step: '01', title: '간단 상담', desc: '목적·일정·예산 확인' },
    { step: '02', title: '방향 제안', desc: '홍보 목적 정리 & 전략 수립' },
    { step: '03', title: '1차 시안', desc: '핵심 디자인 기획안 전달' },
    { step: '04', title: '피드백 & 수정', desc: '디테일 완성도 보완' },
    { step: '05', title: '최종 납품', desc: '고해상도 원본 파일 전달' }
  ],
  testimonials: [
    { quote: "홍보 목적을 정확히 이해해서 디자인해줘서 반응이 좋았어요. 단순히 예쁜 것보다 타겟이 무엇을 원하는지 꿰뚫는 레이아웃이 압권입니다.", author: "재의뢰 5회차 IT 솔루션 대표님" },
    { quote: "여러 업체를 써봤지만 바라 디자인만큼 소통이 잘 되는 곳은 없었습니다. 마감 기한도 칼같이 지켜주셔서 신뢰가 갑니다.", author: "F&B 프랜차이즈 마케팅 팀장님" },
    { quote: "기획안만 드렸는데 의도를 200% 반영한 시안이 나와서 깜짝 놀랐어요. 덕분에 프로모션 성황리에 마쳤습니다.", author: "커머스 플랫폼 운영자님" }
  ],
  services: [
    { name: "전단지 / 리플렛", price: "50,000원~" },
    { name: "포스터 / 배너", price: "70,000원~" },
    { name: "SNS 홍보 이미지", price: "30,000원~" },
    { name: "상세페이지", price: "200,000원~" },
    { name: "이벤트 홍보물 세트", price: "상담 후 결정" }
  ],
  faqs: [
    { question: "급한 작업도 가능한가요?", answer: "일정에 따라 당일 또는 익일 피드백이 가능한 '긴급 작업 서비스'를 운영하고 있습니다. 상담 시 미리 말씀 부탁드립니다." },
    { question: "수정은 몇 회까지 되나요?", answer: "기본적으로 2회의 디테일 수정을 무료로 제공합니다. 오타나 간단한 색상 변경은 횟수 제한 없이 도와드립니다." },
    { question: "기획 없이 의뢰해도 되나요?", answer: "네, 가능합니다. 홍보 목적과 필수 정보만 알려주시면 전문가가 직접 홍보 방향을 제안해 드립니다." }
  ]
};

export const ADMIN_PASSWORD = "7942";
