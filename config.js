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
        title: "Tớ có một bức thư gửi cho cậu... 🌸",
        greeting: "Gửi Cậu,",
        paragraphs: [
            "Tớ đã gom góp tất cả những khoảnh khắc dịu dàng nhất, vẽ nên một chút tình cảm bé nhỏ này gửi tặng cậu.",
            "Hãy bấm nút bên dưới nhé! 👇"
        ],
        openButtonText: "Mở Thư Ngay ❤️"
    },

    // --- STAGE 2: Lời tỏ tình ---
    stage2: {
        question: "Cậu có muốn làm người đồng hành cùng tớ trên chặng đường phía trước không? 🥺💖",
        subtitle: "Đừng từ chối tớ nhé, tớ sẽ buồn lắm đó...",
        yesButtonText: "Đồng ý luôn! 🥰",
        noButtonPhrases: [
            "Không nha 😜",
            "Ơ đừng bấm đây...",
            "Cậu chắc chưa? 🥺",
            "Nút này bị hỏng rồi!",
            "Thử lại xem nào 😜",
            "Có gì đó sai sai...",
            "Đồng ý bên cạnh đi mà!",
            "Cậu ghét tớ hả? 😭",
            "Hết cách rồi nhaaa"
        ]
    },

    // --- STAGE 3: Chọn ngày đi Date ---
    stage3: {
        title: "Tuyệt vời quá! Tớ hạnh phúc lắm! 🎉❤️",
        prompt: "Chúng mình sẽ đi chơi vào ngày nào nhỉ? Hãy chọn một ngày thật đẹp nhé: 👇",
        confirmButtonText: "Xác nhận ngày hẹn ❤️"
    },

    // --- STAGE 4: Màn hình thành công ---
    stage4: {
        title: "Hẹn hò thôi nào! 💖",
        message: "Lịch hẹn đã được lưu và gửi tới tớ rồi nha!",
        note: "Hãy chuẩn bị một tâm hồn thật đẹp và một bộ quần áo thật xinh nhé. Tớ sẽ đón cậu! 🥰✨"
    }
};
