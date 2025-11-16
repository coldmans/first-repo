// 치킨 데이터
const chickenData = [
    {
        brand: "교촌치킨",
        menu: "허니콤보",
        emoji: "🍯",
        fortunes: [
            "오늘은 달콤한 하루가 될 것입니다!",
            "꿀맛 같은 행운이 찾아올 예정!",
            "달달한 치킨처럼 달콤한 일이 생길거에요!"
        ]
    },
    {
        brand: "BHC",
        menu: "뿌링클",
        emoji: "🧀",
        fortunes: [
            "치즈처럼 고소한 인연을 만날 운명!",
            "오늘 하루 뿌링클처럼 중독적일 거예요!",
            "치즈 가루처럼 행복이 솔솔~"
        ]
    },
    {
        brand: "BHC",
        menu: "맛초킹",
        emoji: "🌶️",
        fortunes: [
            "매콤달콤한 하루가 기다리고 있어요!",
            "오늘은 맛있는 일만 가득!",
            "킹받는 일 없이 맛있는 하루!"
        ]
    },
    {
        brand: "BBQ",
        menu: "황금올리브",
        emoji: "✨",
        fortunes: [
            "황금빛 행운이 당신을 기다립니다!",
            "올리브처럼 건강한 하루 되세요!",
            "오늘은 황금 같은 기회가 올 거예요!"
        ]
    },
    {
        brand: "BBQ",
        menu: "자메이카통다리",
        emoji: "🏝️",
        fortunes: [
            "자메이카의 여유로운 기운이 함께!",
            "통큰 행운이 찾아올 예정!",
            "오늘은 자유롭고 즐거운 하루!"
        ]
    },
    {
        brand: "굽네치킨",
        menu: "고추바사삭",
        emoji: "🔥",
        fortunes: [
            "불타는 열정의 하루가 될 거예요!",
            "고추처럼 화끈한 일이 생길 예정!",
            "바삭한 성공이 당신을 기다려요!"
        ]
    },
    {
        brand: "60계치킨",
        menu: "크크크치킨",
        emoji: "😂",
        fortunes: [
            "크크크 웃음 가득한 하루!",
            "오늘은 즐거운 일만 가득할 거예요!",
            "웃음이 끊이지 않는 행복한 하루!"
        ]
    },
    {
        brand: "네네치킨",
        menu: "스노윙치킨",
        emoji: "❄️",
        fortunes: [
            "눈처럼 시원한 행운이 내릴 거예요!",
            "상큼한 일이 가득한 하루!",
            "오늘은 화이트 같은 깨끗한 하루!"
        ]
    },
    {
        brand: "멕시카나",
        menu: "치필링",
        emoji: "🌶️",
        fortunes: [
            "필링 좋은 하루가 될 거예요!",
            "오늘은 기분이 치솟을 일이!",
            "매콤한 자극처럼 짜릿한 하루!"
        ]
    },
    {
        brand: "처갓집",
        menu: "슈프림양념",
        emoji: "👑",
        fortunes: [
            "슈프림처럼 최고의 하루!",
            "처갓집 가듯 편안한 하루가 될 거예요!",
            "양념처럼 맛있는 일들이 가득!"
        ]
    }
];

// 전역 변수
let isSpinning = false;
let selectedChicken = null;

// DOM 요소
const rouletteWheel = document.getElementById('rouletteWheel');
const spinButton = document.getElementById('spinButton');
const resultModal = document.getElementById('resultModal');
const resultBrand = document.getElementById('resultBrand');
const resultMenu = document.getElementById('resultMenu');
const resultFortune = document.getElementById('resultFortune');
const shareButton = document.getElementById('shareButton');
const retryButton = document.getElementById('retryButton');
const confettiContainer = document.getElementById('confetti');
const particlesContainer = document.getElementById('particles');

// 초기화
function init() {
    createChickenItems();
    createBackgroundParticles();

    spinButton.addEventListener('click', spinRoulette);
    retryButton.addEventListener('click', closeModal);
    shareButton.addEventListener('click', shareResult);
}

// 치킨 아이템 생성
function createChickenItems() {
    chickenData.forEach((chicken, index) => {
        const item = document.createElement('div');
        item.className = 'chicken-item';
        item.textContent = `${chicken.emoji} ${chicken.brand}`;
        item.style.animationDelay = `${index * 0.1}s`;
        rouletteWheel.appendChild(item);
    });
}

// 배경 파티클 생성
function createBackgroundParticles() {
    const emojis = ['🍗', '🍖', '🍔', '🍕', '⭐', '✨', '💫'];

    setInterval(() => {
        if (document.querySelectorAll('.particle').length < 15) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particlesContainer.appendChild(particle);

            setTimeout(() => particle.remove(), 10000);
        }
    }, 1000);
}

// 룰렛 회전
function spinRoulette() {
    if (isSpinning) return;

    isSpinning = true;
    spinButton.disabled = true;
    spinButton.textContent = '🎰 운명을 결정하는 중...';

    // 랜덤 선택
    selectedChicken = chickenData[Math.floor(Math.random() * chickenData.length)];

    // 룰렛 회전 애니메이션
    rouletteWheel.classList.add('spinning');
    const rotations = 5 + Math.random() * 3; // 5~8회전
    const degrees = rotations * 360 + Math.random() * 360;
    rouletteWheel.style.transform = `rotate(${degrees}deg)`;

    // 진동 효과 (모바일 지원)
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
    }

    // 회전 중 효과음 시뮬레이션 (시각적)
    let flashCount = 0;
    const flashInterval = setInterval(() => {
        document.body.style.filter = flashCount % 2 === 0 ? 'brightness(1.2)' : 'brightness(1)';
        flashCount++;
    }, 100);

    // 결과 표시
    setTimeout(() => {
        clearInterval(flashInterval);
        document.body.style.filter = 'brightness(1)';
        rouletteWheel.classList.remove('spinning');
        showResult();

        // 리셋
        setTimeout(() => {
            isSpinning = false;
            spinButton.disabled = false;
            spinButton.innerHTML = '<span class="button-text">🎰 운명의 룰렛 돌리기!</span>';
            rouletteWheel.style.transform = 'rotate(0deg)';
        }, 1000);
    }, 4000);
}

// 결과 표시
function showResult() {
    const fortune = selectedChicken.fortunes[Math.floor(Math.random() * selectedChicken.fortunes.length)];

    resultBrand.textContent = `${selectedChicken.emoji} ${selectedChicken.brand}`;
    resultMenu.textContent = selectedChicken.menu;
    resultFortune.textContent = `💫 ${fortune}`;

    // 컨페티 효과
    createConfetti();

    // 진동
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200]);
    }

    // 모달 표시
    resultModal.classList.remove('hidden');
}

// 컨페티 생성
function createConfetti() {
    confettiContainer.innerHTML = '';
    const colors = ['#ffd700', '#ff6b35', '#f7931e', '#4ecdc4', '#ff6b9d', '#c44569'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

// 모달 닫기
function closeModal() {
    resultModal.classList.add('hidden');
}

// 공유 기능
async function shareResult() {
    const shareText = `🍗 오늘의 치킨 운세!\n\n${selectedChicken.emoji} ${selectedChicken.brand}\n${selectedChicken.menu}\n\n${selectedChicken.fortunes[0]}\n\n나도 치킨 뽑기 👉`;
    const shareUrl = window.location.href;

    // Web Share API 지원 확인
    if (navigator.share) {
        try {
            await navigator.share({
                title: '🍗 오늘 뭐 먹지? 치킨 룰렛!',
                text: shareText,
                url: shareUrl
            });
        } catch (err) {
            if (err.name !== 'AbortError') {
                fallbackShare(shareText, shareUrl);
            }
        }
    } else {
        fallbackShare(shareText, shareUrl);
    }
}

// 폴백 공유 (클립보드)
function fallbackShare(text, url) {
    const fullText = `${text}\n${url}`;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(fullText).then(() => {
            alert('✅ 클립보드에 복사되었습니다!\n인스타 스토리에 붙여넣기 해보세요!');
        }).catch(() => {
            showShareText(fullText);
        });
    } else {
        showShareText(fullText);
    }
}

// 텍스트 표시
function showShareText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        alert('✅ 클립보드에 복사되었습니다!\n인스타 스토리에 붙여넣기 해보세요!');
    } catch (err) {
        alert('📋 공유 텍스트:\n\n' + text);
    }

    document.body.removeChild(textarea);
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', init);

// 이스터에그: 룰렛을 여러번 클릭하면 특수 효과
let clickCount = 0;
let clickTimer = null;

spinButton.addEventListener('click', () => {
    clickCount++;

    if (clickTimer) clearTimeout(clickTimer);

    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, 1000);

    if (clickCount === 5) {
        // 폭발 효과!
        document.body.style.animation = 'shake 0.5s';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
        clickCount = 0;
    }
});

// 흔들림 애니메이션
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        10% { transform: translate(-10px, -10px) rotate(-1deg); }
        20% { transform: translate(10px, 10px) rotate(1deg); }
        30% { transform: translate(-10px, 10px) rotate(-1deg); }
        40% { transform: translate(10px, -10px) rotate(1deg); }
        50% { transform: translate(-10px, -10px) rotate(-1deg); }
        60% { transform: translate(10px, 10px) rotate(1deg); }
        70% { transform: translate(-10px, 10px) rotate(-1deg); }
        80% { transform: translate(10px, -10px) rotate(1deg); }
        90% { transform: translate(-10px, -10px) rotate(-1deg); }
    }
`;
document.head.appendChild(style);
