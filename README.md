# 🍗 오늘 뭐 먹지? 치킨 룰렛!

> 치킨 선택 장애? 운명에 맡겨봐! 🎰

## ✨ 특징

- 🎨 **과장된 애니메이션**: "이 웹 왜 이래ㅋㅋㅋ" 반응을 유도하는 화려한 이펙트
- 📱 **모바일 최적화**: 모바일 사용자에게 최적화된 반응형 디자인
- 🍗 **12개 치킨 브랜드**: 교촌, BHC, BBQ, 굽네, 60계, 네네, 멕시카나 등
- 🔮 **오늘의 치킨 운세**: 각 치킨마다 다른 재미있는 운세 제공
- 📸 **인스타 공유**: Web Share API로 간편한 SNS 공유
- ✨ **화려한 효과**: 파티클, 컨페티, 룰렛 회전 등 다양한 애니메이션
- 🎁 **이스터에그**: 숨겨진 재미 요소 발견해보세요!

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 🛠️ 기술 스택

- **React 18** - UI 라이브러리
- **Vite** - 빌드 툴
- **Framer Motion** - 애니메이션 라이브러리
- **React Canvas Confetti** - 컨페티 효과
- **React Icons** - 아이콘

## 📦 프로젝트 구조

```
src/
├── components/
│   ├── Roulette.jsx          # 룰렛 컴포넌트
│   ├── Roulette.css
│   ├── ResultModal.jsx        # 결과 모달
│   ├── ResultModal.css
│   ├── ParticleBackground.jsx # 배경 파티클
├── data/
│   └── chickenData.js         # 치킨 브랜드 데이터
├── App.jsx                    # 메인 앱
├── App.css
├── main.jsx                   # 엔트리 포인트
└── index.css
```

## 🎮 주요 기능

### 1. 룰렛 시스템
- 5~8회전의 화려한 회전 애니메이션
- 회전 중 발광 효과
- 진동 피드백 (지원 기기)

### 2. 결과 표시
- 컨페티 폭발 효과
- 애니메이션된 결과 카드
- 브랜드별 맞춤 색상 및 그라데이션
- 태그 시스템

### 3. 공유 기능
- Web Share API 우선 사용
- Fallback: 클립보드 복사
- 인스타 스토리 최적화

### 4. 이스터에그
- 버튼 5번 연속 클릭 → 화면 흔들림
- 배경 파티클 애니메이션
- 다양한 호버 효과

## 🌐 배포

### Vercel (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Netlify

```bash
# 빌드
npm run build

# dist 폴더를 Netlify에 업로드
```

---

Made with 💛 for 치킨러버들

**Tip**: 버튼을 5번 연속으로 눌러보세요! 🎉
