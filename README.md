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

## 🔔 Cách Nhận Thông Báo Ngày Hẹn Về Máy Của Bạn (Tự Động Gửi Ngầm)

Để người ấy **không cần bấm thêm nút "Submit"** trên GitHub (tránh gây bối rối), trang web hỗ trợ 2 kênh gửi thông báo tự động hoàn toàn ẩn (gửi ngầm):

### Kênh 1: Gửi ngầm về Email cá nhân bằng Web3Forms (Khuyên dùng)
* **Ưu điểm:** Tự động gửi email thông báo về hộp thư cá nhân (Gmail, Outlook,...) của bạn ngay khi người ấy nhấn "Xác nhận ngày hẹn". Người ấy hoàn toàn không thấy trang chuyển hướng hay cần nhấn thêm nút gì khác.
* **Cách thiết lập:**
  1. Truy cập vào trang web [Web3Forms](https://web3forms.com/) (miễn phí, không cần mật khẩu).
  2. Điền địa chỉ email bạn muốn nhận thông báo ở mục đăng ký và nhấn **Create Access Key**.
  3. Kiểm tra email của bạn để lấy mã Access Key (chuỗi ký tự dài).
  4. Mở file [config.js](file:///c:/Users/binhm/Desktop/CuteWeb/config.js) và dán mã key đó vào:
     ```javascript
     web3formsAccessKey: "MÃ-ACCESS-KEY-CỦA-BẠN",
     ```
  5. Lưu file và tải lên lại GitHub.

### Kênh 2: Gửi ngầm về kênh Discord cá nhân (Thông báo tức thì về điện thoại)
* **Ưu điểm:** Thông báo nhảy thẳng vào ứng dụng Discord trên điện thoại/máy tính của bạn cực nhanh và âm thầm.
* **Cách thiết lập:**
  1. Mở Discord trên máy tính, vào máy chủ của bạn -> Nhấp chuột vào hình bánh răng bên cạnh tên kênh chat -> Chọn mục **Integrations** (Liên kết) -> Chọn **Webhooks** -> Bấm **Create Webhook** -> Chọn **Copy Webhook URL**.
  2. Mở file [config.js](file:///c:/Users/binhm/Desktop/CuteWeb/config.js) và dán link vừa copy vào:
     ```javascript
     discordWebhookUrl: "https://discord.com/api/webhooks/xxxxxx/xxxxxx",
     ```
  3. Lưu file và tải lên lại GitHub.

---

### ⚠️ Lưu ý về GitHub Issues (Chế độ dự phòng khi không cài đặt 2 kênh trên)
Nếu bạn giữ nguyên file `config.js` trống (không điền Webhook và cũng không điền Web3Forms Key), trang web sẽ tự động sử dụng cơ chế mở trang **GitHub Issue** để gửi tin nhắn. Trong trường hợp này, người ấy sẽ phải bấm nút **Submit new issue** trên trang GitHub thì bạn mới nhận được email báo. Do đó, hãy cấu hình **Kênh 1 hoặc Kênh 2** để người ấy có trải nghiệm tự động mượt mà nhất nhé!

---

Chúc bạn có một lời tỏ tình thành công rực rỡ và đong đầy yêu thương! 💕✨
