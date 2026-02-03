class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const number = this.getAttribute('number');
        const color = this.getAttribute('color');

        const ball = document.createElement('div');
        ball.textContent = number;
        ball.style.backgroundColor = color;

        const style = document.createElement('style');
        style.textContent = `
            div {
                width: var(--ball-size, 60px);
                height: var(--ball-size, 60px);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                font-weight: bold;
                color: white;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3);
                animation: pop-in 0.5s ease-out forwards;
            }

            @keyframes pop-in {
                0% {
                    transform: scale(0);
                    opacity: 0;
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(ball);
    }
}

customElements.define('lotto-ball', LottoBall);

const lottoNumbersContainer = document.getElementById('lotto-numbers-container');
const generateButton = document.getElementById('generate-button');

function generateLottoNumbers() {
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3'];

    let i = 0;
    for (const number of numbers) {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoBall.setAttribute('color', colors[i++]);
        lottoNumbersContainer.appendChild(lottoBall);
    }
}

generateButton.addEventListener('click', generateLottoNumbers);

// Initial generation
generateLottoNumbers();
