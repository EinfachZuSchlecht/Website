
window.addEventListener('DOMContentLoaded', (event) => {
    const fillButtons = document.querySelectorAll('.fill-button');
    let cooldownActive = false;
    const manettiImage = document.querySelector('img');
    const originalImageSrc = manettiImage.src;
    const buttonImageMap = {
        'hp-bar': { image: 'manetti.png', text: 'Jetzt geht es mir schon besser!' },
        'food-bar': { image: 'manettiisst.png', text: 'Mhhhhh!!!!' },
        'drink-bar': { image: 'manettitrinkt.jpg', text: 'Coca cola espuma!' },
        'sleep-bar': { image: 'manettinsfw.png', text: 'Zzzzz! Zzzzzz! (Er wichst heimlich)' }
    };

    fillButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!cooldownActive) {
                const barName = button.dataset.bar;
                const increment = parseInt(button.dataset.increment);
                fillBar(barName, increment);
                activateCooldown();
                replaceManettiImage(barName);
                changeSpeechBubbleText(barName);
            }
        });
    });

    function fillBar(barName, increment) {
        const bar = document.querySelector(`.${barName}`);
        const fill = bar.querySelector('.bar-fill');
        let currentWidth = parseInt(fill.style.width) || 0;
        const newWidth = Math.min(currentWidth + increment, 100);
        fill.style.width = newWidth + '%';

        if (newWidth === 0) {
            handleEmptyBar(barName);
        }
    }

    function handleEmptyBar(barName) {
        const speechBubble = document.querySelector('.speech-bubble p');
        const text = getEmptyBarText(barName);
        speechBubble.textContent = text;
    }

    function getEmptyBarText(barName) {
        switch (barName) {
            case 'hp-bar':
                return 'MANETTI IST RAUS!';
            case 'food-bar':
                return 'Manetti, hunger!';
            case 'drink-bar':
                return 'Manetti Wasser';
            case 'sleep-bar':
                return 'Manetti müde!';
            default:
                return '';
        }
    }

    const decreaseInterval = 3000; // Zeitintervall 
    const decreaseAmount = 1; // Abnahme 
    let manettDollars = 0;
    let timer = getRandomInterval();

    const decreaseBars = () => {
        const bars = document.querySelectorAll('.bar');
        const hpBar = document.querySelector('.hp-bar');
        const hpFill = hpBar.querySelector('.bar-fill');

        let areOtherBarsEmpty = true;

        bars.forEach(bar => {
            if (bar.classList.contains('hp-bar')) {
                return;
            }

            const fill = bar.querySelector('.bar-fill');
            let currentWidth = parseInt(fill.style.width) || 0;
            const newWidth = Math.max(currentWidth - decreaseAmount, 0);
            fill.style.width = newWidth + '%';

            if (newWidth > 0) {
                areOtherBarsEmpty = false;
            } else {
                const barName = bar.classList[1];
                handleEmptyBar(barName);
            }
        });

        if (areOtherBarsEmpty) {
            let currentHPWidth = parseInt(hpFill.style.width) || 0;
            const newHPWidth = Math.max(currentHPWidth - decreaseAmount, 0);
            hpFill.style.width = newHPWidth + '%';

            if (newHPWidth === 0) {
                manettDollars += 20;
                updateCurrencyValue(manettDollars);
            }
        }
    };

    const updateCurrencyValue = (value) => {
        const currencyValue = document.querySelector('.currency-value');
        currencyValue.textContent = value;
    };

    const decreaseTimer = () => {
        timer -= decreaseInterval;

        if (timer <= 0) {
            manettDollars += 20;
            const speechBubble = document.querySelector('.speech-bubble p');
            speechBubble.textContent = "Manetti hat 20 Manetti-Dollar auf der Straße gefunden";
            updateCurrencyValue(manettDollars);
            timer = getRandomInterval();
        }
    };

    setInterval(decreaseBars, decreaseInterval);
    setInterval(decreaseTimer, decreaseInterval);

    function getRandomInterval() {
        return Math.floor(Math.random() * (60000 - 30000 + 1)) + 30000;
    }

    function activateCooldown() {
        cooldownActive = true;
        const fillButtons = document.querySelectorAll('.fill-button');
        fillButtons.forEach(button => {
            button.disabled = true;
        });

        setTimeout(() => {
            cooldownActive = false;
            fillButtons.forEach(button => {
                button.disabled = false;
            });
        }, 5000); // Cooldown-Zeit 
    }

    function replaceManettiImage(barName) {
        const imageSrc = buttonImageMap[barName].image;
        if (imageSrc) {
            manettiImage.src = imageSrc;
            setTimeout(() => {
                manettiImage.src = originalImageSrc;
            }, 5000); // Dauer
        }
    }

    function changeSpeechBubbleText(barName) {
        const speechBubble = document.querySelector('.speech-bubble p');
        const text = buttonImageMap[barName].text;
        speechBubble.textContent = text;
    }
});