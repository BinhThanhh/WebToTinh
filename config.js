// --- CONFIGURATION FILE ---
// Bạn có thể dễ dàng thay đổi tất cả lời nhắn, câu chữ ở đây mà không cần đụng vào code HTML/JS chính.

const CONFIG = {
    // 1. Nhận tin nhắn báo về Discord (Tự động gửi ngầm 100%, khuyên dùng)
    // Hướng dẫn lấy link Webhook có trong file README.md
    discordWebhookUrl: "",

    // 2. Nhận tin nhắn báo về Email cá nhân (Tự động gửi ngầm 100%, khuyên dùng)
    // Đăng ký lấy mã key miễn phí trong 10 giây tại: https://web3forms.com/
    web3formsAccessKey: "70236b49-0db9-4512-b05a-99628f10e2bf",

    // --- STAGE 1: Bức thư ban đầu ---
    stage1: {
        title: "Gửi Hà thối... 🌸",
        greeting: "Gửi Hà thối,",
        paragraphs: [
            "Đồ con bò"
        ],
        openButtonText: "Mở Thư Ngay ❤️"
    },

    // --- STAGE 2: Thư viện ảnh (Slideshow) ---
    stage2: {
        images: [
            "assets/img1.png",
            "assets/img2.png",
            "assets/img3.png"
        ],
        nextButtonText: "Tiếp tục ❤️"
    },

    // --- STAGE 4: Màn hình kết thúc ---
    stage4: {
        title: "thế thôi =))",
        message: "Cảm ơn Hà thối đã xem hết nhé! 🥰",
        note: "Chúc một ngày vui vẻ! ✨"
    }
};
