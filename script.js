// Confession Web Interactivity

// --- CONFIGURATION ---
const DISCORD_WEBHOOK_URL = CONFIG.discordWebhookUrl; 

// --- STATE VARIABLES ---
let noHoverCount = 0;
let confettiActive = false;
let confettiInterval;
let stopConfettiTimeoutId = null;
const stage1 = document.getElementById("stage1");
const stage2 = document.getElementById("stage2");
const stage4 = document.getElementById("stage4");

// --- LOAD TEXTS FROM CONFIG ---
function initTextContent() {
    // Stage 1
    const s1Title = document.querySelector(".confession-title");
    if (s1Title) s1Title.innerText = CONFIG.stage1.title;
    
    const s1Highlight = document.querySelector(".letter-text .highlight");
    if (s1Highlight) s1Highlight.innerText = CONFIG.stage1.greeting;
    
    const letterTextContainer = document.querySelector(".letter-text");
    if (letterTextContainer) {
        const paragraphs = letterTextContainer.querySelectorAll("p");
        paragraphs.forEach(p => p.remove());
        CONFIG.stage1.paragraphs.forEach(text => {
            const p = document.createElement("p");
            p.innerText = text;
            letterTextContainer.appendChild(p);
        });
    }
    
    const openBtn = document.getElementById("openLetterBtn");
    if (openBtn) openBtn.innerText = CONFIG.stage1.openButtonText;

    // Stage 4
    const s4Title = document.getElementById("finalTitle");
    if (s4Title) s4Title.innerText = CONFIG.stage4.title;
    
    const s4Msg = document.getElementById("finalText");
    if (s4Msg) s4Msg.innerText = CONFIG.stage4.message;
    
    const s4Note = document.getElementById("finalNote");
    if (s4Note) s4Note.innerText = CONFIG.stage4.note;
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", initTextContent);


// --- FLOATING HEARTS GENERATOR ---
function createFloatingHeart() {
    const heartsBg = document.getElementById("heartsBg");
    if (!heartsBg) return;

    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    
    // Random heart shapes
    const heartSymbols = ["❤️", "💖", "🌸", "💕", "💘", "✨"];
    heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    // Random styling properties
    const startX = Math.random() * 100; // screen width percentage
    const size = Math.random() * 20 + 12; // 12px to 32px
    const duration = Math.random() * 5 + 5; // 5s to 10s
    const delay = Math.random() * 3; // 0s to 3s
    
    heart.style.left = `${startX}vw`;
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    
    heartsBg.appendChild(heart);
    
    // Remove heart after animation finishes
    setTimeout(() => {
        heart.remove();
    }, (duration + delay) * 1000);
}

// Generate hearts initially and continuously
for (let i = 0; i < 15; i++) {
    createFloatingHeart();
}
setInterval(createFloatingHeart, 600);


// --- STAGE 1: ENVELOPE OPENING ---
const envelope = document.getElementById("envelope");
const openLetterBtn = document.getElementById("openLetterBtn");

function openLetter() {
    envelope.classList.add("open");

    // Transition to Stage 2 after letter is fully opened and readable
    setTimeout(() => {
        stage1.style.opacity = "0";
        setTimeout(() => {
            stage1.classList.add("hidden");
            stage2.classList.remove("hidden");
            
            // Initialize the slideshow when Stage 2 loads
            initSlideshow();
            
            // Fade in Stage 2 confession card with zoom-in bounce
            stage2.style.opacity = "0";
            stage2.style.transform = "scale(0.95)";
            stage2.offsetHeight; // force reflow
            stage2.style.opacity = "1";
            stage2.style.transform = "scale(1)";
            stage2.style.transition = "opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
        }, 500);
    }, 1800);
}

envelope.addEventListener("click", openLetter);
openLetterBtn.addEventListener("click", openLetter);


// --- STAGE 2: SLIDESHOW (KỶ NIỆM) ---
let currentSlide = 0;
const slideshowImg = document.getElementById("slideshowImg");
const slideshowTitle = document.getElementById("slideshowTitle");
const slideshowDesc = document.getElementById("slideshowDesc");
const slideshowDotsContainer = document.getElementById("slideshowDots");
const nextSlideBtn = document.getElementById("nextSlideBtn");

function renderDots() {
    if (!slideshowDotsContainer) return;
    slideshowDotsContainer.innerHTML = "";
    CONFIG.stage2.images.forEach((_, idx) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (idx === 0) dot.classList.add("active");
        slideshowDotsContainer.appendChild(dot);
    });
}

function updateDots(activeIdx) {
    const dots = slideshowDotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, idx) => {
        if (idx === activeIdx) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

function showSlide(index) {
    const slideUrl = CONFIG.stage2.images[index];
    if (!slideUrl) return;
    
    // Add a smooth fade-out class to contents
    const card = document.querySelector(".slideshow-card");
    if (card) {
        card.classList.add("fade-out-slide");
        
        setTimeout(() => {
            slideshowImg.src = slideUrl;
            updateDots(index);
            
            card.classList.remove("fade-out-slide");
        }, 200); // wait for fade-out to complete
    } else {
        slideshowImg.src = slideUrl;
        updateDots(index);
    }
}

function initSlideshow() {
    renderDots();
    showSlide(currentSlide);
}

if (nextSlideBtn) {
    nextSlideBtn.addEventListener("click", () => {
        if (currentSlide < CONFIG.stage2.images.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        } else {
            // Transition to Stage 4 (Final Screen)
            stage2.style.opacity = "0";
            setTimeout(() => {
                stage2.classList.add("hidden");
                stage4.classList.remove("hidden");
                
                // Fade in Stage 4
                stage4.style.opacity = "0";
                stage4.style.transform = "scale(0.95)";
                stage4.offsetHeight; // force reflow
                stage4.style.opacity = "1";
                stage4.style.transform = "scale(1)";
                stage4.style.transition = "opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
                
                startConfetti();
            }, 500);
        }
    });
}


// --- CANVAS CONFETTI SYSTEM ---
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

let confettiElements = [];
const confettiColors = ["#ff4d6d", "#ff758f", "#ff85a1", "#ffccd5", "#38b000", "#70e000", "#4ea8de", "#560bad"];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class ConfettiParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height - 20;
        this.size = Math.random() * 8 + 6;
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 4 + 3;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 4 - 2;
        this.isHeart = Math.random() > 0.4; // 60% hearts, 40% regular circles/squares
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        // Wind swing
        this.speedX += Math.sin(this.y / 30) * 0.05;
        
        if (this.y > canvas.height) {
            this.y = -20;
            this.x = Math.random() * canvas.width;
            this.speedY = Math.random() * 4 + 3;
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        
        if (this.isHeart) {
            // Draw a cute tiny heart shape
            ctx.beginPath();
            ctx.moveTo(0, 0);
            // Left curve
            ctx.bezierCurveTo(-this.size/2, -this.size/2, -this.size, 0, 0, this.size);
            // Right curve
            ctx.bezierCurveTo(this.size, 0, this.size/2, -this.size/2, 0, 0);
            ctx.fill();
        } else {
            // Draw regular confetti rectangle
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        }
        ctx.restore();
    }
}

function initConfetti() {
    confettiElements = [];
    const count = 120;
    for (let i = 0; i < count; i++) {
        confettiElements.push(new ConfettiParticle());
    }
}

function animateConfetti() {
    if (!confettiActive && confettiElements.length === 0) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiElements.forEach(p => {
        p.update();
        p.draw();
    });
    
    requestAnimationFrame(animateConfetti);
}

function startConfetti() {
    if (stopConfettiTimeoutId) {
        clearTimeout(stopConfettiTimeoutId);
        stopConfettiTimeoutId = null;
    }
    if (confettiActive) return;
    confettiActive = true;
    initConfetti();
    animateConfetti();
}

function stopConfetti() {
    if (stopConfettiTimeoutId) {
        clearTimeout(stopConfettiTimeoutId);
    }
    stopConfettiTimeoutId = setTimeout(() => {
        confettiActive = false;
        confettiElements = [];
        stopConfettiTimeoutId = null;
    }, 4000);
}
