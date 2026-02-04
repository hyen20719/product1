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
            progressText.textContent = '사진 분석 준비 중...';

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
            { text: '얼굴 윤곽 및 비율 분석 중...', duration: 600 },
            { text: '표정 패턴 및 미세 표정 감지 중...', duration: 900 },
            { text: '눈빛과 시선 방향 분석 중...', duration: 800 },
            { text: '인상 심리학 데이터베이스 매칭 중...', duration: 1000 },
            { text: '종합 리포트 생성 중...', duration: 700 }
        ];
        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                const step = steps[currentStep];
                progressText.textContent = step.text;
                progress += (step.duration / 5000) * 100;
                progressBar.style.width = `${Math.min(progress, 95)}%`;
                currentStep++;
            } else {
                clearInterval(interval);
                progressBar.style.width = '100%';
                progressText.textContent = '분석 완료! 리포트를 확인하세요!';
                setTimeout(() => {
                    analyzingContainer.classList.add('hidden');
                    analysisResultContainer.classList.remove('hidden');
                    generateAndDisplayAnalysis();
                }, 500);
            }
        }, steps[currentStep - 1]?.duration || 100);
    }

    // 배열에서 중복 없이 랜덤 선택하는 헬퍼 함수
    function getUniqueRandomItems(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, array.length));
    }

    // 랜덤 하나 선택
    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function generateAndDisplayAnalysis() {
        // 인상 지표
        const personalityTraits = [
            { name: "신뢰도", key: "trust" },
            { name: "매력도", key: "charm" },
            { name: "친화력", key: "sociability" },
            { name: "창의성", key: "creativity" },
            { name: "리더십", key: "leadership" },
            { name: "지성", key: "intellect" },
        ];

        // 첫인상 키워드 (더 다양하고 구체적)
        const impressionKeywords = [
            "신뢰감", "따뜻함", "지적임", "카리스마", "친근함",
            "세련됨", "진정성", "에너지", "차분함", "유머러스",
            "감성적", "열정적", "침착함", "개성있음", "포용력"
        ];

        // 첫인상 핵심 요약 (더 상세하고 개인화된 느낌)
        const firstImpressionSummaries = [
            {
                main: "당신의 첫인상에서 가장 눈에 띄는 것은 자연스럽게 풍기는 편안한 분위기입니다. 처음 만나는 사람도 당신 앞에서는 긴장을 풀고 자신을 드러낼 수 있을 것 같아요. 이런 특별한 능력은 타고난 것으로, 많은 사람들이 부러워하는 자질입니다.",
                sub: "특히 당신의 눈빛에서 느껴지는 진정성이 인상적입니다. 말하지 않아도 '이 사람은 믿을 수 있겠다'는 느낌을 주는 타입이에요."
            },
            {
                main: "당신에게서는 독특한 개성과 자신만의 세계가 느껴집니다. 트렌드를 따라가기보다 자신만의 스타일을 만들어가는 타입으로 보여요. 이런 독창성은 사람들의 기억에 오래 남고, 특별한 존재감을 만들어냅니다.",
                sub: "흥미로운 점은, 이런 개성이 거부감 없이 자연스럽게 다가온다는 것입니다. 튀지만 불편하지 않은, 매력적인 밸런스를 가지고 있어요."
            },
            {
                main: "분석 결과, 당신은 '지적인 깊이'와 '따뜻한 감성'이라는 두 가지 매력이 조화롭게 공존하는 드문 타입입니다. 머리로는 냉철하게 판단하면서도 마음으로는 따뜻하게 공감하는 능력이 있어요.",
                sub: "이런 균형 잡힌 인상 덕분에 다양한 유형의 사람들과 잘 어울릴 수 있고, 어떤 자리에서든 자연스럽게 녹아들 수 있을 거예요."
            },
            {
                main: "당신의 첫인상에서 가장 강하게 느껴지는 것은 밝고 긍정적인 에너지입니다. 마치 태양처럼 주변을 환하게 비추는 존재감이 있어요. 당신과 함께 있으면 자연스럽게 기분이 좋아지고 웃게 되는 사람들이 많을 거예요.",
                sub: "이런 에너지는 억지로 만들어지는 것이 아니라 내면에서 자연스럽게 우러나오는 것이기에 더욱 진정성 있게 느껴집니다."
            },
            {
                main: "당신에게서는 묵직한 신뢰감과 안정감이 느껴집니다. 말을 많이 하지 않아도 '이 사람은 믿을 수 있겠다'는 확신을 주는 타입이에요. 리더나 조언자로서의 자질이 엿보입니다.",
                sub: "특히 어려운 상황에서 당신의 침착한 태도는 주변 사람들에게 큰 안정감을 줄 수 있어요. 위기 상황에서 빛나는 타입입니다."
            },
            {
                main: "분석 결과, 당신은 섬세한 감수성과 예술적 감각이 돋보이는 인상입니다. 다른 사람들이 놓치는 작은 디테일도 캐치하고, 아름다움을 알아보는 안목이 있어 보여요.",
                sub: "이런 섬세함은 인간관계에서도 발휘되어, 상대방의 미묘한 감정 변화도 잘 알아채고 공감해주는 능력으로 이어집니다."
            }
        ];

        // 심층 성격 프로필 (더 상세하고 구체적)
        const personalityProfiles = [
            {
                type: "안정형 매력가",
                description: "당신은 흔들리지 않는 내면의 중심을 가진 사람입니다. 외부 상황에 쉽게 휘둘리지 않고 자신만의 페이스를 유지하는 능력이 있어요. 이런 안정감은 주변 사람들에게 '믿고 의지할 수 있는 존재'라는 인상을 줍니다. 감정의 기복이 크지 않아서 언제나 일관된 모습을 보여주고, 이것이 신뢰로 이어집니다. 다만, 때로는 자신의 감정을 더 솔직하게 표현해도 좋아요. 당신의 진심을 알고 싶어하는 사람들이 분명 있을 테니까요."
            },
            {
                type: "열정형 선구자",
                description: "당신의 내면에는 끊임없이 타오르는 열정의 불꽃이 있습니다. 관심 있는 일에 깊이 몰입하고, 그 과정에서 느끼는 희열이 당신을 움직이게 하죠. 이런 열정은 전염성이 있어서, 주변 사람들도 자연스럽게 동기부여를 받게 됩니다. 새로운 도전을 두려워하지 않고, 실패해도 다시 일어나는 회복탄력성이 강점이에요. 단, 가끔은 속도를 조절하고 주변을 돌아보는 여유도 필요해요. 함께 가면 더 멀리 갈 수 있으니까요."
            },
            {
                type: "사색형 현자",
                description: "당신은 깊이 있는 사고와 통찰력을 가진 사람입니다. 표면적인 것에 만족하지 않고 본질을 파고드는 성향이 있어요. 복잡한 상황에서도 핵심을 꿰뚫어 보는 능력이 있고, 이런 지혜는 주변 사람들에게 귀한 조언이 됩니다. 조용히 관찰하고 생각한 후에 말하기 때문에, 당신의 말에는 무게가 실립니다. 다만, 생각에 너무 깊이 빠져 행동이 늦어지지 않도록 주의하세요. 때로는 완벽하지 않아도 시작하는 것이 중요할 때가 있어요."
            },
            {
                type: "사교형 연결자",
                description: "당신은 사람과 사람을 이어주는 특별한 능력을 가지고 있습니다. 다양한 유형의 사람들과 자연스럽게 어울리고, 어색한 분위기를 풀어주는 재능이 있어요. 당신이 있는 곳에는 늘 웃음과 활기가 있고, 사람들은 당신과 함께하면 편안함을 느낍니다. 타인의 이야기에 진심으로 관심을 가지고 경청하는 능력도 뛰어나요. 다만, 다른 사람을 챙기느라 정작 자신의 감정은 돌보지 못할 때가 있으니, 자기 자신도 소중히 여기세요."
            },
            {
                type: "감성형 예술가",
                description: "당신의 내면에는 풍부한 감성의 우물이 있습니다. 음악, 미술, 문학 등 예술적인 것에 깊이 공감하고, 일상 속에서도 아름다움을 발견하는 눈이 있어요. 이런 섬세한 감수성은 창의적인 일에서 큰 강점이 됩니다. 또한 타인의 감정을 섬세하게 읽고 공감하는 능력이 뛰어나서, 사람들은 당신에게 마음을 열기 쉬워요. 다만, 감정에 너무 깊이 빠지면 지칠 수 있으니, 적절한 거리두기와 자기 보호도 필요해요."
            },
            {
                type: "실행형 리더",
                description: "당신은 생각을 행동으로 옮기는 실행력이 뛰어난 사람입니다. 목표가 정해지면 주저 없이 첫 발을 내딛고, 어려움이 있어도 끈기 있게 밀고 나가는 추진력이 있어요. 이런 결단력과 실행력은 자연스럽게 리더십으로 이어집니다. 사람들은 당신의 확고한 모습에서 신뢰와 안정감을 느끼고 기꺼이 따르게 됩니다. 다만, 때로는 다른 사람의 의견에도 귀를 기울이고, 융통성을 발휘하면 더 큰 성과를 이룰 수 있어요."
            }
        ];

        // 숨겨진 강점 (더 구체적이고 다양하게)
        const hiddenStrengths = [
            {
                title: "위기 상황에서 빛나는 침착함",
                detail: "다른 사람들이 당황할 때 오히려 냉정하게 상황을 파악하고 해결책을 찾아내는 능력이 있습니다. 이런 침착함은 주변 사람들에게 큰 안정감을 줍니다."
            },
            {
                title: "사람의 마음을 여는 공감 능력",
                detail: "상대방이 직접 말하지 않아도 그 사람의 감정과 필요를 직감적으로 파악하는 능력이 있습니다. 덕분에 사람들은 당신 앞에서 마음의 벽을 내리게 됩니다."
            },
            {
                title: "복잡한 것을 단순하게 정리하는 능력",
                detail: "어지러운 정보 속에서 핵심을 파악하고, 복잡한 개념을 누구나 이해할 수 있게 설명하는 재능이 있습니다. 이런 능력은 소통과 협업에서 큰 강점이 됩니다."
            },
            {
                title: "끈기 있게 목표를 향해 나아가는 지구력",
                detail: "당장의 결과가 보이지 않아도 묵묵히 자신의 길을 걸어가는 인내심이 있습니다. 단거리 경주보다 마라톤에 강한 타입으로, 결국 원하는 것을 이루어내는 사람입니다."
            },
            {
                title: "새로운 환경에 빠르게 적응하는 유연성",
                detail: "낯선 상황이나 예상치 못한 변화에도 당황하지 않고 빠르게 적응하는 능력이 있습니다. 이런 유연함은 급변하는 시대에 큰 경쟁력이 됩니다."
            },
            {
                title: "디테일을 놓치지 않는 섬세한 관찰력",
                detail: "다른 사람들이 지나치는 작은 부분도 캐치하는 섬세한 눈이 있습니다. 이런 관찰력은 문제를 조기에 발견하고 완성도 높은 결과물을 만드는 데 기여합니다."
            },
            {
                title: "분위기를 밝게 만드는 긍정 에너지",
                detail: "당신이 있는 곳에는 자연스럽게 활기와 웃음이 생깁니다. 이런 긍정적인 에너지는 팀의 사기를 높이고, 어려운 상황에서도 희망을 잃지 않게 해줍니다."
            },
            {
                title: "논리와 감성의 균형 잡힌 판단력",
                detail: "이성적인 분석과 직관적인 감각을 조화롭게 활용하는 능력이 있습니다. 덕분에 데이터와 감정 모두를 고려한 현명한 결정을 내릴 수 있습니다."
            },
            {
                title: "아이디어를 현실로 만드는 실행력",
                detail: "좋은 생각을 머릿속에만 두지 않고 실제로 행동으로 옮기는 추진력이 있습니다. '언젠가'가 아닌 '지금'을 선택하는 당신의 결단력은 큰 강점입니다."
            },
            {
                title: "다양한 관점을 수용하는 열린 마음",
                detail: "자신과 다른 의견이나 새로운 시각을 거부감 없이 받아들이는 개방성이 있습니다. 이런 열린 마음은 성장의 밑거름이 되고, 다양한 사람들과 협업하는 데 도움이 됩니다."
            },
            {
                title: "말보다 행동으로 보여주는 신뢰성",
                detail: "약속을 지키고, 말한 것을 실천하는 일관성이 있습니다. 이런 언행일치는 시간이 지날수록 두터운 신뢰로 쌓이게 됩니다."
            },
            {
                title: "상대방의 잠재력을 끌어내는 능력",
                detail: "당신과 함께하면 사람들은 자신도 몰랐던 가능성을 발견하게 됩니다. 격려와 지지를 통해 타인의 성장을 돕는 것에서 보람을 느끼는 타입입니다."
            }
        ];

        // 발전 포인트 (부정적이지 않게, 성장 관점으로)
        const growthPoints = [
            {
                point: "완벽주의 성향 조절하기",
                advice: "높은 기준을 가진 것은 좋지만, 때로는 80%의 완성도로 시작하는 것이 100%를 기다리는 것보다 나을 때가 있어요. '완벽보다 완료'를 기억해보세요."
            },
            {
                point: "자기 생각 더 표현하기",
                advice: "다른 사람의 의견을 경청하는 것도 중요하지만, 당신의 생각도 충분히 가치 있어요. 자신의 아이디어와 의견을 더 적극적으로 표현해보세요."
            },
            {
                point: "적절한 거절 연습하기",
                advice: "모든 요청에 '네'라고 하다 보면 정작 중요한 것에 집중하기 어려워요. 정중하지만 분명하게 거절하는 연습이 필요할 수 있어요."
            },
            {
                point: "생각과 행동 사이의 간격 줄이기",
                advice: "깊이 생각하는 것은 강점이지만, 때로는 분석보다 실행이 더 많은 것을 알려줄 때가 있어요. 작은 것부터 바로 시작해보는 연습을 해보세요."
            },
            {
                point: "자기 자신에게 더 관대해지기",
                advice: "다른 사람에게는 너그러우면서 자신에게는 엄격한 편인 것 같아요. 스스로에게도 칭찬과 휴식을 허락해주세요."
            },
            {
                point: "감정 표현의 폭 넓히기",
                advice: "내면에 풍부한 감정이 있지만 표현이 서툴 수 있어요. 기쁨이든 슬픔이든, 감정을 좀 더 솔직하게 표현해보면 관계가 더 깊어질 거예요."
            },
            {
                point: "속도 조절하며 주변 살피기",
                advice: "목표를 향해 빠르게 달려가는 것도 좋지만, 가끔은 속도를 늦추고 함께 가는 사람들을 돌아보세요. 혼자 가면 빨리 가지만, 함께 가면 멀리 갈 수 있어요."
            }
        ];

        // 커뮤니케이션 스타일 (더 구체적)
        const communicationStyles = [
            {
                style: "경청형 소통가",
                description: "당신은 말하기보다 듣기를 먼저 하는 타입입니다. 상대방의 이야기에 진심으로 귀 기울이고, 적절한 리액션과 질문으로 대화를 이끌어갑니다. 사람들은 당신과 대화할 때 '내 말을 정말 들어주는구나'라는 느낌을 받아요. 이런 경청 능력은 신뢰 관계를 쌓는 데 큰 강점이 됩니다."
            },
            {
                style: "유머형 분위기 메이커",
                description: "당신은 재치 있는 말과 유머로 대화를 즐겁게 만드는 능력이 있습니다. 어색한 분위기도 당신의 한마디면 금세 풀어지고, 무거운 주제도 가볍게 풀어내는 센스가 있어요. 다만 진지한 대화가 필요할 때는 분위기를 읽고 조절하는 것도 잘하는 편입니다."
            },
            {
                style: "논리형 설득가",
                description: "당신은 체계적이고 논리적으로 자신의 생각을 전달하는 능력이 뛰어납니다. 근거를 제시하고 단계별로 설명하기 때문에, 설득력이 높아요. 비즈니스 환경에서 특히 빛나는 커뮤니케이션 스타일입니다. 다만, 때로는 논리 외에 감정적 공감도 함께 전달하면 더 효과적일 수 있어요."
            },
            {
                style: "공감형 힐러",
                description: "당신은 따뜻한 말투와 공감 능력으로 상대방의 마음을 어루만지는 타입입니다. 조언보다 먼저 상대방의 감정을 인정해주고, '그랬구나, 힘들었겠다'라는 말로 위로를 건네는 능력이 있어요. 사람들은 힘들 때 당신을 가장 먼저 떠올리게 될 거예요."
            },
            {
                style: "직관형 통찰가",
                description: "당신은 긴 설명 없이도 핵심을 파악하고, 본질을 짚어내는 통찰력이 있습니다. 복잡한 상황을 한 문장으로 정리하거나, 상대방이 미처 말하지 못한 진심을 알아채는 능력이 있어요. '어떻게 알았어?'라는 말을 자주 듣는 타입입니다."
            }
        ];

        // 인간관계 궁합 (더 구체적)
        const relationshipCompatibility = [
            {
                type: "자유로운 영혼의 파트너",
                description: "당신과 가장 잘 맞는 타입은 틀에 박히지 않은 자유로운 사고를 가진 사람입니다. 서로의 개성을 존중하고, 새로운 경험을 함께 추구하며, 각자의 공간도 인정해주는 관계에서 당신은 가장 행복할 수 있어요. 함께 있을 때는 시너지를, 떨어져 있을 때는 그리움을 느끼는 균형 잡힌 관계가 이상적입니다."
            },
            {
                type: "든든한 현실주의자",
                description: "당신에게 필요한 파트너는 꿈과 현실 사이의 균형을 잡아주는 현실적인 사람입니다. 당신의 아이디어에 날개를 달아주면서도, 현실적인 조언으로 땅에 발을 붙여주는 역할을 해줄 수 있어요. 서로 다른 강점을 가지고 있기에, 함께하면 완벽한 팀이 될 수 있습니다."
            },
            {
                type: "깊이 있는 감성 파트너",
                description: "당신은 표면적인 관계보다 깊이 있는 연결을 원하는 타입입니다. 밤새 대화해도 지치지 않을 만큼 통하는 사람, 말하지 않아도 서로의 마음을 아는 사람과 함께할 때 가장 행복해요. 감성적인 교류와 정서적 지지가 풍부한 관계가 당신에게 맞습니다."
            },
            {
                type: "활기찬 에너지 메이커",
                description: "당신에게 활력을 불어넣어 줄 수 있는 긍정적이고 활동적인 사람과 잘 맞습니다. 함께 새로운 것을 경험하고, 도전하고, 웃고 떠드는 관계에서 당신은 에너지를 얻어요. 서로에게 좋은 자극이 되고, 함께 성장할 수 있는 관계가 이상적입니다."
            },
            {
                type: "신뢰의 안전기지",
                description: "당신에게는 무조건적인 신뢰와 지지를 보내주는 든든한 존재가 필요합니다. 성공할 때나 실패할 때나 한결같이 곁에 있어주는 사람, 당신의 약한 모습도 기꺼이 받아주는 사람과 함께할 때 가장 안정감을 느낄 거예요."
            }
        ];

        // 점수 생성 (조금 더 의미있게)
        const generateScores = () => {
            const baseScore = Math.floor(Math.random() * 20) + 60; // 60-79 기본
            return personalityTraits.map(trait => {
                const variation = Math.floor(Math.random() * 30) - 10; // -10 ~ +19
                return {
                    ...trait,
                    score: Math.min(99, Math.max(50, baseScore + variation))
                };
            });
        };

        // 분석 결과 생성
        const scores = generateScores();
        const selectedKeywords = getUniqueRandomItems(impressionKeywords, 4);
        const selectedSummary = getRandomItem(firstImpressionSummaries);
        const selectedProfile = getRandomItem(personalityProfiles);
        const selectedStrengths = getUniqueRandomItems(hiddenStrengths, 3); // 중복 없이 3개
        const selectedGrowth = getRandomItem(growthPoints);
        const selectedCommStyle = getRandomItem(communicationStyles);
        const selectedCompatibility = getRandomItem(relationshipCompatibility);

        // 키워드 표시
        keywordsElement.textContent = selectedKeywords.join(' · ');

        // HTML 생성
        let analysisHTML = '';

        // Section 1: 첫인상 핵심 요약
        analysisHTML += `
            <div class="report-section">
                <h4>당신의 첫인상 핵심 요약</h4>
                <p>${selectedSummary.main}</p>
                <p>${selectedSummary.sub}</p>
            </div>`;

        // Section 2: 심층 성격 프로필
        analysisHTML += `
            <div class="report-section">
                <h4>심층 성격 프로필: ${selectedProfile.type}</h4>
                <p>${selectedProfile.description}</p>
            </div>`;

        // Section 3: 인상 지표 분석
        analysisHTML += `
            <div class="report-section">
                <h4>인상 지표 분석</h4>`;
        scores.forEach(trait => {
            analysisHTML += `
                <div class="trait-score">
                    <span>${trait.name}</span>
                    <div class="score-bar-bg">
                        <div class="score-bar-fill" style="width: ${trait.score}%;"></div>
                    </div>
                    <span>${trait.score}점</span>
                </div>
            `;
        });
        analysisHTML += `</div>`;

        // Section 4: 숨겨진 강점 (중복 없이)
        analysisHTML += `
            <div class="report-section">
                <h4>당신의 숨겨진 강점</h4>
                <ul>`;
        selectedStrengths.forEach(strength => {
            analysisHTML += `<li><strong>${strength.title}</strong><br>${strength.detail}</li>`;
        });
        analysisHTML += `</ul></div>`;

        // Section 5: 성장 포인트
        analysisHTML += `
            <div class="report-section">
                <h4>더 빛나기 위한 포인트</h4>
                <p><strong>${selectedGrowth.point}</strong></p>
                <p>${selectedGrowth.advice}</p>
            </div>`;

        // Section 6: 커뮤니케이션 스타일
        analysisHTML += `
            <div class="report-section">
                <h4>커뮤니케이션 스타일: ${selectedCommStyle.style}</h4>
                <p>${selectedCommStyle.description}</p>
            </div>`;

        // Section 7: 인간관계 궁합
        analysisHTML += `
            <div class="report-section">
                <h4>당신과 잘 맞는 타입: ${selectedCompatibility.type}</h4>
                <p>${selectedCompatibility.description}</p>
            </div>`;

        detailedAnalysis.innerHTML = analysisHTML;
    }
});
