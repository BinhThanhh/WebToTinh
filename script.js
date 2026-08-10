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
const stage3 = document.getElementById("stage3");
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

    // Stage 2
    const s2Question = document.querySelector(".main-question");
    if (s2Question) s2Question.innerText = CONFIG.stage2.question;
    
    const s2Subtitle = document.querySelector("#stage2 .subtitle");
    if (s2Subtitle) s2Subtitle.innerText = CONFIG.stage2.subtitle;
    
    const yesBtn = document.getElementById("yesBtn");
    if (yesBtn) yesBtn.innerText = CONFIG.stage2.yesButtonText;

    // Stage 3
    const s3Title = document.querySelector("#stage3 .title-love");
    if (s3Title) s3Title.innerText = CONFIG.stage3.title;
    
    const s3Prompt = document.querySelector("#stage3 .prompt-text");
    if (s3Prompt) s3Prompt.innerText = CONFIG.stage3.prompt;
    
    const confirmBtn = document.getElementById("confirmDateBtn");
    if (confirmBtn) confirmBtn.innerText = CONFIG.stage3.confirmButtonText;

    // Stage 4
    const s4Title = document.querySelector("#stage4 .title-love");
    if (s4Title) s4Title.innerText = CONFIG.stage4.title;
    
    const s4Msg = document.querySelector("#stage4 .final-text");
    if (s4Msg) s4Msg.innerText = CONFIG.stage4.message;
    
    const s4Note = document.querySelector("#stage4 .note-text");
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


// --- STAGE 2: CONFESSION (YES/NO BUTTONS) ---
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// Fleeing "No" Button Logic
function fleeNoButton(e) {
    noHoverCount++;
    
    // Shake effect
    noBtn.classList.add("btn-shake");
    setTimeout(() => {
        noBtn.classList.remove("btn-shake");
    }, 300);
    
    // Change position to absolute
    noBtn.style.position = "fixed";
    
    // Get viewport dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    const pad = 20; // border padding
    
    const maxX = window.innerWidth - btnWidth - pad;
    const maxY = window.innerHeight - btnHeight - pad;
    
    // Calculate new random coordinate
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;
    
    // Avoid position directly under cursor
    const mouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const mouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    
    if (Math.abs(newX - mouseX) < 100 && Math.abs(newY - mouseY) < 100) {
        newX = (newX + 200) % maxX;
        newY = (newY + 200) % maxY;
    }
    
    noBtn.style.left = `${Math.max(pad, newX)}px`;
    noBtn.style.top = `${Math.max(pad, newY)}px`;

    // Make "Yes" button larger & cute responses
    const currentScale = 1 + (noHoverCount * 0.15);
    yesBtn.style.transform = `scale(${currentScale})`;
    
    // Change text of No button to be funny
    const noPhrases = CONFIG.stage2.noButtonPhrases;
    noBtn.innerText = noPhrases[Math.min(noHoverCount, noPhrases.length - 1)];
}

noBtn.addEventListener("mouseover", fleeNoButton);
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // prevent click behavior on touch
    fleeNoButton(e);
});
noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fleeNoButton(e);
});

// Click "Yes" Button
yesBtn.addEventListener("click", () => {
    // Fade out and shrink buttons smoothly
    yesBtn.classList.add("btn-fade-out");
    noBtn.classList.add("btn-fade-out");
    
    // Trigger Confetti
    startConfetti();
    
    // Transition to Stage 3 (Date Picker)
    stage2.style.opacity = "0";
    setTimeout(() => {
        stage2.classList.add("hidden");
        stage3.classList.remove("hidden");
        // Reset styles and positions in the background
        noBtn.style.position = "";
        noBtn.style.left = "";
        noBtn.style.top = "";
        noBtn.classList.remove("btn-fade-out");
        yesBtn.classList.remove("btn-fade-out");
        stopConfetti();
    }, 1200);
});


// --- STAGE 3: DATE PICKER ---
const dateInput = document.getElementById("dateInput");
const confirmDateBtn = document.getElementById("confirmDateBtn");
const finalDateDisplay = document.getElementById("finalDateDisplay");

// Set minimum date to today and default value to tomorrow
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const tomorrowStr = tomorrow.toISOString().split("T")[0];
dateInput.min = today.toISOString().split("T")[0];
dateInput.value = tomorrowStr;

confirmDateBtn.addEventListener("click", () => {
    const selectedDate = dateInput.value;
    if (!selectedDate) {
        alert("Cậu hãy chọn một ngày đẹp trời để chúng mình đi chơi nhé! 😘");
        return;
    }
    
    // Format date to display (DD/MM/YYYY)
    const dateObj = new Date(selectedDate);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    
    finalDateDisplay.innerText = `Ngày hẹn: ${formattedDate}`;
    
    // Trigger data routing
    sendNotification(formattedDate);
    
    // Switch to Stage 4 (Success)
    stage3.style.opacity = "0";
    setTimeout(() => {
        stage3.classList.add("hidden");
        stage4.classList.remove("hidden");
        // Maintain continuous confetti on final screen
        startConfetti();
    }, 600);
});


// --- DATA ROUTING & NOTIFICATIONS ---

// Parse GitHub repo name from URL safely
function getGitHubRepoDetails() {
    let username = "binh-me"; // Default fallback
    let repo = "CuteWeb";
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    if (hostname.includes("github.io")) {
        // format: username.github.io/repo/
        username = hostname.split(".")[0];
        const pathParts = pathname.split("/").filter(x => x);
        if (pathParts.length > 0) {
            repo = pathParts[0];
        }
    }
    return { username, repo };
}

// Open prefilled GitHub issue URL in new window
function createGitHubIssueRedirect(date) {
    const { username, repo } = getGitHubRepoDetails();
    const issueTitle = encodeURIComponent(`Lịch hẹn Date ❤️`);
    const issueBody = encodeURIComponent(`Chào bạn! Người ấy đã đồng ý đi chơi cùng bạn vào ngày đặc biệt này:\n\n📅 **Ngày hẹn: ${date}**\n\nChúc hai bạn có một buổi hẹn hò thật vui vẻ và ngọt ngào! 🎉✨`);
    
    const githubUrl = `https://github.com/${username}/${repo}/issues/new?title=${issueTitle}&body=${issueBody}`;
    
    // Open in new tab
    window.open(githubUrl, "_blank");
}

// Function to send data via webhook or GitHub Issues
function sendNotification(date) {
    const isLocal = window.location.hostname === "localhost" || 
                    window.location.hostname === "127.0.0.1" || 
                    window.location.protocol === "file:";

    // 1. Send via Discord Webhook if configured
    if (DISCORD_WEBHOOK_URL && DISCORD_WEBHOOK_URL.startsWith("https://discord.com/api/webhooks/")) {
        fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: `❤️ **CÓ TIN VUI!** Người ấy đã đồng ý đi date cùng cậu vào ngày **${date}** rồi nhé! Chuẩn bị đi thôiii ✨`
            })
        }).then(response => {
            console.log("Discord notification sent successfully!");
        }).catch(err => {
            console.error("Failed to send Discord webhook:", err);
            if (isLocal) {
                alert(`[Thử nghiệm Local] Đã thử gửi Discord Webhook nhưng gặp lỗi kết nối (CORS). Ngày đã chọn: ${date}`);
            } else {
                createGitHubIssueRedirect(date);
            }
        });
    } else {
        // 2. Default route: Open GitHub Issue to trigger free desktop notification/email
        if (isLocal) {
            alert(`[Chế độ thử nghiệm cục bộ] Lịch hẹn đi chơi vào ngày ${date} đã được lưu thành công!\n\nSau khi bạn đưa code lên GitHub theo hướng dẫn của README.md, tính năng này sẽ tự động mở liên kết tạo Báo cáo hẹn hò (GitHub Issue) trên kho lưu trữ của bạn để thông báo về máy.`);
        } else {
            createGitHubIssueRedirect(date);
        }
    }
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
