document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("proposalButton");
    const introQuestion = document.getElementById("introQuestion");
    const proposalQuestion = document.getElementById("proposalQuestion");
    const responseContainer = document.getElementById("responseContainer");
    const responseText = document.getElementById("responseText");
    const choiceButtons = document.getElementById("choiceButtons");
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");

    button.addEventListener("click", function() {
        introQuestion.classList.add("hidden");
        proposalQuestion.classList.remove("hidden");
        buttonDisappear();
    });

    function buttonDisappear() {
        gsap.to(button, { opacity: 0, duration: 0.5, onComplete: showQuestion });
    }

    function showQuestion() {
        responseContainer.classList.remove("hidden");
        gsap.from(responseContainer, { opacity: 0, duration: 0.5 });

        // Handle yes and no choices
        yesButton.addEventListener("click", function() {
            displayMessage("Yay! You've made me the happiest person alive! 💑");
            // Trigger confetti animation if "Yes" is chosen
            triggerConfetti();
        });

        noButton.addEventListener("click", function() {
            displayMessage("Oh no! I hope you change your mind, but I understand. 😔");
            // Fill the screen with sad faces if "No" is chosen
            fillScreenWithSadFaces();
        });
    }

    function displayMessage(message) {
        gsap.to(choiceButtons, { opacity: 0, duration: 0.5, onComplete: function() {
            responseText.textContent = message;
            gsap.to(responseText, { opacity: 1, duration: 0.5 });
        }});
    }

    function triggerConfetti() {
        const duration = 3000; // Duration of the confetti animation in milliseconds
        const confettiContainer = document.getElementById("confetti-container");

        // Launch confetti
        for (let i = 0; i < 200; i++) {
            createConfetti(confettiContainer);
        }

        // Stop confetti after the specified duration
        setTimeout(() => confettiContainer.innerHTML = "", duration);
    }

    function createConfetti(container) {
        const confettiPiece = document.createElement("div");
        confettiPiece.className = "confetti-piece";
        confettiPiece.style.backgroundColor = getRandomColor();
        confettiPiece.style.left = Math.random() * window.innerWidth + "px";
        confettiPiece.style.animationDuration = Math.random() * 2 + 1 + "s";

        container.appendChild(confettiPiece);

        confettiPiece.addEventListener("animationend", function() {
            container.removeChild(confettiPiece);
        });
    }

    function fillScreenWithSadFaces() {
        const duration = 3000; // Duration of the sad face animation in milliseconds
        const sadFaceContainer = document.getElementById("sad-face-container");

        // Launch sad faces
        for (let i = 0; i < 200; i++) {
            createSadFace(sadFaceContainer, duration);
        }
    }

    function createSadFace(container, duration) {
        const sadFace = document.createElement("div");
        sadFace.innerHTML = "😔";
        sadFace.className = "sad-face";
        sadFace.style.left = Math.random() * window.innerWidth + "px";
        sadFace.style.animationDuration = Math.random() * 2 + 1 + "s";

        container.appendChild(sadFace);

        sadFace.addEventListener("animationend", function() {
            container.removeChild(sadFace);
        });

        

        // Stop sad faces after the specified duration
        setTimeout(() => sadFaceContainer.innerHTML = "", duration);
    }

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Generate floating hearts
    generateHearts();
});

function generateHearts() {
    const numHearts = 50; // Adjust the number of hearts as needed
    const heartContainer = document.getElementById("heart-container");

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.top = Math.random() * window.innerHeight + "px";
        heart.style.animationDuration = Math.random() * 2 + 1 + "s";
        heartContainer.appendChild(heart);

        heart.addEventListener("animationiteration", function() {
            // Reset the heart's position when the animation completes
            heart.style.left = Math.random() * window.innerWidth + "px";
            heart.style.top = Math.random() * window.innerHeight + "px";
        });
    }
}

// Set the target date to Valentine's Day
const targetDate = new Date("February 14, 2024 12:00:00").getTime();

// Update the countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
    const currentDate = new Date().getTime();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
        // Stop the countdown when Valentine's Day arrives
        clearInterval(countdownInterval);
        document.getElementById("countdown-timer").innerHTML = "Happy Valentine's Day!";
    } else {
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Display the countdown
        document.getElementById("days").innerHTML = formatTime(days);
        document.getElementById("hours").innerHTML = formatTime(hours);
        document.getElementById("minutes").innerHTML = formatTime(minutes);
        document.getElementById("seconds").innerHTML = formatTime(seconds);
    }
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}



