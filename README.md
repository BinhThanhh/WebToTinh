# 🌸 Hướng dẫn triển khai Trang Web Tỏ Tình Lên GitHub Pages 🌸

Tài liệu này sẽ hướng dẫn bạn từng bước đưa trang web tỏ tình siêu đáng yêu này lên **GitHub Pages** (hoàn toàn miễn phí) để gửi đường link này cho người ấy bấm vào ở bất cứ thiết bị nào.

---

## ⚙️ Cấu Hình Thay Đổi Lời Nhắn & Nhận Thông Báo
Bạn **không cần** tìm kiếm trong các file code chính phức tạp. Mọi tùy chỉnh từ lời nhắn, câu hỏi, nút bấm cho tới link nhận thông báo đều nằm ở tệp tin duy nhất:
👉 **[config.js](file:///c:/Users/binhm/Desktop/CuteWeb/config.js)**

Mở tệp tin `config.js` bằng trình soạn thảo văn bản (Notepad, VS Code,...) để tùy biến:
- Thay đổi nội dung thư ở `stage1`
- Thay đổi câu hỏi tỏ tình, nút bấm và danh sách các câu từ chối né tránh hài hước ở `stage2`
- Thay đổi lời hẹn và lời nhắc đi chơi ở `stage3` & `stage4`
- Cấu hình nhận thông báo trực tiếp qua **Discord Webhook** bằng cách dán link Webhook vào mục `discordWebhookUrl`.

---

## 🛠️ Các Bước Thiết Lập Lên GitHub (Triển khai nhanh bằng Trình duyệt)

Bạn có thể tải code lên trực tiếp bằng trang web GitHub mà không cần cài đặt dòng lệnh phức tạp:

### Bước 1: Tạo Kho Lưu Trữ (Repository) Mới trên GitHub
1. Truy cập vào trang web [GitHub](https://github.com/) và đăng nhập (hoặc đăng ký nếu chưa có tài khoản).
2. Nhấp vào nút **New** (hoặc biểu tượng dấu cộng `+` ở góc trên bên phải -> **New repository**).
3. Điền các thông tin sau:
   - **Repository name:** Điền tên bất kỳ (ví dụ: `cuteweb` hoặc `gui-nguoi-thuong`). Tên này sẽ xuất hiện trong đường dẫn trang web của bạn.
   - **Public/Private:** Bạn **bắt buộc phải chọn Public** để có thể sử dụng tính năng GitHub Pages miễn phí.
   - Các phần khác giữ nguyên.
4. Bấm nút xanh **Create repository** ở dưới cùng.

### Bước 2: Tải các File Code Lên GitHub
Sau khi tạo xong kho lưu trữ, bạn sẽ thấy trang hướng dẫn.
1. Nhấp vào đường link **"uploading an existing file"** nằm gần đầu trang.
2. Mở thư mục dự án trên máy tính của bạn (`CuteWeb`).
3. Kéo và thả 4 file sau vào vùng tải lên của trình duyệt:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `config.js` (Tệp tin cấu hình lời nhắn của bạn)
4. Chờ trình duyệt tải lên xong, cuộn xuống dưới cùng và nhấp vào nút **Commit changes** màu xanh.

### Bước 3: Kích Hoạt Tính Năng GitHub Pages (Đường dẫn Web)
Bây giờ, hãy biến kho lưu trữ chứa code của bạn thành một trang web thực thụ:
1. Nhấp vào tab **Settings** (Cài đặt - hình bánh răng) ở thanh menu đầu trang kho lưu trữ.
2. Tại menu bên trái, tìm và nhấp chọn mục **Pages** (nằm ở phần *Code and automation*).
3. Tại phần **Build and deployment**:
   - Ở mục **Source**, giữ nguyên là **Deploy from a branch**.
   - Ở mục **Branch**, nhấp vào nút thả xuống đang ghi là **None**, chọn **main** (hoặc `master`).
   - Nhấp vào nút **Save** bên cạnh.
4. Đợi khoảng 1 - 2 phút, sau đó tải lại trang này. Bạn sẽ thấy một khung màu xanh lá cây xuất hiện ở đầu trang kèm dòng chữ: 
   > **Your site is live at:** `https://<ten-username-cua-ban>.github.io/<ten-repository>/`
5. Hãy copy đường link đó và gửi cho người ấy!

---

## 🔔 Cách Nhận Thông Báo Ngày Hẹn Về Máy Của Bạn

Trang web hỗ trợ 2 cách nhận thông báo khi người ấy chọn ngày hẹn hò:

### Cách 1: Qua GitHub Issues (Mặc định - An toàn nhất)
* **Nguyên lý:** Khi người ấy chọn ngày hẹn và bấm xác nhận, trang web sẽ tự động mở trang tạo **GitHub Issue** mới thuộc kho lưu trữ của bạn. Nội dung ngày hẹn sẽ được tự động soạn sẵn, người ấy chỉ việc bấm nút "Submit".
* **Cách bạn nhận tin:** Bạn sẽ ngay lập tức nhận được một email từ GitHub thông báo về điện thoại/máy tính của bạn (tới địa chỉ email đăng ký tài khoản GitHub).
* **Ưu điểm:** Hoàn toàn bảo mật, không cần cấu hình phức tạp.

### Cách 2: Qua Discord Webhook (Thông báo trực tiếp vào phòng Chat Discord)
Nếu bạn muốn thông báo hiển thị trực tiếp và bí mật vào phòng chat Discord của bạn:
1. Mở Discord trên máy tính, vào máy chủ của bạn -> Nhấp chuột vào hình bánh răng bên cạnh tên kênh chat -> Chọn mục **Integrations** (Liên kết) -> Chọn **Webhooks** -> Bấm **Create Webhook** -> Chọn **Copy Webhook URL**.
2. Mở file `config.js` của bạn trên máy tính.
3. Dán link vừa copy vào dòng số 6:
   ```javascript
   discordWebhookUrl: "https://discord.com/api/webhooks/xxxxxx/xxxxxx",
   ```
4. Lưu file và tải file `config.js` đã sửa lên lại GitHub.
5. Từ bây giờ, mỗi khi người ấy chọn ngày hẹn, điện thoại/máy tính của bạn sẽ lập tức nhận được tin nhắn báo từ Discord!

---

Chúc bạn có một lời tỏ tình thành công rực rỡ và đong đầy yêu thương! 💕✨
