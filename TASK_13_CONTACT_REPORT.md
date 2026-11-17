# BÁO CÁO NGHIỆM THU TASK 13 — CONTACT PAGE IMPLEMENTATION

**Dự án:** BIZWORK-IT Website Redesign  
**Mã task:** Task 13  
**Trạng thái đề xuất:** `READY_FOR_REVIEW`  
**Giai đoạn:** Giai đoạn 5 — Triển khai trang Liên hệ (`/contact`)  
**Tài liệu tham chiếu đã duyệt:** `REQUIREMENTS.md`, `DESIGN_DIRECTION.md`, `INFORMATION_ARCHITECTURE.md`, `CONTENT_INVENTORY.md`, `FUNCTIONALITY_CHECKLIST.md`, `UI_UX_REVIEW.md`

---

## 1. Danh sách file tạo mới và chỉnh sửa

### Các file tạo mới:
1. `components/contact/ContactHero.tsx`: Section Hero của trang Contact với Breadcrumb điều hướng (`Home / Contact Us`), tiêu đề H1 duy nhất, lời mời kết nối *"Drop us a line!"*, và nút CTA cuộn êm xuống `#contact-form`.
2. `components/contact/ContactInfo.tsx`: Section hiển thị thông tin pháp nhân đã xác minh (`BIZWORKIT (S) PTE LTD`, Singapore), lời mời gặp trực tiếp (`TXT-022`), và thông báo minh bạch về các kênh liên hệ đang chờ phê duyệt chính thức (`PC-01`, `PC-02`).
3. `components/contact/ContactForm.tsx`: Component Client tương tác biểu mẫu liên hệ gồm 5 trường nhập liệu (Họ tên, Email doanh nghiệp, Tên công ty, Nhóm dịch vụ quan tâm, Tin nhắn), kiểm tra tính hợp lệ dữ liệu ở client-side (real-time và submit), thông báo lỗi ngữ nghĩa, và banner thông báo trạng thái kiểm tra thành công trung thực (không giả vờ gửi email khi chưa tích hợp backend).
4. `components/contact/WhatHappensNext.tsx`: Section giải thích quy trình 3 bước tiếp nhận và trao đổi sau khi khách hàng liên hệ (Review yêu cầu, Trao đổi khám phá nhu cầu, Đề xuất phạm vi may đo) mà không đặt ra SLA hay cam kết thời gian phản hồi chưa có căn cứ.
5. `components/contact/ContactClosingCta.tsx`: Khối thẻ điều hướng cuối trang trên nền Slate-900 tương phản cao, cung cấp liên kết dẫn về `/services` và `/about`.
6. `components/contact/index.ts`: File export tập trung cho module `components/contact`.
7. `TASK_13_CONTACT_REPORT.md`: Báo cáo nghiệm thu chi tiết Task 13.

### Các file đã chỉnh sửa:
1. `app/contact/page.tsx`: Thay thế toàn bộ placeholder cũ bằng cấu trúc 5 section hoàn chỉnh, tích hợp grid layout responsive cho thông tin pháp nhân và biểu mẫu, đồng thời cấu hình SEO metadata cho trang Contact.

---

## 2. Mô tả chi tiết 5 sections trên Trang Contact (`/contact`)

| STT | Tên Section | Mục tiêu người dùng | Chi tiết nội dung và căn cứ kiểm chứng | Cụm CTA / Liên kết |
| :---: | :--- | :--- | :--- | :--- |
| **01** | **Contact Hero** (`ContactHero`) | Xác nhận trang liên hệ và tạo lời mời thân thiện | - Breadcrumb ngữ nghĩa: `Home / Contact Us`<br>- Tiêu đề H1 duy nhất: *"Contact BIZWORK-IT"*<br>- Khẩu hiệu & Lời mời: *"Drop us a line! We make technology accessible."* (TXT-003, TXT-014)<br>- Mô tả khuyến khích trao đổi về hệ điều hành, mạng và tối ưu quản trị IT | - Primary CTA: `"Jump to Contact Form ↓"` $\to$ cuộn tới `#contact-form`<br>- Secondary CTA: `"Explore Our Services"` $\to$ `/services` |
| **02** | **Contact Information** (`ContactInfo`) | Nắm rõ thông tin pháp nhân chính thức và kênh giao tiếp | - Pháp nhân đã xác minh: `BIZWORKIT (S) PTE LTD` (TXT-023)<br>- Địa danh hoạt động: `Singapore` (TXT-024)<br>- Lời mời gặp trực tiếp: *"Better yet, see us in person!"* (TXT-022)<br>- Thông báo kênh liên hệ: Nêu rõ địa chỉ đường phố cụ thể, hotline và email hỗ trợ trực tiếp đang chờ cấu hình chính thức (PC-01, PC-02); biểu mẫu Contact Portal là kênh tiếp nhận chính | Huy hiệu xác minh pháp nhân và ghi chú minh bạch |
| **03** | **Contact Form** (`ContactForm`) | Nhập và gửi nhu cầu công nghệ của doanh nghiệp | - Bố cục form chuyên nghiệp gồm 5 trường nhập liệu:<br>  1. *Full Name* (Họ và tên — Bắt buộc, $\ge 2$ ký tự)<br>  2. *Business Email* (Email doanh nghiệp — Bắt buộc, kiểm tra Regex)<br>  3. *Company Name* (Tên công ty — Tùy chọn)<br>  4. *Service of Interest* (Nhóm dịch vụ — Dropdown 3 tùy chọn: Tech Support, IT Outsourcing, General Consultation)<br>  5. *Message* (Nội dung yêu cầu — Bắt buộc, $\ge 10$ ký tự)<br>- Nút bấm: `"Validate & Submit Inquiry (Client Demo)"` | Nút Validate Form và Nút Reset để kiểm tra lại |
| **04** | **What Happens Next** (`WhatHappensNext`) | Hiểu rõ các bước làm việc tiếp theo một cách thực tế | 3 bước khám phá và tư vấn trung tính:<br>1. *Requirement Review:* Xem xét bối cảnh hệ điều hành và mạng hiện tại<br>2. *Discovery Discussion:* Trao đổi chi tiết nhằm làm rõ luồng công việc và ngân sách<br>3. *Tailored Proposal:* Đề xuất gói hỗ trợ kỹ thuật hoặc quản trị thuê ngoài phù hợp | 3 thẻ quy trình trực quan với icon SVG |
| **05** | **Closing CTA** (`ContactClosingCta`) | Cung cấp tài nguyên tìm hiểu thêm trước khi rời trang | - Khối thẻ nền tối Slate-900 đồng bộ Design System<br>- Tiêu đề: *"Need More Context on What We Offer?"*<br>- Tagline: *"We make technology accessible!"* | - Primary CTA: `"Explore Our Services"` $\to$ `/services`<br>- Secondary CTA: `"About BIZWORK-IT"` $\to$ `/about` |

---

## 3. Cách hoạt động của Validation và Trạng thái Form

Biểu mẫu liên hệ được triển khai dưới dạng Client Component độc lập (`'use client'`) tuân thủ nghiêm ngặt các yêu cầu:
1. **Kiểm tra tính hợp lệ dữ liệu (Client-side Validation):**
   - **Họ và tên (`fullName`):** Bắt buộc, không được để trống hoặc chỉ có khoảng trắng, độ dài tối thiểu 2 ký tự.
   - **Email (`email`):** Bắt buộc, kiểm tra định dạng email chuẩn qua biểu thức chính quy (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
   - **Tin nhắn (`message`):** Bắt buộc, độ dài tối thiểu 10 ký tự nhằm đảm bảo khách hàng cung cấp đủ thông tin ban đầu.
   - **Real-time & On-blur Validation:** Khi người dùng rời khỏi ô nhập liệu (`onBlur`) hoặc sửa dữ liệu đã bị lỗi, thông báo lỗi được cập nhật tức thì.
2. **Trợ năng (Accessibility & Semantic HTML):**
   - Mọi thẻ `<input>`, `<select>`, `<textarea>` đều có `<label>` liên kết qua `htmlFor` và `id`.
   - Có dấu hoa thị đỏ `<span className="text-red-500">*</span>` hiển thị trực quan các trường bắt buộc.
   - Khi có lỗi, phần tử được gán `aria-invalid="true"` và liên kết với thông báo lỗi qua `aria-describedby="{id}-error"`.
   - Viền ô nhập liệu chuyển sang màu đỏ cảnh báo (`border-red-400 bg-red-50/20`), khi focus có vòng sáng rõ nét.
3. **Trạng thái xác nhận trung thực (Honest Confirmation State):**
   - Tuân thủ yêu cầu: **Tuyệt đối không giả vờ gửi email thành công khi chưa có hệ thống backend/email service tiếp nhận thực tế.**
   - Khi vượt qua validation, form hiển thị banner xác nhận:
     - Biểu tượng checkmark xanh với thông điệp: *"Client-Side Validation Successful"*.
     - Ghi chú minh bạch: Nêu rõ toàn bộ dữ liệu đã thỏa mãn tiêu chuẩn kiểm tra; dịch vụ gửi email và tích hợp backend đang chờ triển khai ở giai đoạn tiếp theo; **không có dữ liệu nào bị lưu trữ ngầm hoặc gửi giả mạo**.
     - Cung cấp nút `"Reset Form to Test Again"` để người dùng hoặc người thẩm định có thể xóa trạng thái và kiểm tra lại nhiều lần.

---

## 4. Những thông tin doanh nghiệp còn chờ xác minh

Căn cứ theo bảng kiểm kê `CONTENT_INVENTORY.md` và `REQUIREMENTS.md` (mục PC-01, PC-02):
1. **Địa chỉ văn phòng chi tiết (`PC-01`):** Website GoDaddy cũ chỉ hiển thị chữ `"Singapore"`. Địa chỉ chi tiết (tòa nhà, số nhà, đường, mã bưu chính) đang chờ khách hàng/doanh nghiệp xác nhận. Trang web chỉ ghi nhận địa danh `"Singapore"` và không bịa đặt địa chỉ giả hay cắm bản đồ Google Maps sai sự thật.
2. **Số điện thoại Hotline & Email hỗ trợ trực tiếp (`PC-02`):** Website cũ không công khai số điện thoại hay email trực tiếp. Trang web hiện tại không hiển thị hotline hay email giả làm thông tin chính thức, mà hướng dẫn người dùng sử dụng form liên hệ trực tuyến để kết nối.
3. **Giờ làm việc:** Không tự ý đưa ra khung giờ làm việc cố định hay cam kết thời gian trực tổng đài khi chưa có văn bản phê duyệt.

---

## 5. Kết quả từng lệnh kiểm thử kỹ thuật

### 5.1. Kiểm tra TypeScript (`npx tsc --noEmit`)
```text
npx tsc --noEmit
Exit code: 0 (No type errors)
```

### 5.2. Kiểm tra Lint (`npm run lint`)
```text
> bizwork-redesign@0.1.0 lint
> eslint
Exit code: 0 (0 errors, 0 warnings)
```

### 5.3. Kiểm tra Production Build (`npm run build`)
```text
> bizwork-redesign@0.1.0 build
> next build

▲ Next.js 16.4.3 (Turbopack)
✓ Running next.config.ts took 35ms
  Creating an optimized production build ...
✓ Compiled successfully in 394ms
  Running TypeScript ...
  Finished TypeScript in 1904ms ...
  Collecting page data using 7 workers ...
✓ Generating static pages using 7 workers (6/6) in 1163ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /contact
└ ○ /services

○  (Static)  prerendered as static content
Exit code: 0
```

---

## 6. Kết quả kiểm tra Responsive và Trình duyệt

Đo kiểm thực tế bằng Browser Subagent qua dev server nội bộ:

### 6.1. Kiểm tra Form Validation
- **Trường hợp 1 (Dữ liệu trống):** Bấm nút gửi khi chưa nhập liệu $\to$ Lập tức hiển thị 3 thông báo lỗi đỏ dưới Full Name, Business Email, Message; focus ring chuyển đỏ; form không submit.
- **Trường hợp 2 (Email sai định dạng):** Nhập `Alex Tan`, nhập email `invalid-email`, nhập tin nhắn $\to$ Hiển thị thông báo lỗi: *"Please enter a valid email address (e.g., name@company.com)"*.
- **Trường hợp 3 (Dữ liệu hợp lệ):** Nhập email `alex@company.com` $\to$ Lỗi biến mất; bấm nút gửi $\to$ Hiển thị banner xác nhận Client-side Validation thành công kèm ghi chú trung thực về việc backend đang chờ cấu hình.
- **Trường hợp 4 (Reset form):** Bấm `"Reset Form to Test Again"` $\to$ Biểu mẫu trở về trạng thái ban đầu sạch sẽ, sẵn sàng kiểm tra lại.

### 6.2. Kiểm tra Responsive đa kích thước màn hình
- **Desktop (1440px và 1280px):** Hero căn giữa thoáng đãng, khối thông tin liên hệ (bên trái 5 cột) và biểu mẫu (bên phải 7 cột) nằm cạnh nhau cân đối; What Happens Next hiển thị 3 cột ngang.
- **Tablet (768px):** Bố cục tự động co giãn lề, form và thông tin liên hệ xếp hàng dọc dễ đọc, các trường nhập liệu giữ khoảng cách rộng rãi.
- **Mobile (390px và 375px):** Toàn bộ giao diện chuyển thành 1 cột duy nhất; các ô nhập liệu và nút bấm đạt chiều rộng 100% với chiều cao touch target $\ge 48$px.
- **Đo kiểm tràn màn hình ngang:** Đã thực thi lệnh JavaScript đo kiểm:
  `document.documentElement.scrollWidth === window.innerWidth` $\to$ **Kết quả: `true` trên cả 390px và 375px (hoàn toàn không có horizontal scroll)**.

### 6.3. Kiểm tra liên kết và điều hướng các trang khác
- Bấm nút `"Jump to Contact Form ↓"` tại Hero $\to$ Cuộn êm đến `#contact-form`.
- Bấm nút `"Explore Our Services"` tại Closing CTA $\to$ Điều hướng chính xác tới `/services`.
- Bấm nút `"About BIZWORK-IT"` tại Closing CTA $\to$ Điều hướng chính xác tới `/about`.
- Đã kiểm tra lại toàn bộ các route `/`, `/about`, `/services` $\to$ Tất cả các trang đều tải với HTTP 200, hiển thị đầy đủ nội dung và hoạt động bình thường.
- Không có lỗi console hoặc runtime error nào phát sinh.

---

## 7. Những giới hạn còn tồn tại

1. **Dịch vụ gửi email backend:** Trong phạm vi Task 13, form chỉ xử lý validation và hiển thị trạng thái phía client. Việc kết nối email service (như Resend API, Web3Forms hoặc SMTP server riêng) sẽ được thực hiện khi có thông tin cấu hình hòm thư chính thức.
2. **Thông tin liên lạc trực tiếp:** Số điện thoại hotline và địa chỉ chi tiết tại Singapore vẫn để ở trạng thái chờ xác minh từ doanh nghiệp (`PC-01`, `PC-02`).
3. **Đa ngôn ngữ EN/VI:** Cơ chế chuyển đổi ngôn ngữ song ngữ cho trang Contact sẽ được kết nối ở task tiếp theo theo kế hoạch dự án.

---

## 8. Xác nhận an toàn đối với Website Production

Toàn bộ công việc thực hiện hoàn toàn trong mã nguồn cục bộ Next.js tại `d:\bizwork-redesign`. Không can thiệp vào máy chủ GoDaddy, không chỉnh sửa DNS, không gây gián đoạn website đang vận hành tại `https://bizwork-it.com/`.

---

**Trạng thái Task 13:** `READY_FOR_REVIEW`. Đã hoàn tất và dừng hoàn toàn để chờ xét duyệt.
