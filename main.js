document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
    const analysisResultContainer = document.getElementById('analysis-result-container');
    const analysisText = document.getElementById('analysis-text');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);

            analysisResultContainer.classList.remove('hidden');
            
            // Scroll to the result section for better UX
            analysisResultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

            generateAndDisplayAnalysis();
        }
    });

    function generateAndDisplayAnalysis() {
        const traits = {
            "신뢰도": [
                "매우 정직하고 책임감 있는 인상을 줍니다. 주변 사람들이 당신을 깊이 신뢰할 것 같습니다.",
                " 안정적이고 차분한 분위기를 풍겨, 함께 있으면 마음이 편안해지는 인상입니다.",
                "진실성이 느껴지는 눈빛으로, 하는 말에 강한 믿음을 주는 사람입니다."
            ],
            "창의성": [
                "독창적이고 예술적인 감각이 돋보입니다. 남다른 아이디어로 주변을 놀라게 할 것 같습니다.",
                "자유로운 영혼의 소유자로, 틀에 얽매이지 않는 사고방식을 가졌습니다.",
                "새로운 것을 시도하는 데 두려움이 없는, 호기심 많고 개성 있는 인상입니다."
            ],
            "리더십": [
                "강한 카리스마와 결단력이 느껴집니다. 자연스럽게 그룹을 이끄는 리더의 자질이 보입니다.",
                "자신감 넘치는 태도로 사람들에게 동기를 부여하고, 목표를 향해 나아가게 만드는 힘이 있습니다.",
                "넓은 시야와 통찰력으로 팀을 올바른 방향으로 이끌어갈 수 있는 인상입니다."
            ],
            "친근함": [
                "밝고 긍정적인 에너지가 넘쳐, 주변까지 환하게 만드는 사람입니다.",
                "따뜻하고 다정한 미소로 처음 만나는 사람과도 쉽게 친해질 수 있는 매력이 있습니다.",
                "유머 감각이 뛰어나고 재치 있는 말솜씨로 항상 분위기를 즐겁게 만듭니다."
            ],
             "지성": [
                "지적이고 통찰력 있는 눈빛을 가졌습니다. 사물의 핵심을 꿰뚫어 보는 능력이 뛰어납니다.",
                "논리적이고 분석적인 사고방식을 가지고 있어, 문제 해결에 뛰어난 재능을 보일 것 같습니다.",
                "깊이 있는 대화를 나눌 수 있는, 학구적이고 지적인 분위기를 풍깁니다."
            ]
        };

        let analysisHTML = '';

        for (const trait in traits) {
            const descriptions = traits[trait];
            const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
            
            analysisHTML += `
                <div class="trait">
                    <div>
                        <div class="trait-name">${trait}</div>
                        <div class="trait-description">${randomDescription}</div>
                    </div>
                </div>
            `;
        }
        
        analysisText.innerHTML = analysisHTML;
    }
});
