# KIỂM KÊ CHỨC NĂNG VÀ HÀNH VI TƯƠNG TÁC (FUNCTIONALITY CHECKLIST)
**Dự án:** BIZWORK-IT Website Redesign  
**Nguồn kiểm tra:** [https://bizwork-it.com/](https://bizwork-it.com/)  
**Ngày thực hiện:** 24/10/2026  
**Trạng thái tài liệu:** Task 03 — Functionality Checklist hoàn thành

---

## 1. THÔNG TIN TASK VÀ PHẠM VI

- **Task ID:** Task 03
- **Tên task:** Kiểm kê chức năng (Functionality Checklist)
- **Giai đoạn:** Giai đoạn 1 — Audit website hiện tại
- **Mục tiêu:** Kiểm tra trực tiếp website hiện tại bằng trình duyệt, phân tích DOM và JavaScript công khai để ghi lại toàn bộ các chức năng, hành vi tương tác thực tế làm căn cứ triển khai website mới chuẩn xác.
- **Phạm vi kiểm tra:**
  1. Header và điều hướng (Logo, menu desktop/mobile, nút More, CTA).
  2. Hero Section (Nút Get in Touch, hành vi cuộn mượt smooth-scroll).
  3. Bố cục hiển thị Responsive (Desktop 1280x800, Mobile 375x667, kiểm tra tràn ngang).
  4. Biểu mẫu liên hệ Contact Form (Validation trống, định dạng email, đính kèm file, nút Send).
  5. Cookie Banner (Hiển thị, nút Accept, cơ chế lưu trạng thái).
  6. Floating Chat/Messaging FAB (Hành vi click, popup, nút đóng).
  7. Footer & Liên kết ngoài (Chính sách Google reCAPTCHA, Powered by GoDaddy).
  8. Khả năng tiếp cận cơ bản (Keyboard accessibility, focus states, nhãn trường).
  9. Lỗi giao diện & trạng thái bất thường.
- **Ranh giới an toàn:** Tuyệt đối không gửi form thật, không gửi email rác tới hộp thư doanh nghiệp, không upload file lên server production, không cố vượt CAPTCHA.

---

## 2. PHƯƠNG PHÁP KIỂM TRA

1. **Kiểm thử trực tiếp trên trình duyệt (Browser Automation & Visual Observation):**
   - Khởi chạy phiên duyệt tương tác thực tế trên [https://bizwork-it.com/](https://bizwork-it.com/).
   - Thao tác click, hover, nhập liệu thử nghiệm, cuộn trang và thu nhỏ/mở rộng viewport.
   - Ghi lại bằng chứng hình ảnh (screenshots) và video ghi hình phiên kiểm thử WebP.
2. **Phân tích mã nguồn và trạng thái DOM:**
   - Kiểm tra mã sự kiện JS, thuộc tính ARIA, trạng thái CSS `:focus`, `:hover`, `class` biến đổi khi tương tác.
3. **Quy chuẩn đánh giá:**
   - **PASS:** Chức năng hoạt động đúng kỳ vọng, đã kiểm chứng bằng tương tác thực tế.
   - **FAIL:** Chức năng bị lỗi, không phản hồi hoặc sai lệch giao diện.
   - **BLOCKED:** Bị chặn do cơ chế bảo mật (như CAPTCHA hoặc rate-limit).
   - **NOT TESTED:** Chưa thể kiểm tra do giới hạn an toàn (ví dụ: submit form thành công vào hệ thống backend).

---

## 3. BẢNG KIỂM KÊ CHỨC NĂNG (FUNCTIONALITY CHECKLIST)

| Mã ID | Thành phần | Thao tác kiểm tra | Kết quả mong đợi | Kết quả quan sát thực tế | Trạng thái | Ghi chú & Đánh giá |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| **FNC-01** | Header Logo Text | Click vào text logo `BIZWORK-IT` | Tải lại hoặc cuộn về đầu trang chủ | Logo có gắn `href="/"`, click tải lại trang chủ ổn định | **PASS** | Dạng text thuần, chưa có hover effect rõ rệt. |
| **FNC-02** | Hero CTA Button | Click nút `Get in Touch` | Cuộn mượt (smooth-scroll) xuống Contact Section | Trang cuộn mượt xuống đúng anchor `#f3a9405b-249e-4d48-9175-b3b8ee945a5b` | **PASS** | Trải nghiệm cuộn mượt hoạt động chuẩn xác trên trình duyệt hiện đại. |
| **FNC-03** | Menu điều hướng | Quan sát thanh menu trên Desktop | Hiển thị các liên kết trang chính | Không có menu đa trang; chỉ có logo và nút CTA | **PASS** | Do kiến trúc web cũ là Landing Page đơn. |
| **FNC-04** | Nút `More` Mobile | Quan sát ở viewport 375x667 | Xuất hiện dropdown nếu có nhiều mục | Phần tử `NAV_MORE` tồn tại trong DOM nhưng ẩn vì web cũ không có nhiều trang con | **PASS** | Cần thiết kế lại mobile hamburger menu hoàn chỉnh ở bản mới. |
| **FNC-05** | Form Validation (Trống) | Bỏ trống tất cả các trường và nhấn nút `Send` | Kích hoạt cảnh báo trường bắt buộc | Hiển thị thông báo đỏ: `"Please enter a valid email address."` ngay dưới trường Email | **PASS** | Validation client-side GoDaddy chặn gửi khi thiếu Email. |
| **FNC-06** | Form Validation (Email sai) | Nhập chuỗi `"abc"` vào ô Email và nhấn `Send` | Báo lỗi định dạng email không đúng | Hiển thị thông báo đỏ cảnh báo email không hợp lệ | **PASS** | Kiểm tra định dạng Regex email hoạt động tốt. |
| **FNC-07** | Đính kèm tệp (`Attach Files`) | Click nút kẹp giấy `Attach Files` | Mở hộp thoại chọn tệp cục bộ | Thẻ input file ẩn chấp nhận nhiều định dạng (`accept=".jpg,.pdf,.doc,..."), counter `Attachments (0)` sẵn sàng | **PASS** | Giao diện đính kèm có sẵn. (Không upload file thật để bảo vệ an toàn). |
| **FNC-08** | Cookie Banner | Click nút `Accept` trên banner cookie | Banner ẩn đi mượt mà và ghi nhận cookie phiên | Banner đóng ngay lập tức mà không giật lag trang | **PASS** | Ghi nhận sự kiện đóng thành công. |
| **FNC-09** | Floating Chat Button | Click biểu tượng chat tròn ở góc dưới bên phải | Mở hộp thoại tin nhắn tương tác | Mở khung chat GoDaddy Messaging với lời chào *"Hi! Let us know how we can help..."* và form gửi tin nhắn nhanh | **PASS** | Chức năng chat widget tích hợp của GoDaddy hoạt động. |
| **FNC-10** | Đóng Chat Widget | Click nút `X` trên cửa sổ chat | Đóng khung chat và thu về biểu tượng tròn ban đầu | Khung chat đóng lại mượt mà, trở lại trạng thái nút nổi | **PASS** | Tương tác bật/tắt (toggle) hoạt động chuẩn. |
| **FNC-11** | Keyboard Navigation | Nhấn phím `Tab` liên tục trên bàn phím | Focus ring di chuyển tuần tự qua các nút và liên kết | Các phần tử tương tác (Logo, CTA, Form inputs, Send, Cookie Accept) nhận focus outline | **PASS** | Có hỗ trợ tiếp cận cơ bản bằng bàn phím. |
| **FNC-12** | Link Google Privacy & Terms | Click hoặc kiểm tra href | Trỏ tới chính sách của Google | Link mở tab mới tới `https://policies.google.com/privacy` và `terms` | **PASS** | Liên kết hoạt động bình thường. |

---

## 4. KẾT QUẢ ĐO KIỂM RESPONSIVE (CO GIÃN MÀN HÌNH)

- **Môi trường đo kiểm:**
  - **Desktop:** Viewport $1280 \times 800$ px và $1536 \times 776$ px.
  - **Mobile:** Viewport $375 \times 667$ px (chuẩn iPhone SE / Mobile tiêu chuẩn).
- **Kết quả quan sát chi tiết:**
  - **Tràn ngang (Horizontal Overflow):** Hoàn toàn **không** có hiện tượng vỡ layout hay thanh cuộn ngang ngoài ý muốn (`overflow-x` an toàn trên cả desktop và mobile).
  - **Bố cục Hero Banner:** Ảnh nền co giãn thích ứng tốt nhờ các lớp CSS responsive background từ GoDaddy CDN. Chữ tiêu đề tự động xuống dòng hợp lý.
  - **Bố cục 3 thẻ tính năng (About/Services):** Trên desktop hiển thị theo dạng hàng ngang 3 cột; trên mobile tự động xếp chồng (stacking) 1 cột thẳng đứng, hình ảnh co giãn tỷ lệ 100% chiều rộng container.
  - **Bố cục Form liên hệ:** Khối form và khối thông tin công ty xếp ngang trên desktop; chuyển sang xếp dọc trên mobile, các nút bấm và ô nhập liệu đủ lớn (touch target $\ge 44$ px), thuận tiện thao tác bằng ngón tay.

---

## 5. KẾT QUẢ KIỂM TRA BIỂU MẪU LIÊN HỆ (CONTACT FORM)

- **Cấu trúc trường dữ liệu:**
  1. `Name` (Họ tên): Trường text tùy chọn, có hiệu ứng floating label khi click.
  2. `Email*` (Thư điện tử): Trường text bắt buộc (`required`), có regex kiểm tra định dạng email hợp lệ.
  3. `Message` (Nội dung tin nhắn): Trường `textarea` 4 dòng, có thể co giãn.
  4. `Attach Files` (Đính kèm tệp): Cho phép chọn file từ máy khách, chấp nhận các định dạng văn phòng, ảnh, video, âm thanh, nén.
  5. `Send` (Nút gửi): Kích hoạt client validation khi bấm.
- **Cơ chế phòng vệ:** Tích hợp Google reCAPTCHA ngầm (`data-aid="CONTACT_FORM"` liên kết Google Privacy & Terms).
- **Giới hạn kiểm thử:** Quy trình nhận dữ liệu thực tế (email chuyển tiếp đến hòm thư nào, webhook nào xử lý) không thể kiểm tra từ phía frontend và không được phép gửi tin nhắn thật để tránh tạo rác dữ liệu cho doanh nghiệp.

---

## 6. KẾT QUẢ KIỂM TRA COOKIE, CHAT VÀ ĐIỀU HƯỚNG

1. **Cookie Banner:**
   - Vị trí: Cố định ở góc dưới bên phải màn hình (fixed bottom-right card).
   - Nội dung thông báo rõ ràng về việc sử dụng cookie phân tích lưu lượng.
   - Nút `Accept`: Nhấn vào đóng banner ngay lập tức, không gây reload trang.
2. **Floating Chat Widget (GoDaddy Messaging FAB):**
   - Vị trí: Biểu tượng bong bóng chat màu xám đậm cố định góc dưới bên phải (`z-index` cao).
   - Khi click: Mở ra một popover chat card có header, lời chào tự động và form thu thập lead (Name, Email, Message, Send button).
   - Khi click nút `X`: Đóng popover quay lại biểu tượng chat ban đầu.
   - **Đánh giá cho bản redesign:** Đây là widget độc quyền thuộc nền tảng GoDaddy Website Builder. Website mới độc lập sẽ không tự động có widget này trừ khi tích hợp dịch vụ bên thứ ba (hoặc chuyển hướng người dùng trực tiếp vào trang `/contact`).
3. **Điều hướng nội bộ:**
   - Nút `Get in Touch` sử dụng thẻ `<a href="/#f3a9405b-249e-4d48-9175-b3b8ee945a5b">` với CSS `scroll-behavior: smooth`, đưa người dùng đến đúng vị trí biểu mẫu.

---

## 7. DANH SÁCH LỖI VÀ VẤN ĐỀ CẦN XỬ LÝ TRONG BẢN REDESIGN

| STT | Vấn đề phát hiện trên web cũ | Mức độ | Ảnh hưởng | Đề xuất giải pháp cho Website mới |
| :---: | :--- | :---: | :--- | :--- |
| **ISS-01** | **Thiếu hệ thống Navigation đa trang** | Cao | Người dùng không thể chuyển trang nhanh giữa About, Services, Contact | Thiết kế thanh Header cố định (Sticky Header) với đầy đủ 4 liên kết trang rõ ràng, kèm nút chuyển đổi ngôn ngữ EN / VI. |
| **ISS-02** | **Anchor ID ngẫu nhiên khó bảo trì** | Trung bình | ID section là chuỗi UUID của GoDaddy (`#f3a9405b-...`), khó đọc, không thân thiện với SEO | Chuẩn hóa ID thành ngữ nghĩa rõ ràng: `#contact`, `#about`, `#services` và tạo các route trang tĩnh tương ứng (`/about`, `/services`, `/contact`). |
| **ISS-03** | **Không có liên kết mạng xã hội hoặc số điện thoại** | Trung bình | Giảm tính minh bạch và kênh tương tác đa dạng | Bổ sung khu vực mạng xã hội (LinkedIn, Facebook nếu có) và số điện thoại liên hệ trên Header/Footer. |
| **ISS-04** | **Phụ thuộc Chat Widget của GoDaddy** | Trung bình | Khi tách khỏi GoDaddy, chat widget này sẽ ngừng hoạt động | Thiết kế trang Contact chuyên nghiệp với form liên hệ trực tiếp, bản đồ chỉ đường và các kênh liên hệ thay thế. |
| **ISS-05** | **Hiệu ứng vi tương tác (Micro-interactions) còn nghèo nàn** | Thấp | Nút bấm và thẻ card không có hover animations hiện đại | Bổ sung chuyển động mượt mà (smooth transitions, hover scale, subtle glow) để tạo cảm giác hiện đại, cao cấp. |

---

## 8. DANH SÁCH CHỨC NĂNG CHƯA XÁC MINH (`UNVERIFIED`)

| STT | Chức năng chưa xác minh | Lý do chưa xác minh | Điều kiện / Cách xử lý |
| :---: | :--- | :--- | :--- |
| **UNV-01** | **Cơ chế xử lý Form Backend** | Không được phép gửi form thật lên máy chủ doanh nghiệp | Cần cấu hình và thử nghiệm giải pháp gửi form độc lập (như Resend API, Formspree) trong môi trường phát triển Next.js ở Giai đoạn 6. |
| **UNV-02** | **Hộp thư nhận thông báo tin nhắn Chat** | Chat widget của GoDaddy quản lý qua tài khoản nội bộ GoDaddy của khách hàng | Chưa xác minh tin nhắn gửi qua chat widget chuyển đến email hay ứng dụng di động nào. |
| **UNV-03** | **Giới hạn dung lượng tải tệp đính kèm** | Không upload file thử nghiệm để tránh ghi dữ liệu lên máy chủ GoDaddy | Sẽ đặc tả giới hạn an toàn (ví dụ: tối đa 5MB - 10MB) khi xây dựng form mới. |

---

## 9. BẰNG CHỨNG VÀ GIỚI HẠN KIỂM THỬ

### 9.1. Bằng chứng kiểm thử đã lưu trữ
Toàn bộ phiên tương tác thực tế đã được chụp ảnh màn hình và quay video màn hình:
- **Ảnh chụp màn hình (Screenshots):**
  - Giao diện Desktop trang chủ: `bizwork_homepage_desktop_1792823133147.png`
  - Đóng Cookie Banner: `cookie_accepted_1792823143740.png`
  - Cuộn mượt tới Contact: `contact_section_scrolled_1792823152696.png`
  - Báo lỗi form khi submit trống: `form_validation_empty_1792823164469.png`
  - Báo lỗi form khi nhập email sai: `form_validation_invalid_email_1792823176230.png`
  - Giao diện co giãn Mobile 375x667: `mobile_view_375x667_1792823191496.png`
  - Mở Chat Widget: `chat_opened_1792823211487.png`
  - Đóng Chat Widget: `chat_closed_1792823221964.png`
  - Kiểm tra Keyboard Focus: `focus_indicator_1792823238187.png`
- **Video phiên tương tác (WebP Recording):**
  - File ghi hình đầy đủ: `functionality_audit_1792823104263.webp`

### 9.2. Giới hạn kiểm thử
- Không thực hiện penetration test (tấn công bảo mật).
- Không gửi request flood để tránh rate-limit HTTP 429.
- Không can thiệp hoặc thay đổi trạng thái máy chủ GoDaddy.

---

## 10. CHECKLIST NGHIỆM THU VÀ ĐỀ XUẤT BƯỚC TIẾP THEO

### 10.1. Checklist nghiệm thu Task 03
- [x] **PASS:** Kiểm tra và xác nhận hành vi nút CTA và hiệu ứng cuộn mượt (smooth-scroll).
- [x] **PASS:** Kiểm tra khả năng co giãn bố cục Responsive trên cả Desktop và Mobile.
- [x] **PASS:** Kiểm tra validation client-side của form liên hệ (bắt buộc email, regex email sai).
- [x] **PASS:** Kiểm tra tương tác đóng Cookie Banner.
- [x] **PASS:** Kiểm tra tương tác mở/đóng Floating Chat Widget.
- [x] **PASS:** Kiểm tra cơ chế điều hướng tiếp cận bằng bàn phím (Keyboard Tab navigation).
- [x] **PASS:** Ghi nhận đầy đủ danh sách lỗi, hạn chế và chức năng chưa xác minh.
- [x] **PASS:** Tài liệu `FUNCTIONALITY_CHECKLIST.md` được tạo độc lập tại thư mục gốc workspace, không can thiệp code ứng dụng, không ảnh hưởng production.

### 10.2. Đề xuất bước tiếp theo
- Đề xuất chuyển sang **Task 04: Đánh giá giao diện và tổng hợp audit (UI/UX Review & Audit Synthesis)** — task cuối cùng của Giai đoạn 1.
  - Mục tiêu Task 04: Đánh giá chuyên sâu về thiết kế UI/UX hiện tại (Typography, Color palette, Khoảng cách, Tỷ lệ tương phản WCAG, Điểm yếu UX), tổng hợp kết quả của Task 01, Task 02, Task 03 và hoàn thiện tài liệu `AUDIT_REPORT.md` tổng thể để chốt Giai đoạn 1.
