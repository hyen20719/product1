document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
    const analysisResultContainer = document.getElementById('analysis-result-container');
    const analysisText = document.getElementById('analysis-text');

    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            // Display the image preview
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);

            // Show the result container
            analysisResultContainer.classList.remove('hidden');

            // Simulate analysis and display the result
            const impression = analyzeFirstImpression();
            analysisText.textContent = impression;
        }
    });

    function analyzeFirstImpression() {
        const impressions = [
            "신뢰감 있고 정직해 보이는 인상입니다. 차분하고 안정적인 분위기를 풍기며, 책임감 있는 태도로 주변 사람들에게 믿음을 줍니다.",
            "지적이고 통찰력 있는 눈빛을 가졌습니다. 문제의 핵심을 꿰뚫어 보는 능력이 있으며, 논리적이고 분석적인 사고방식을 가지고 있을 것 같습니다.",
            "밝고 긍정적인 에너지가 넘치는 인상입니다. 항상 미소를 잃지 않으며, 친화력이 좋아 처음 만나는 사람과도 쉽게 어울릴 수 있습니다.",
            "창의적이고 예술적인 감각이 돋보이는 인상입니다. 독특한 개성과 자신만의 스타일을 가지고 있으며, 새로운 아이디어를 내는 데 뛰어날 것 같습니다.",
            "강한 의지와 결단력이 느껴지는 인상입니다. 목표를 향해 끊임없이 노력하며, 어려움이 닥쳐도 쉽게 포기하지 않는 강인한 정신력을 가졌습니다.",
            "따뜻하고 다정한 마음씨를 가진 인상입니다. 다른 사람의 이야기에 귀 기울여주고, 공감하는 능력이 뛰어나 주변 사람들에게 편안함을 줍니다.",
            "유머 감각이 뛰어나고 재치 있는 사람일 것 같습니다. 재치 있는 말솜씨로 분위기를 즐겁게 만들며, 긍정적인 에너지를 전파합니다.",
            "카리스마 있고 리더십 있는 분위기를 풍깁니다. 그룹을 이끄는 능력이 뛰어나며, 사람들을 설득하고 동기를 부여하는 데 재능이 있을 것 같습니다."
        ];

        // Return a random impression from the list
        const randomIndex = Math.floor(Math.random() * impressions.length);
        return impressions[randomIndex];
    }
});