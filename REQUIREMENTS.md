# ĐẶC TẢ YÊU CẦU VÀ PHẠM VI DỰ ÁN (REQUIREMENTS & SCOPE SPECIFICATION)
**Dự án:** BIZWORK-IT Website Redesign  
**Mã tài liệu:** `REQUIREMENTS.md`  
**Giai đoạn:** Giai đoạn 2 — Đặc tả và lập kế hoạch thiết kế  
**Task liên quan:** Task 05 — Chốt yêu cầu và phạm vi  
**Nguồn đầu vào:** `AUDIT_REPORT.md`, `CONTENT_INVENTORY.md`, `FUNCTIONALITY_CHECKLIST.md`, `UI_UX_REVIEW.md`  
**Trạng thái:** Nguồn sự thật chính thức cho các giai đoạn thiết kế và phát triển tiếp theo

---

## 1. TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW)

### 1.1. Mục tiêu Redesign
- Chuyển đổi toàn diện website giới thiệu doanh nghiệp BIZWORK-IT từ mô hình Landing Page một trang đơn sơ trên GoDaddy Website Builder sang một website đa trang hiện đại, tối giản, chuyên nghiệp và có chiều sâu công nghệ.
- Nâng cao năng lực định vị thương hiệu, tạo dựng niềm tin vững chắc đối với khách hàng doanh nghiệp B2B tại Singapore và khu vực Đông Nam Á.
- Tối ưu hóa hành trình trải nghiệm người dùng (UX), cấu trúc rõ ràng các nhóm dịch vụ và nâng cao tỷ lệ chuyển đổi liên hệ (Conversion Rate).
- Hỗ trợ song ngữ đầy đủ: **Tiếng Anh (English)** và **Tiếng Việt (Vietnamese)**.

### 1.2. Đối tượng người dùng mục tiêu (Target Audience)
1. **Khách hàng doanh nghiệp vừa và nhỏ (SMBs / SMEs):** Các công ty tại Singapore và Đông Nam Á cần đối tác IT thuê ngoài (IT Outsourcing) để quản trị hệ điều hành, hệ thống mạng văn phòng, cơ sở dữ liệu và bảo trì định kỳ nhằm tối ưu chi phí (High ROI).
2. **Nhà quản lý, Giám đốc điều hành (CEOs, Operations Managers, IT Heads):** Những người tìm kiếm giải pháp hỗ trợ kỹ thuật chuyên nghiệp, an tâm về chất lượng ("Satisfaction Guaranteed") để tập trung vào hoạt động kinh doanh cốt lõi.
3. **Đối tác & Khách hàng tiềm năng:** Tìm kiếm thông tin năng lực pháp nhân, quy trình hợp tác và kênh kết nối nhanh chóng, minh bạch.

### 1.3. Phạm vi doanh nghiệp BIZWORK-IT
- **Pháp nhân chủ quản:** `BIZWORKIT (S) PTE LTD`.
- **Trụ sở đăng ký:** Singapore.
- **Lĩnh vực hoạt động:** Dịch vụ hỗ trợ công nghệ thông tin chuyên nghiệp (Professional Technology Assistance), Quản trị và bảo trì hạ tầng IT (Managed IT Services / IT Outsourcing).
- **Thông điệp định vị cốt lõi:** *"We make technology accessible!"*.

### 1.4. Các vấn đề cốt lõi từ Báo cáo Audit cần giải quyết
1. **Thiếu cấu trúc đa trang:** Website cũ là One-page landing page, thiếu menu điều hướng, làm phân tán nội dung và cản trở SEO chuyên sâu.
2. **Rủi ro phụ thuộc hạ tầng & CDN GoDaddy:** 4 ảnh stock lưu trên CDN `img1.wsimg.com` sẽ bị đứt gãy hoặc rủi ro bản quyền khi tách khỏi GoDaddy.
3. **Thiếu thông tin liên hệ trực tiếp:** Không có số hotline, không có email công khai, địa chỉ chỉ ghi chung chung "Singapore".
4. **Typography & Màu sắc chưa đạt chuẩn IT hiện đại:** Việc kết hợp font serif cổ điển (`Old Standard TT`) với bảng màu xám `#8d95a0` đơn điệu làm website thiếu tính công nghệ và năng động.
5. **Tiếp cận người dùng kém (Accessibility):** Toàn bộ ảnh cũ có `alt=""` (rỗng), thiếu liên kết điều hướng bàn phím tối ưu.

---

## 2. YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS - FR)

| Mã ID | Tên yêu cầu | Mô tả chi tiết | Mức ưu tiên | Nguồn kiểm chứng / Audit |
| :--- | :--- | :--- | :---: | :--- |
| **FR-001** | **Cấu trúc 4 trang chính** | Xây dựng 4 trang web độc lập với URL ngữ nghĩa riêng biệt:<br>1. Trang chủ (`/`): Định vị, tóm tắt thế mạnh, công nghệ, CTA.<br>2. Về chúng tôi (`/about`): Giới thiệu pháp nhân, sứ mệnh, cam kết.<br>3. Dịch vụ (`/services`): Trình bày 2 nhóm giải pháp IT chính.<br>4. Liên hệ (`/contact`): Form liên hệ, thông tin kết nối trực tiếp. | **MUST HAVE** | `AUDIT_REPORT.md` (Mục 8.2) |
| **FR-002** | **Header dùng chung (Sticky Header)** | Thanh điều hướng cố định trên cùng gồm:<br>- Logo text hoặc biểu tượng `BIZWORK-IT`.<br>- Menu điều hướng tới 4 trang chính có trạng thái active trực quan.<br>- Bộ chuyển đổi ngôn ngữ EN / VI.<br>- Nút CTA liên hệ nhanh (`Get in Touch`).<br>- Menu hamburger trượt mượt mà trên thiết bị di động. | **MUST HAVE** | `UI_UX_REVIEW.md` (Mục 2.1) |
| **FR-003** | **Footer dùng chung** | Chân trang cố định ở cuối mỗi trang gồm:<br>- Nhận diện thương hiệu & thông điệp cốt lõi.<br>- Thông tin pháp nhân `BIZWORKIT (S) PTE LTD` & Singapore.<br>- Danh mục liên kết điều hướng nhanh.<br>- Dòng bản quyền: `Copyright © 2025 BIZWORK-IT - All Rights Reserved.`<br>- Loại bỏ hoàn toàn nhãn "Powered by GoDaddy". | **MUST HAVE** | `CONTENT_INVENTORY.md` (TXT-023, 025) |
| **FR-004** | **Hệ thống chuyển đổi ngôn ngữ (EN / VI)** | Cung cấp khả năng chuyển đổi mượt mà giữa Tiếng Anh và Tiếng Việt:<br>- Bộ chọn ngôn ngữ cố định trên Header (`EN | VI`).<br>- Khi chuyển ngôn ngữ, người dùng được giữ nguyên tại trang hiện hành.<br>- Bản dịch được quản lý có cấu trúc, không gây chớp nháy giao diện. | **MUST HAVE** | `CONTENT_INVENTORY.md` (Mục 8) |
| **FR-005** | **Hệ thống Call-to-Action (CTA)** | Bố trí các nút kêu gọi hành động phân tầng rõ ràng:<br>- Primary CTA: `"Get in Touch"` / `"Liên hệ ngay"` dẫn tới trang `/contact`.<br>- Secondary CTA: `"Explore Services"` / `"Khám phá dịch vụ"` dẫn tới `/services`.<br>- Banner CTA cuối trang Home, About, Services để kích thích gửi tin nhắn. | **MUST HAVE** | `FUNCTIONALITY_CHECKLIST.md` (FNC-02) |
| **FR-006** | **Biểu mẫu liên hệ (Contact Form)** | Xây dựng form liên hệ trên trang `/contact` gồm các trường:<br>- Họ tên (`Name`): Text, bắt buộc.<br>- Email (`Email*`): Email, bắt buộc, regex RFC 5322.<br>- Danh mục dịch vụ (`Service Category`): Dropdown (IT Support, IT Outsourcing, Khác).<br>- Nội dung tin nhắn (`Message`): Textarea, bắt buộc.<br>- Đính kèm tệp (`Attach Files`): Hỗ trợ giao diện chọn tệp, ghi rõ giới hạn tối đa 10MB.<br>- Nút gửi (`Send` / `Gửi tin nhắn`). | **MUST HAVE** | `CONTENT_INVENTORY.md` (TXT-014 đến 020) |
| **FR-007** | **Trạng thái phản hồi của Contact Form** | Xử lý đầy đủ 4 trạng thái tương tác của form:<br>1. *Validation Error:* Báo lỗi cụ thể ngay dưới trường nhập khi để trống hoặc sai định dạng.<br>2. *Submitting/Loading:* Nút gửi chuyển sang trạng thái disabled có spinner khi đang xử lý.<br>3. *Success:* Hiển thị thông báo cảm ơn và xác nhận sẽ phản hồi trong 24h.<br>4. *Error:* Báo lỗi thân thiện nếu gửi thất bại kèm email dự phòng. | **MUST HAVE** | `FUNCTIONALITY_CHECKLIST.md` (FNC-05, 06) |
| **FR-008** | **Tương thích Responsive toàn diện** | Tối ưu hiển thị mượt mà trên 3 phân khúc màn hình:<br>- Desktop ($\ge 1024$px): Layout đa cột thông thoáng, thanh menu ngang.<br>- Tablet ($768$px - $1023$px): Tự động co giãn 2 cột, lề phù hợp.<br>- Mobile ($< 768$px, tối thiểu $320$px): Menu dạng drawer/hamburger, các cột xếp chồng 1 hàng, touch target $\ge 44$px, không có thanh cuộn ngang ngoài ý muốn. | **MUST HAVE** | `FUNCTIONALITY_CHECKLIST.md` (Mục 4) |
| **FR-009** | **SEO Metadata cơ bản theo từng trang** | Khai báo metadata độc lập cho cả 4 trang:<br>- Thẻ `<title>` chuyên biệt (ví dụ: `Home | BIZWORK-IT`, `Services | BIZWORK-IT`).<br>- Thẻ `meta[name="description"]` chứa từ khóa IT B2B.<br>- Thẻ OpenGraph và Twitter Card hoàn chỉnh.<br>- Thẻ Canonical link và thuộc tính ngôn ngữ `html lang`. | **MUST HAVE** | `AUDIT_REPORT.md` (Mục 2.2) |
| **FR-010** | **Khả năng tiếp cận & Điều hướng bàn phím (a11y)** | - Thuộc tính `alt` mô tả ngữ nghĩa 100% hình ảnh.<br>- Phím `Tab` điều hướng tuần tự qua tất cả nút, link, input có outline nổi bật.<br>- Thẻ `<label>` gắn liên kết đúng với `<input>` thông qua `htmlFor`/`id`.<br>- Tỷ lệ tương phản chữ/nền tối thiểu $4.5:1$ (WCAG 2.1 AA). | **MUST HAVE** | `UI_UX_REVIEW.md` (Mục 2.6) |
| **FR-011** | **Khối giới thiệu quy trình làm việc (Process)** | Bổ sung phần trình bày quy trình hợp tác 4 bước đơn giản (Tiếp nhận -> Đánh giá -> Triển khai -> Hỗ trợ 24/7) trên trang Services/Home. | **SHOULD HAVE** | `UI_UX_REVIEW.md` (Mục 2.1) |
| **FR-012** | **Khối giải đáp thắc mắc thường gặp (FAQ)** | Bổ sung khu vực accordion FAQ giải đáp các câu hỏi phổ biến về chi phí thuê ngoài IT, thời gian phản hồi SLA trên trang Services. | **SHOULD HAVE** | `UI_UX_REVIEW.md` (Mục 2.1) |
| **FR-013** | **Hiệu ứng chuyển đổi Dark/Light Mode** | Khả năng chuyển đổi giao diện sáng/tối tự động hoặc nút bấm. | **NICE TO HAVE** | Đề xuất nâng cao |

---

## 3. YÊU CẦU GIAO DIỆN VÀ TRẢI NGHIỆM NGƯỜI DÙNG (UI/UX REQUIREMENTS)

| Mã ID | Hạng mục | Quy chuẩn và Đặc tả yêu cầu | Mức ưu tiên |
| :--- | :--- | :--- | :---: |
| **UI-001** | **Phong cách chủ đạo** | **Modern Tech Enterprise** — Tối giản, hiện đại, mang nét đặc trưng của ngành dịch vụ công nghệ hạ tầng / cloud, dứt khoát, đáng tin cậy. Loại bỏ hoàn toàn nét cổ điển lạc hậu của web cũ. | **MUST HAVE** |
| **UI-002** | **Hệ thống màu sắc (Color Tokens)** | Xây dựng bảng màu công nghệ có chiều sâu:<br>- *Primary Brand:* Royal / Electric Blue (`#2563EB` hoặc `#1D4ED8`) tạo cảm giác chuyên môn, an tâm và vững chắc.<br>- *Secondary Accent:* Cyan / Sky Blue (`#0EA5E9`) tạo điểm nhấn công nghệ sáng tạo.<br>- *Neutral Dark:* Slate `#0F172A`, `#1E293B` làm nền cho Header, Footer hoặc card công nghệ.<br>- *Neutral Light:* `#FFFFFF`, `#F8FAFC`, `#F1F5F9` cho nền trang sáng sủa, sạch sẽ.<br>- *Status Colors:* Xanh lục (Success), Đỏ (Error/Validation), Vàng hổ phách (Warning).<br>- *Tương phản:* Đảm bảo độ tương phản chữ và nền $\ge 4.5:1$. | **MUST HAVE** |
| **UI-003** | **Hệ thống Typography** | - Font chữ chủ đạo: Sans-serif hiện đại từ Google Fonts (khuyến nghị **Inter** hoặc **Plus Jakarta Sans**).<br>- Cấp bậc tiêu đề: H1 ($36 - 48$px, Bold 700), H2 ($28 - 36$px, Bold 700), H3 ($20 - 24$px, Semi-bold 600), Body ($15 - 16$px, line-height $1.6 - 1.7$).<br>- Đảm bảo hiển thị trọn vẹn, không lỗi dấu font Tiếng Việt. | **MUST HAVE** |
| **UI-004** | **Khoảng cách & Căn chỉnh (Spacing & Layout)** | - Áp dụng hệ thống lưới chuẩn (Standard Grid) với container căn giữa max-width $1280$px.<br>- Hệ thống khoảng cách chuẩn hóa theo bội số 4px / 8px (padding/margin: 8, 16, 24, 32, 48, 64, 96px) tạo độ thoáng đãng cho giao diện. | **MUST HAVE** |
| **UI-005** | **Chuẩn hóa Media & Hình ảnh** | - Thay thế toàn bộ 4 ảnh stock cũ của GoDaddy bằng hình ảnh chất lượng cao có bản quyền thương mại mở (Unsplash/Pexels) hoặc đồ họa minh họa vector phẳng.<br>- Hình ảnh hiển thị sắc nét, tỉ lệ đồng nhất trên các thẻ card ($16:9$ hoặc $2:1$). | **MUST HAVE** |
| **UI-006** | **Vi tương tác (Micro-interactions)** | - Hiệu ứng hover mượt mà cho nút bấm (transition $200$ms, độ bóng nâng nhẹ).<br>- Hiệu ứng viền phát sáng nhẹ (subtle border glow) cho các thẻ dịch vụ khi rê chuột.<br>- Transition mượt mà khi đóng mở menu mobile và accordion. | **SHOULD HAVE** |

---

## 4. YÊU CẦU KỸ THUẬT VÀ NỀN TẢNG (TECHNICAL REQUIREMENTS - TR)

| Mã ID | Tiêu chuẩn kỹ thuật | Đặc tả chi tiết | Mức ưu tiên |
| :--- | :--- | :--- | :---: |
| **TR-001** | **Framework & Kiến trúc** | **Next.js (App Router)** phiên bản ổn định. Tận dụng Server Components để tối ưu SEO và Client Components cho các tương tác form, menu, đa ngôn ngữ. | **MUST HAVE** |
| **TR-002** | **Ngôn ngữ phát triển** | **TypeScript** ở chế độ Strict Mode (`"strict": true`). Khai báo kiểu dữ liệu rõ ràng cho tất cả props, từ điển đa ngôn ngữ (dictionary types), metadata. | **MUST HAVE** |
| **TR-003** | **Thư viện CSS** | **Tailwind CSS** (phiên bản ổn định). Cấu hình mở rộng trong `tailwind.config` cho toàn bộ design tokens (màu sắc, phông chữ, breakpoints). | **MUST HAVE** |
| **TR-004** | **Kiến trúc thành phần (Component-driven)** | Cấu trúc thư mục module hóa, tách biệt rõ ràng:<br>- `components/common/`: Header, Footer, Container, Button, Card.<br>- `components/forms/`: ContactForm, Input, Textarea.<br>- `components/sections/`: HeroSection, ServicesGrid, AboutOverview.<br>- `lib/` hoặc `locales/`: Quản lý từ điển đa ngôn ngữ EN / VI. | **MUST HAVE** |
| **TR-005** | **Tối ưu hóa hiệu năng & Tài nguyên** | Sử dụng component `next/image` để nén ảnh tự động dạng WebP/AVIF và tránh Cumulative Layout Shift (CLS). Sử dụng `next/font` để tối ưu tải font Google Fonts cục bộ. | **MUST HAVE** |
| **TR-006** | **Khả năng chạy Local & Build sạch** | Mã nguồn có thể cài đặt và khởi chạy độc lập bằng `npm run dev`. Lệnh `npm run build` hoàn thành với mã thoát 0, không có lỗi TypeScript hoặc lint. | **MUST HAVE** |
| **TR-007** | **Môi trường Preview độc lập** | Dự án có thể triển khai preview độc lập trên Vercel Preview mà không tác động tới domain chính [https://bizwork-it.com/](https://bizwork-it.com/). | **MUST HAVE** |

---

## 5. PHẠM VI DỰ ÁN VÀ RANH GIỚI (SCOPE & BOUNDARIES)

```
┌────────────────────────────────────────────────────────────────────────┐
│ TRONG PHẠM VI DỰ ÁN (IN-SCOPE)                                         │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Redesign toàn diện giao diện Frontend website giới thiệu công ty.    │
│ 2. Phát triển 4 trang tĩnh chính: Home, About, Services, Contact.      │
│ 3. Triển khai Sticky Header, Footer, Menu mobile responsive.           │
│ 4. Triển khai tính năng chuyển đổi ngôn ngữ song ngữ Tiếng Anh / Việt. │
│ 5. Xây dựng Contact Form với giao diện hoàn chỉnh và client validation.│
│ 6. Thiết kế Design System (Tokens, Typography, Bảng màu, Components).  │
│ 7. Tối ưu SEO metadata cơ bản, Accessibility WCAG 2.1 AA cơ bản.       │
│ 8. Kiểm thử giao diện, chức năng trên môi trường Local & Preview.       │
│ 9. Lập tài liệu bàn giao, hướng dẫn chạy và hướng dẫn triển khai.      │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ NGOÀI PHẠM VI DỰ ÁN (OUT-OF-SCOPE) — TUYỆT ĐỐI KHÔNG TỰ Ý TRIỂN KHAI    │
├────────────────────────────────────────────────────────────────────────┤
│ 1. KHÔNG xây dựng hệ thống Đăng nhập / Đăng ký / Phân quyền người dùng.│
│ 2. KHÔNG xây dựng Dashboard quản trị (Admin CMS, Quản trị nội dung).   │
│ 3. KHÔNG xây dựng Cơ sở dữ liệu (Database) mới (MongoDB, MySQL, v.v.). │
│ 4. KHÔNG xây dựng Backend API server nghiệp vụ riêng biệt.             │
│ 5. KHÔNG tích hợp Cổng thanh toán, Giỏ hàng, Thương mại điện tử.       │
│ 6. KHÔNG tích hợp Chatbot AI hoặc các mô hình ngôn ngữ lớn (LLM).      │
│ 7. KHÔNG can thiệp DNS, hosting GoDaddy, không trỏ domain production.  │
│ 8. KHÔNG tự sáng tác dịch vụ kinh doanh mới hoặc số liệu doanh nghiệp. │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 6. DANH SÁCH MỤC CHỜ XÁC NHẬN (`PENDING_CONFIRMATION`) VÀ PHƯƠNG ÁN TẠM THỜI

| Mã | Hạng mục cần xác nhận | Vấn đề hiện tại | Phương án xử lý tạm thời (Fallback) để không nghẽn tiến độ |
| :---: | :--- | :--- | :--- |
| **PC-01** | **Địa chỉ văn phòng cụ thể** | Website cũ chỉ ghi chữ `"Singapore"`. | Hiển thị: `"Singapore"` kết hợp placeholder cấu trúc `"Singapore (Detailed address to be updated)"` có thể cấu hình linh hoạt qua file config. |
| **PC-02** | **Hotline & Email hỗ trợ trực tiếp** | Website cũ không hiển thị số điện thoại hoặc email trực tiếp. | Đặt placeholder cấu hình: `contact@bizwork-it.com` và hotline cấu hình tập trung trong file constants để dễ dàng cập nhật khi có thông tin chính thức. |
| **PC-03** | **File Logo Vector chính thức** | Website cũ dùng text thuần `BIZWORK-IT`, PWA icon là icon mẫu GoDaddy. | Triển khai phương án **Typographic Brand Logo** hiện đại (chữ `BIZWORK-IT` cách điệu sắc nét bằng CSS/SVG) kèm icon nhận diện công nghệ tối giản. |
| **PC-04** | **Bản quyền & Thay thế hình ảnh GoDaddy** | 4 ảnh thuộc kho GoDaddy Stock (`3253`, `gAqG9d3`, `8766`, `DxRYKJo`). | Tuyển chọn bộ ảnh thay thế từ Unsplash/Pexels có giấy phép thương mại miễn phí (Free Commercial License) về chủ đề Server, Cloud Infrastructure, IT Engineers. |
| **PC-05** | **Giải pháp gửi Form Backend** | Phụ thuộc dịch vụ ngầm của GoDaddy cũ. | Ở Giai đoạn 6, tích hợp giải pháp form email độc lập (Resend API hoặc Web3Forms) kèm chế độ demo thông báo mô phỏng thành công an toàn. |

---

## 7. TIÊU CHÍ NGHIỆM THU DỰ ÁN (ACCEPTANCE CRITERIA)

Dự án được đánh giá hoàn thành khi thỏa mãn đầy đủ các tiêu chí nghiệm thu phân theo 3 mức độ:

### 7.1. Nhóm Tiêu chí Bắt buộc (MUST HAVE — Trọng yếu)
- [ ] **AC-01:** Đầy đủ 4 trang độc lập: Home (`/`), About (`/about`), Services (`/services`), Contact (`/contact`).
- [ ] **AC-02:** Thanh Header cố định (Sticky) và Footer hoạt động ổn định trên tất cả các trang, không có liên kết nội bộ hỏng (no 404 internal links).
- [ ] **AC-03:** Nút chuyển đổi ngôn ngữ EN / VI hoạt động chính xác, dịch đúng 100% các chuỗi văn bản đã định nghĩa.
- [ ] **AC-04:** Layout co giãn Responsive mượt mà trên Desktop (1280px), Tablet (768px), Mobile (375px), không có hiện tượng tràn màn hình ngang (zero horizontal scroll).
- [ ] **AC-05:** Contact Form có client-side validation: Bắt buộc nhập Tên, Email, Nội dung; kiểm tra đúng định dạng email; hiển thị thông báo lỗi trực quan.
- [ ] **AC-06:** Khai báo đầy đủ thẻ SEO Metadata (`<title>`, `<meta description>`, OpenGraph) riêng biệt cho từng trang.
- [ ] **AC-07:** Dự án khởi chạy được ở môi trường local (`npm run dev`) và build thành công (`npm run build`) với mã thoát 0, không có lỗi TypeScript hay ESLint.
- [ ] **AC-08:** Toàn bộ quá trình phát triển tuyệt đối không can thiệp, không làm gián đoạn website production trên GoDaddy.

### 7.2. Nhóm Tiêu chí Khuyến nghị (SHOULD HAVE — Trải nghiệm cao)
- [ ] **AC-09:** Có hiệu ứng vi tương tác mượt mà (hover states, button active, smooth transitions).
- [ ] **AC-10:** Toàn bộ hình ảnh có thẻ `alt` mô tả chuẩn accessibility; hỗ trợ điều hướng bằng phím Tab có focus outline rõ nét.
- [ ] **AC-11:** Tối ưu kích thước tệp ảnh thông qua định dạng hiện đại (WebP/AVIF), điểm hiệu năng Lighthouse $\ge 85$.

### 7.3. Nhóm Tiêu chí Tùy chọn (NICE TO HAVE — Mở rộng)
- [ ] **AC-12:** Khối Accordion FAQ giải đáp thắc mắc dịch vụ trên trang Services.
- [ ] **AC-13:** Chế độ hiển thị Dark/Light theme toggle.

---

## 8. MA TRẬN TRUY XUẤT YÊU CẦU (REQUIREMENTS TRACEABILITY MATRIX - RTM)

| Mã yêu cầu | Phân loại | Tóm tắt mô tả | Mức ưu tiên | Nguồn kiểm chứng / Audit | Tiêu chí nghiệm thu liên kết | Trạng thái xác nhận |
| :--- | :---: | :--- | :---: | :--- | :---: | :---: |
| **FR-001** | Chức năng | Cấu trúc 4 trang: Home, About, Services, Contact | MUST HAVE | `AUDIT_REPORT.md` (Mục 8.2) | AC-01 | **APPROVED** |
| **FR-002** | Chức năng | Sticky Header & Menu điều hướng responsive | MUST HAVE | `UI_UX_REVIEW.md` (Mục 2.1) | AC-02 | **APPROVED** |
| **FR-003** | Chức năng | Footer dùng chung & bản quyền BIZWORK-IT | MUST HAVE | `CONTENT_INVENTORY.md` (TXT-023, 025)| AC-02 | **APPROVED** |
| **FR-004** | Chức năng | Chuyển đổi ngôn ngữ song ngữ EN / VI | MUST HAVE | `CONTENT_INVENTORY.md` (Mục 8) | AC-03 | **APPROVED** |
| **FR-005** | Chức năng | Hệ thống CTA liên kết chuyển đổi | MUST HAVE | `FUNCTIONALITY_CHECKLIST.md` (FNC-02) | AC-01, AC-02 | **APPROVED** |
| **FR-006** | Chức năng | Contact Form đầy đủ trường & tệp đính kèm | MUST HAVE | `CONTENT_INVENTORY.md` (TXT-014..020)| AC-05 | **APPROVED** |
| **FR-007** | Chức năng | Xử lý 4 trạng thái tương tác của form | MUST HAVE | `FUNCTIONALITY_CHECKLIST.md` (FNC-05,06)| AC-05 | **APPROVED** |
| **FR-008** | Chức năng | Responsive Desktop, Tablet, Mobile | MUST HAVE | `FUNCTIONALITY_CHECKLIST.md` (Mục 4) | AC-04 | **APPROVED** |
| **FR-009** | Chức năng | Khai báo SEO Metadata độc lập từng trang | MUST HAVE | `AUDIT_REPORT.md` (Mục 2.2) | AC-06 | **APPROVED** |
| **FR-010** | Chức năng | Tiếp cận người dùng (Accessibility a11y) | MUST HAVE | `UI_UX_REVIEW.md` (Mục 2.6) | AC-10 | **APPROVED** |
| **FR-011** | Chức năng | Khối quy trình làm việc 4 bước (Process) | SHOULD HAVE | `UI_UX_REVIEW.md` (Mục 2.1) | AC-09 | **APPROVED** |
| **FR-012** | Chức năng | Khối giải đáp thắc mắc FAQ | SHOULD HAVE | `UI_UX_REVIEW.md` (Mục 2.1) | AC-12 | **APPROVED** |
| **FR-013** | Chức năng | Chế độ Dark/Light mode toggle | NICE TO HAVE | Đề xuất kỹ thuật | AC-13 | **PENDING** |
| **UI-001** | Giao diện | Phong cách Modern Tech Enterprise | MUST HAVE | Master Prompt & `UI_UX_REVIEW.md` | AC-01 | **APPROVED** |
| **UI-002** | Giao diện | Bảng màu Royal/Electric Blue + Slate | MUST HAVE | `AUDIT_REPORT.md` (Mục 8.1) | AC-01 | **APPROVED** |
| **UI-003** | Giao diện | Typography Sans-serif (Inter / Plus Jakarta)| MUST HAVE | `UI_UX_REVIEW.md` (Mục 2.2) | AC-01 | **APPROVED** |
| **UI-004** | Giao diện | Lưới căn chỉnh 12 cột & Spacing bội số 8px | MUST HAVE | `UI_UX_REVIEW.md` (Mục 2.4) | AC-04 | **APPROVED** |
| **UI-005** | Giao diện | Thay thế hình ảnh bản quyền thương mại mở | MUST HAVE | `CONTENT_INVENTORY.md` (NC-03) | AC-01 | **APPROVED** |
| **UI-006** | Giao diện | Vi tương tác (Micro-interactions, hover) | SHOULD HAVE | `UI_UX_REVIEW.md` (Mục 2.5) | AC-09 | **APPROVED** |
| **TR-001** | Kỹ thuật | Next.js App Router | MUST HAVE | Master Prompt | AC-07 | **APPROVED** |
| **TR-002** | Kỹ thuật | TypeScript Strict Mode | MUST HAVE | Master Prompt | AC-07 | **APPROVED** |
| **TR-003** | Kỹ thuật | Tailwind CSS cấu hình Design Tokens | MUST HAVE | Master Prompt | AC-04, AC-07 | **APPROVED** |
| **TR-004** | Kỹ thuật | Cấu trúc Component-driven dễ bảo trì | MUST HAVE | Master Prompt | AC-07 | **APPROVED** |
| **TR-005** | Kỹ thuật | Tối ưu tài nguyên `next/image`, `next/font` | MUST HAVE | Master Prompt | AC-11 | **APPROVED** |
| **TR-006** | Kỹ thuật | Chạy local & build sạch không lỗi | MUST HAVE | Master Prompt | AC-07 | **APPROVED** |
| **TR-007** | Kỹ thuật | Triển khai Preview độc lập (Vercel Preview) | MUST HAVE | Master Prompt | AC-07, AC-08 | **APPROVED** |
