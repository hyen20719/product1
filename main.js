document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('image-upload');
    const analysisSection = document.getElementById('analysis-section');
    const analyzingContainer = document.getElementById('analyzing-container');
    const analysisResultContainer = document.getElementById('analysis-result-container');
    const imagePreview = document.getElementById('image-preview');
    const detailedAnalysis = document.getElementById('detailed-analysis');
    const keywordsElement = document.getElementById('keywords');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            // Reset state
            analysisResultContainer.classList.add('hidden');
            analyzingContainer.classList.remove('hidden');
            analysisSection.classList.remove('hidden');
            progressBar.style.width = '0%';
            progressText.textContent = '사진 분석 준비 중... 🧐';

            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);

            // Scroll to the analysis section
            analysisSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Start analysis animation
            startAnalysisAnimation();
        }
    });

    function startAnalysisAnimation() {
        let progress = 0;
        const steps = [
            { text: '얼굴 윤곽 스캔 중... 🧑‍💻', duration: 500 },
            { text: '미묘한 표정 변화 감지 중... 😉', duration: 800 },
            { text: '성격 유형 매칭 시도 중... 🤔', duration: 1200 },
            { text: '잠재력 지표 추출 중... ✨', duration: 1000 },
            { text: '최종 리포트 생성 중... 📝', duration: 700 }
        ];
        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                progressText.textContent = step.text;
                progress += (step.duration / 5000) * 100; // Simulate total 5s for animation
                progressBar.style.width = `${Math.min(progress, 95)}%`; // Cap progress visually
                currentStep++;
            } else {
                clearInterval(interval);
                progressBar.style.width = '100%';
                progressText.textContent = '분석 완료! 리포트를 확인하세요! 🥳';
                setTimeout(() => {
                    analyzingContainer.classList.add('hidden');
                    analysisResultContainer.classList.remove('hidden');
                    generateAndDisplayAnalysis();
                }, 500); // Short delay before showing results
            }
        }, steps[currentStep -1]?.duration || 100); // Use step duration or default
    }


    function generateAndDisplayAnalysis() {
        const personalityTraits = [
            { name: "신뢰도", key: "trust", emoji: "🤝" },
            { name: "매력도", key: "charm", emoji: "💖" },
            { name: "친화력", key: "sociability", emoji: "😊" },
            { name: "창의성", key: "creativity", emoji: "💡" },
            { name: "리더십", key: "leadership", emoji: "👑" },
            { name: "지성", key: "intellect", emoji: "📚" },
        ];

        const keyPhrases = [
            "당신은 첫 만남부터 사람들을 편안하게 만드는 마법 같은 매력이 있어요! 🥰",
            "보는 사람마다 '저 사람은 뭔가 달라!' 하고 생각하게 만드는 개성의 소유자군요. ✨",
            "조용히 있어도 존재감이 뿜뿜! 당신의 깊이 있는 분위기에 사람들이 매료될 거예요. 💫",
            "밝고 긍정적인 에너지가 넘쳐서 주변을 환하게 만드는 타입! 에너지 드링크가 따로 없네요! ☀️",
            "카리스마 넘치는 눈빛 속에 따뜻함이 공존하는 당신! 반전 매력의 소유자! 🐯❤️",
            "왠지 모르게 끌리는 오묘한 분위기! 미스터리한 매력으로 사람들의 궁금증을 자극하네요. 🤔",
            "어떤 상황에서도 침착함을 유지하는 평온함이 돋보여요. 프로페셔널한 느낌 물씬! 🧐",
            "아이디어가 샘솟는 창의적인 두뇌! 당신의 번뜩이는 생각에 모두가 놀랄 거예요! 🚀",
            "섬세한 감성으로 타인의 마음을 잘 헤아려주는 따뜻한 당신! 🌷",
            "유머 감각이 남달라서 분위기 메이커는 따놓은 당상! 당신 덕분에 웃음꽃이 활짝 피어요! 😂",
        ];

        const detailedPersonalityProfiles = [
            "전반적으로 당신은 안정적이고 편안한 인상을 주는군요. 처음 만나는 사람도 부담 없이 다가갈 수 있는 친근한 매력을 가지고 있습니다. 꾸밈없는 솔직함이 당신의 가장 큰 강점일 거예요. 가끔은 너무 솔직해서 오해를 살 수도 있지만, 당신의 진심은 결국 통할 겁니다! 당신과 함께라면 늘 즐거운 일이 가득할 것 같아요! 🎉",
            "당신은 강렬하고 인상적인 분위기를 풍기는군요. 한번 보면 잊혀지지 않는 특별한 아우라를 가졌습니다. 어떤 일을 하든 열정적으로 몰입하며, 당신의 에너지는 주변 사람들에게도 긍정적인 영향을 미칠 거예요. 새로운 도전을 두려워하지 않는 용기 있는 당신을 응원합니다! 🏆",
            "당신은 사려 깊고 현명한 인상을 줍니다. 겉으로는 차분해 보이지만, 내면에는 깊은 통찰력과 지혜를 품고 있군요. 사람들은 당신의 조언에 귀를 기울이고 싶어 할 거예요. 가끔은 생각이 너무 많아 머리가 복잡할 수도 있지만, 그만큼 신중하고 현명하다는 증거겠죠? 🦉",
            "활기차고 긍정적인 에너지가 가득한 당신! 주변을 밝게 만드는 해피 바이러스 같은 존재예요. 당신의 낙천적인 태도는 어려운 상황도 쉽게 헤쳐나가게 할 겁니다. 하지만 가끔은 너무 앞서나가서 주변 사람들이 따라오기 힘들어할 수도 있으니, 속도 조절도 필요해요! 🏃‍♀️💨",
            "당신은 섬세하고 감수성이 풍부한 인상입니다. 타인의 감정을 잘 읽어내고 공감하는 능력이 뛰어나요. 예술적인 감각도 남다를 것 같습니다. 아름다움을 추구하는 당신의 섬세함은 세상을 더 다채롭게 만들 거예요. 다만, 때로는 감정에 너무 몰입하여 지칠 수 있으니, 자신을 돌보는 시간도 잊지 마세요! 💖🎨",
            "당신은 단호하고 결단력 있는 인상을 주는군요. 목표를 정하면 앞만 보고 달리는 추진력이 돋보입니다. 사람들은 당신의 확고한 모습에서 믿음을 얻을 거예요. 때로는 고집이 세다고 오해받을 수도 있지만, 당신의 뚝심 덕분에 큰 성과를 이룰 수 있을 겁니다! 💪",
        ];

        const potentialStrengths = [
            "어려운 상황에서도 긍정적인 면을 찾아내는 능력 (긍정의 힘! ✨)",
            "사람들과 쉽게 유대감을 형성하는 타고난 능력 (인싸 기질 만렙! 🥳)",
            "복잡한 문제를 직관적으로 해결하는 통찰력 (촉이 아주 좋으시네요! 💡)",
            "새로운 아이디어를 끊임없이 만들어내는 창의적인 사고 (아이디어 뱅크 인정! 🏦)",
            "타인의 감정을 깊이 이해하고 공감하는 능력 (공감 요정 강림! 🧚‍♀️)",
            "어떤 환경에도 빠르게 적응하는 유연함 (카멜레온인 줄! 🦎)",
            "포기하지 않는 끈기와 인내심 (오뚝이 정신! 🤸‍♂️)",
            "주변 사람들에게 활력을 불어넣는 밝은 에너지 (비타민 같은 존재! 🍋)",
            "냉철한 판단력으로 상황을 정확히 분석하는 능력 (명탐정 코난 저리가라! 🕵️‍♀️)",
        ];

        const areasForDevelopment = [
            "가끔은 너무 많은 정보를 한 번에 주려고 해서 듣는 사람이 버거워할 수 있어요. 한 번에 한 가지씩! 🐢",
            "새로운 것에 대한 호기심이 너무 강해서, 시작한 일을 마무리 짓기 전에 다른 일에 빠질 때가 있군요. 집중! 🎯",
            "타인의 의견에 너무 귀 기울이다 보니, 자신의 진짜 생각을 말하는 데 주저할 수 있어요. 당신의 목소리를 내세요! 🗣️",
            "완벽주의 성향이 있어서, 사소한 디테일에 너무 많은 시간을 쏟을 수 있습니다. 가끔은 '이 정도면 됐어!'도 괜찮아요! ✅",
            "감정 표현에 서툴러서, 속마음과 다르게 비춰질 때가 있어요. 솔직한 감정은 언제나 환영! 💖",
            "새로운 사람들과 어울리는 데 시간이 좀 걸리는 편이군요. 하지만 일단 친해지면 진국이라는 거! 🥂",
            "가끔은 너무 생각이 많아 결정을 내리기까지 오래 걸릴 수 있어요. 때로는 과감한 선택도 필요해요! 🚀",
        ];

        const communicationStyles = [
            "당신은 대화를 할 때 상대방의 말에 진심으로 귀 기울이는 스타일이에요. 덕분에 사람들은 당신과 이야기하는 것을 편안하게 느낄 겁니다. 경청의 달인! 👂",
            "재치 있는 유머와 기발한 비유로 대화를 풍성하게 만드는군요! 당신 덕분에 언제나 대화에 웃음꽃이 피어날 거예요. 분위기 메이커! 😂",
            "논리적이고 명확하게 자신의 의견을 전달하는 데 능숙합니다. 핵심을 콕 집어 말하는 당신의 전달력은 최고! 👍",
            "따뜻하고 부드러운 말투로 상대방의 마음을 어루만져 주는군요. 당신의 말 한마디가 큰 위로가 될 거예요. 힐링 보이스! 😇",
        ];

        const compatibilityTypes = [
            "당신과 잘 맞는 타입은 당신의 엉뚱한 매력을 이해해주는 '자유로운 영혼'이에요. 함께라면 어디든 갈 수 있죠! 🌍",
            "당신을 든든하게 지지해주고, 때로는 현실적인 조언을 해줄 '현실주의자'와 환상의 궁합! 🤝",
            "당신의 섬세한 감성을 알아주고 함께 깊은 대화를 나눌 수 있는 '감성파 친구'와는 밤새 이야기꽃을 피울 거예요! 🌙",
            "당신의 밝은 에너지에 동화되어 함께 즐거움을 찾아 나설 '활동적인 친구'와는 언제나 신나는 모험! 🎢",
        ];

        // Generate Keywords (3-5 random, unique)
        const selectedKeywords = new Set();
        while (selectedKeywords.size < Math.floor(Math.random() * 3) + 3) { // 3 to 5 keywords
            selectedKeywords.add(keyPhrases[Math.floor(Math.random() * keyPhrases.length)].split(' ')[0].replace('!','').replace('🥰','').replace('✨','').trim());
        }
        keywordsElement.textContent = Array.from(selectedKeywords).join(', ') + '...';

        let analysisHTML = '';

        // Section 1: Key Phrases
        analysisHTML += `<div class="report-section">
                            <h4>✨ 당신의 첫인상 핵심 요약 ✨</h4>
                            <p>${keyPhrases[Math.floor(Math.random() * keyPhrases.length)]}</p>
                            <p>${keyPhrases[Math.floor(Math.random() * keyPhrases.length)]}</p>
                        </div>`;

        // Section 2: Personality Profile
        analysisHTML += `<div class="report-section">
                            <h4>🕵️‍♀️ 심층 성격 프로필</h4>
                            <p>${detailedPersonalityProfiles[Math.floor(Math.random() * detailedPersonalityProfiles.length)]}</p>
                        </div>`;

        // Section 3: Trait Scores
        analysisHTML += `<div class="report-section">
                            <h4>📊 인상 지표 분석</h4>`;
        personalityTraits.forEach(trait => {
            const score = Math.floor(Math.random() * 50) + 50; // Score between 50-99
            analysisHTML += `
                <div class="trait-score">
                    <span>${trait.name} ${trait.emoji}</span>
                    <div class="score-bar-bg">
                        <div class="score-bar-fill" style="width: ${score}%;"></div>
                    </div>
                    <span>${score}점</span>
                </div>
            `;
        });
        analysisHTML += `</div>`;


        // Section 4: Potential Strengths
        analysisHTML += `<div class="report-section">
                            <h4>👍 당신의 숨겨진 강점</h4>
                            <ul>`;
        for (let i = 0; i < Math.floor(Math.random() * 2) + 2; i++) { // 2 to 3 strengths
            analysisHTML += `<li>${potentialStrengths[Math.floor(Math.random() * potentialStrengths.length)]}</li>`;
        }
        analysisHTML += `</ul></div>`;

        // Section 5: Areas for Development
        analysisHTML += `<div class="report-section">
                            <h4>🌱 조금 더 빛날 수 있는 부분</h4>
                            <p>${areasForDevelopment[Math.floor(Math.random() * areasForDevelopment.length)]}</p>
                        </div>`;

        // Section 6: Communication Style
        analysisHTML += `<div class="report-section">
                            <h4>💬 커뮤니케이션 스타일</h4>
                            <p>${communicationStyles[Math.floor(Math.random() * communicationStyles.length)]}</p>
                        </div>`;

        // Section 7: Compatibility
        analysisHTML += `<div class="report-section">
                            <h4>💞 궁합이 잘 맞는 타입</h4>
                            <p>${compatibilityTypes[Math.floor(Math.random() * compatibilityTypes.length)]}</p>
                        </div>`;


        detailedAnalysis.innerHTML = analysisHTML;
    }
});