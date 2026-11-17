# ĐỊNH HƯỚNG THIẾT KẾ VÀ KẾ HOẠCH BỐ CỤC GIAO DIỆN (DESIGN DIRECTION & UI LAYOUT PLAN)
**Dự án:** BIZWORK-IT Website Redesign  
**Mã tài liệu:** `DESIGN_DIRECTION.md`  
**Giai đoạn:** Giai đoạn 2 — Đặc tả và lập kế hoạch thiết kế  
**Task liên quan:** Task 07 — Chốt định hướng thiết kế và bố cục giao diện  
**Nguồn tham chiếu đã duyệt:** `REQUIREMENTS.md`, `INFORMATION_ARCHITECTURE.md`, `UI_UX_REVIEW.md`, `CONTENT_INVENTORY.md`  
**Trạng thái:** Nguồn sự thật chính thức cho các thông số thiết kế trước khi bắt đầu khởi tạo dự án và lập trình

---

## 1. NGUYÊN TẮC THIẾT KẾ CỐT LÕI (DESIGN PRINCIPLES)

1. **Modern Tech Enterprise (Hiện đại & Chuyên nghiệp B2B):**
   - Định vị BIZWORK-IT là đối tác công nghệ đáng tin cậy cho doanh nghiệp tại Singapore và khu vực.
   - Ngôn ngữ thị giác dứt khoát, cấu trúc mạch lạc, loại bỏ hoàn toàn các chi tiết rườm rà hoặc phong cách cổ điển lỗi thời của website GoDaddy cũ.
2. **Clarity Over Decoration (Rõ ràng trên hết):**
   - Khoảng trắng (White-space) được sử dụng có chủ đích nhằm làm nổi bật thông điệp giá trị và các gói giải pháp dịch vụ.
   - Nội dung dễ quét (scannable), bố cục dạng khối thẻ (cards) gọn gàng giúp người ra quyết định (CEOs, IT Managers) tiếp nhận thông tin chỉ trong vài giây.
3. **Purposeful Contrast & Accessibility (Tương phản có mục đích & Dễ tiếp cận):**
   - Bảng màu được kiểm soát chặt chẽ với tỷ lệ tương phản chữ và nền đạt tối thiểu $4.5:1$ theo tiêu chuẩn **WCAG 2.1 AA**.
   - Mọi phần tử tương tác (buttons, links, inputs) đều có trạng thái hover, focus ring rõ nét và diện tích chạm cảm ứng chuẩn di động ($\ge 44 \times 44$px).
4. **Consistency & Predictability (Nhất quán & Dự đoán được):**
   - Toàn bộ giao diện 4 trang tuân thủ tuyệt đối hệ thống Design Tokens duy nhất (màu sắc, typography, khoảng cách, bo góc, bóng đổ).

---

## 2. HỆ THỐNG THÔNG SỐ THIẾT KẾ (DESIGN TOKENS)

### 2.1. Bảng màu thương hiệu (Color Palette)

| Vai trò | Tên Token | Mã Hex / HSL | Ứng dụng cụ thể trong giao diện | Lý do lựa chọn |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Brand** | `brand-blue` | `#2563EB` (Tailwind `blue-600`) | Nút CTA chính, viền active, icon thương hiệu, link highlight | Màu xanh hoàng gia (Royal/Electric Blue) biểu trưng cho sự an tâm, tin cậy và chuyên môn IT cao cấp. |
| **Primary Hover** | `brand-blue-hover`| `#1D4ED8` (Tailwind `blue-700`) | Trạng thái hover / active của Primary CTA | Tăng độ tương phản thị giác khi tương tác chuột. |
| **Secondary Accent**| `brand-sky` | `#0EA5E9` (Tailwind `sky-500`) | Điểm nhấn viền card, badge trạng thái, icon phụ | Tạo sắc thái công nghệ hiện đại, điện toán đám mây. |
| **Dark Neutral 1** | `slate-dark-900` | `#0F172A` (Tailwind `slate-900`) | Nền Footer, Hero card công nghệ, tiêu đề chính H1/H2 | Nền tối sâu thẳm, tạo chiều sâu và cảm giác vững chãi. |
| **Dark Neutral 2** | `slate-dark-800` | `#1E293B` (Tailwind `slate-800`) | Nền Sticky Header, thẻ card nổi bật trên nền tối | Tạo phân lớp thị giác (elevation) trên nền tối. |
| **Light Surface 1**| `surface-light` | `#F8FAFC` (Tailwind `slate-50`) | Nền tổng thể trang web (Page Background) | Tránh màu trắng chói mắt, tạo cảm giác dịu nhẹ, cao cấp. |
| **Light Surface 2**| `surface-card` | `#FFFFFF` (Pure White) | Nền các thẻ Card nội dung, hộp form liên hệ | Làm nổi bật khối nội dung trên nền xám nhạt `slate-50`. |
| **Border Light** | `border-light` | `#E2E8F0` (Tailwind `slate-200`) | Đường viền thẻ card, đường phân cách section | Viền mỏng $1$px tinh tế, phân định rõ ràng các khối. |
| **Border Dark** | `border-dark` | `#334155` (Tailwind `slate-700`) | Đường viền các thành phần trên Header / Footer tối | Tách bạch các cụm điều hướng trên nền tối. |
| **Text Primary** | `text-primary` | `#0F172A` trên nền sáng / `#F8FAFC` trên nền tối | Toàn bộ tiêu đề chính và văn bản quan trọng | Đạt tỷ lệ tương phản tối đa $\ge 12:1$, cực kỳ sắc nét. |
| **Text Secondary**| `text-secondary`| `#475569` trên nền sáng / `#94A3B8` trên nền tối | Đoạn văn mô tả, nhãn phụ, placeholder | Mềm mại, phân cấp rõ rệt so với tiêu đề. |
| **Status Success** | `status-success` | `#16A34A` (Tailwind `green-600`) | Thông báo gửi form thành công, badge cam kết | Trực quan, chuẩn nhận thức người dùng. |
| **Status Error** | `status-error` | `#DC2626` (Tailwind `red-600`) | Thông báo lỗi validation, viền cảnh báo ô nhập liệu | Cảnh báo rõ ràng, thu hút sự chú ý để sửa lỗi. |

### 2.2. Hệ thống Typography (Kiểu chữ & Cấp bậc)

- **Lựa chọn phông chữ chính thức:** **`Plus Jakarta Sans`** (Google Fonts).
  - *Lý do chốt phương án:* `Plus Jakarta Sans` là bộ font Sans-serif hình học đương đại hàng đầu cho các doanh nghiệp B2B Tech & SaaS. Phông chữ có tỷ lệ x-height thoáng, nét chữ khỏe khoắn, hiện đại, hỗ trợ hoàn hảo bộ ký tự Tiếng Việt có dấu mà không bị méo chữ hay lỗi khoảng cách như các font cũ.
  - *Phông chữ dự phòng (Fallback):* `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.

- **Thang kích thước và cấp bậc tiêu đề (Type Scale):**

| Cấp bậc | Cỡ chữ Desktop | Cỡ chữ Mobile | Độ đậm (Weight) | Chiều cao dòng (Line-height) | Ứng dụng thực tế |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Display / H1** | $48$px (`3rem`) | $32$px (`2rem`) | Bold 700 / 800 | $1.15$ | Tiêu đề chính Hero Banner trang chủ |
| **Page H1** | $36$px (`2.25rem`)| $28$px (`1.75rem`)| Bold 700 | $1.2$ | Tiêu đề trang About, Services, Contact |
| **Section H2** | $30$px (`1.875rem`)| $24$px (`1.5rem`) | Bold 700 | $1.25$ | Tiêu đề các khối section trên trang |
| **Card H3** | $20$px (`1.25rem`)| $18$px (`1.125rem`)| Semi-bold 600 | $1.35$ | Tiêu đề các thẻ giá trị, thẻ giải pháp |
| **Lead / Subtitle**| $18$px (`1.125rem`)| $16$px (`1rem`) | Regular 400 / 500| $1.6$ | Đoạn giới thiệu đầu trang, tóm tắt Hero |
| **Body Text** | $15$px - $16$px | $15$px | Regular 400 | $1.65$ | Toàn bộ văn bản nội dung, mô tả dịch vụ |
| **Small / Caption**| $13$px - $14$px | $13$px | Medium 500 | $1.5$ | Nhãn nhãn thẻ, ghi chú bản quyền, FAQ |

### 2.3. Khoảng cách, Bo góc & Bóng đổ (Spacing, Radius & Elevation)
- **Hệ thống khoảng cách (Base Spacing Unit = 4px / 8px):**
  - Section Padding dọc: `py-16` ($64$px) trên mobile, `py-24` ($96$px) trên desktop.
  - Card Internal Padding: `p-6` ($24$px) đến `p-8` ($32$px).
  - Khoảng cách giữa các phần tử liên kề: `gap-4` ($16$px), `gap-6` ($24$px), `gap-8` ($32$px).
- **Hệ thống bo góc (Border Radius):**
  - Nút bấm (Buttons) & Nhãn (Badges): `rounded-lg` ($8$px).
  - Thẻ nội dung (Cards) & Ô nhập liệu (Inputs): `rounded-xl` ($12$px).
  - Khối chứa lớn (Containers / Modals): `rounded-2xl` ($16$px).
- **Hệ thống bóng đổ & Độ nổi (Elevation):**
  - Flat Card: `border border-slate-200/80` trên nền trắng `#FFFFFF` (không đổ bóng nặng để giữ chất tối giản).
  - Hover Card: `shadow-lg shadow-blue-500/5` kết hợp `border-blue-500/30` và dịch chuyển nhẹ `translate-y-[-2px]`.
  - Dropdown / Drawer Mobile: `shadow-2xl shadow-slate-900/20`.

### 2.4. Khung chứa & Điểm ngắt màn hình (Container & Breakpoints)
- **Container chuẩn:** `max-w-7xl` ($1280$px) căn giữa màn hình (`mx-auto`), khoảng đệm biên ngang `px-4 sm:px-6 lg:px-8`.
- **Breakpoints chuẩn Tailwind CSS:**
  - `sm`: $640$px (Điện thoại lớn / Phablet).
  - `md`: $768$px (Máy tính bảng Tablet — bắt đầu hiển thị 2 cột).
  - `lg`: $1024$px (Desktop tiêu chuẩn — chuyển từ Hamburger Menu sang Thanh Menu ngang).
  - `xl`: $1280px$ (Desktop màn hình rộng — tối đa kích thước container).

---

## 3. ĐẶC TẢ THÀNH PHẦN DÙNG CHUNG (GLOBAL SHARED COMPONENTS)

### 3.1. Thanh điều hướng đầu trang (Sticky Header)
- **Chiều cao cố định:** $72$px (`h-18`), cố định ở đỉnh màn hình (`sticky top-0 z-50`).
- **Hiệu ứng nền (Glassmorphism):** Nền bán trong suốt `bg-white/85` (hoặc `bg-slate-900/90` trên dark) kết hợp hiệu ứng làm mờ nền `backdrop-blur-md` và đường viền đáy mỏng `border-b border-slate-200/80`.
- **Thành phần trên Header:**
  1. *Logo thương hiệu:* Logo dạng chữ (Typographic Logo) đặt bên trái.
  2. *Menu điều hướng chính (Desktop):* Cụm 4 liên kết (`Home`, `About`, `Services`, `Contact`) canh giữa/phải, font-medium $15$px. Trạng thái Active có thanh gạch dưới tinh tế màu Primary Blue.
  3. *Bộ chuyển đổi ngôn ngữ:* Cụm nút bấm viên thuốc (Pill Toggle) `EN | VI`, nút đang chọn có nền `bg-slate-100` font-bold.
  4. *Nút CTA nhanh:* Nút Primary CTA `"Get in Touch"` nhỏ gọn, góc bo `rounded-lg`.
  5. *Mobile Navigation Button:* Biểu tượng Hamburger Menu ($24 \times 24$px) xuất hiện khi màn hình $< 1024$px.

### 3.2. Phương án Logo dạng chữ (Typographic Logo BIZWORK-IT)
- Do website cũ chưa có file logo vector chính thức (sử dụng text thô của GoDaddy), phiên bản redesign chốt phương án thiết kế **Typographic Brand Logo** sắc nét:
  - Chữ **`BIZWORK`**: Font `Plus Jakarta Sans`, độ đậm Extra-bold (800), màu `slate-900` (hoặc trắng trên nền tối).
  - Ký tự gạch nối và chữ **`-IT`**: Độ đậm Extra-bold (800), màu Primary Blue `#2563EB`.
  - Biểu tượng phụ trợ: Một dấu chấm tròn nhỏ công nghệ màu Cyan (`#0EA5E9`) đặt ngay sau chữ IT biểu trưng cho kết nối mạng và tính sẵn sàng 24/7.
  - Chiều cao hiển thị: $24$px - $28$px, liên kết trực tiếp về trang chủ `/`.

### 3.3. Chân trang (Global Footer)
- **Màu nền:** `slate-900` (`#0F172A`) với văn bản sáng màu tạo điểm tựa thị giác vững chắc cho toàn bộ website.
- **Bố cục:** 4 cột trên Desktop, 2 cột trên Tablet, 1 cột xếp chồng trên Mobile.
  - *Cột 1:* Logo `BIZWORK-IT` màu sáng, tagline *"We make technology accessible!"* và tóm tắt dịch vụ.
  - *Cột 2 (Quick Links):* Liên kết tới 4 trang `Home`, `About`, `Services`, `Contact`.
  - *Cột 3 (Pháp nhân):* `BIZWORKIT (S) PTE LTD`, trụ sở Singapore, khung giờ làm việc Thứ 2 - Thứ 6.
  - *Cột 4 (Kết nối):* Hotline và Email hỗ trợ (dưới dạng link `mailto:` và `tel:` tiện lợi).
- **Thanh bản quyền dưới cùng (Bottom Bar):**
  - Ngăn cách bằng đường kẻ mỏng `border-t border-slate-800`.
  - Dòng bản quyền: `Copyright © 2025 BIZWORK-IT - All Rights Reserved.` (loại bỏ hoàn toàn GoDaddy attribution).

### 3.4. Hệ thống Nút bấm & Kêu gọi hành động (CTA Buttons)
- **Primary CTA (`ButtonPrimary`):**
  - Nền màu `bg-blue-600`, chữ trắng `text-white`, font-semibold $15$px, padding `px-6 py-3`, bo góc `rounded-lg`.
  - Hover: `bg-blue-700`, đổ bóng nhẹ `shadow-md shadow-blue-500/20`, chuyển động êm `transition-all duration-200`.
  - Focus: `ring-2 ring-blue-500 ring-offset-2`.
- **Secondary CTA (`ButtonSecondary`):**
  - Nền trắng `bg-white`, viền mảnh `border border-slate-300`, chữ `text-slate-700`.
  - Hover: `bg-slate-50 border-slate-400 text-slate-900`.
- **Link CTA (`ButtonLink`):**
  - Chữ màu xanh `text-blue-600 font-semibold`, kèm icon mũi tên `→` có hiệu ứng trượt nhẹ sang phải khi hover (`group-hover:translate-x-1`).

---

## 4. KẾ HOẠCH BỐ CỤC 4 TRANG CHI TIẾT (UI LAYOUT PLAN)

### 4.1. Trang chủ (Home — `/`)

```
+-------------------------------------------------------------------------+
| [STICKY HEADER]: Logo BIZWORK-IT | Nav Links | EN/VI | CTA: Get in Touch|
+-------------------------------------------------------------------------+
| SECTION 1: HERO BANNER (Layout 2 cột: 60% Văn bản - 40% Đồ họa Tech)    |
| - H1: Professional Technology Assistance                                |
| - Sub-tagline: We make technology accessible!                           |
| - Paragraph: Giải pháp IT thuê ngoài tối ưu cho doanh nghiệp SMBs       |
| - Cụm nút CTA: [Get in Touch (Primary)] [Explore Services (Secondary)]   |
| - Right: Minh họa Vector/Graphic kiến trúc mạng/Cloud hiện đại          |
+-------------------------------------------------------------------------+
| SECTION 2: CORE VALUE PILLARS (Grid 3 cột cân đối trên desktop)          |
| [Card 1: Tech Experience]  [Card 2: High ROI]   [Card 3: Satisfaction]  |
| - Icon vector hệ điều hành  - Icon biểu đồ ngân  - Icon cam kết chất     |
| - H3 + Mô tả OS/Network    - H3 + Mô tả Out-     lượng dịch vụ           |
| - Nền card trắng nổi bật   sourcing tiết kiệm   - Nền card trắng nổi bật|
+-------------------------------------------------------------------------+
| SECTION 3: SERVICES OVERVIEW (Layout 2 cột tóm tắt giải pháp)           |
| - Left: 2 Card lớn tóm lược Dịch vụ Kỹ thuật & Quản trị Thuê ngoài      |
| - Right: Danh mục tính năng nổi bật + CTA Link: View All Services →    |
+-------------------------------------------------------------------------+
| SECTION 4: WORKING METHODOLOGY (Quy trình 4 bước nằm ngang)             |
| [1. Tiếp nhận] --> [2. Đánh giá] --> [3. Triển khai] --> [4. Hỗ trợ]    |
| - Số thứ tự cách điệu lớn, đường nối ngang giữa các bước                |
+-------------------------------------------------------------------------+
| SECTION 5: CONVERSION BANNER (Khối card nền tối Slate-900 bo tròn)       |
| - Sẵn sàng nâng cấp hạ tầng IT? | CTA: Contact Our Engineers           |
+-------------------------------------------------------------------------+
| [GLOBAL FOOTER]: 4 cột thông tin pháp nhân, bản quyền, liên kết        |
+-------------------------------------------------------------------------+
```

- **Quy tắc chuyển sang Mobile:**
  - Hero chuyển thành 1 cột (Văn bản lên trên, đồ họa xuống dưới, căn giữa).
  - Cụm nút CTA xếp dọc chiếm $100\%$ chiều rộng.
  - Section 2 chuyển thành 1 cột xếp chồng (stacking 3 cards).
  - Quy trình 4 bước chuyển từ thanh ngang sang đường dọc (vertical timeline).

---

### 4.2. Trang Giới thiệu (About — `/about`)

```
+-------------------------------------------------------------------------+
| SECTION 1: PAGE HEADER (Nền xám nhạt Slate-50, căn giữa)                |
| - Breadcrumb: Home > About                                              |
| - H1: About Us / Về chúng tôi                                           |
| - Subtitle: We make technology accessible!                              |
+-------------------------------------------------------------------------+
| SECTION 2: CORPORATE PROFILE (Layout 2 cột: 50% Văn bản - 50% Card Pháp lý)
| - H2: Đồng hành cùng doanh nghiệp nhỏ và vừa tại Singapore              |
| - Nội dung sứ mệnh và lý tưởng kinh doanh                               |
| - Right Card: Thông tin đăng ký BIZWORKIT (S) PTE LTD, Singapore        |
+-------------------------------------------------------------------------+
| SECTION 3: COMMITMENT & VALUES (Layout 1 cột rộng có điểm nhấn)         |
| - Card lớn viền xanh: "Satisfaction Guaranteed"                         |
| - Lời cam kết may đo theo ngân sách và nhu cầu thực tế                  |
+-------------------------------------------------------------------------+
| SECTION 4: TECHNICAL EXPERTISE (Grid 3 cột năng lực nền tảng)          |
| [Hệ điều hành Windows/Linux] [Mạng & Thiết bị] [Cơ sở dữ liệu & Backup] |
+-------------------------------------------------------------------------+
| SECTION 5: PARTNERSHIP CTA BANNER (Căn giữa, CTA kép)                   |
| - [Explore Our Services] [Get in Touch With Us]                         |
+-------------------------------------------------------------------------+
```

- **Quy tắc chuyển sang Mobile:** Bố cục tự động reflow thành 1 cột duy nhất, thẻ Card pháp lý được đặt ngay dưới đoạn giới thiệu.

---

### 4.3. Trang Dịch vụ (Services — `/services`)

```
+-------------------------------------------------------------------------+
| SECTION 1: PAGE HEADER (Nền xám nhạt Slate-50)                          |
| - Breadcrumb: Home > Services                                           |
| - H1: Our Services / Dịch vụ của chúng tôi                              |
| - Subtitle: Giải pháp hỗ trợ kỹ thuật và quản trị hạ tầng CNTT toàn diện |
+-------------------------------------------------------------------------+
| SECTION 2: SOLUTION 1 - TECHNICAL SUPPORT (Layout so le: Trái văn bản,  |
|                                            Phải danh sách checklist)    |
| - H2: Technical Experience & Assistance                                 |
| - Hỗ trợ hệ điều hành, mạng, cơ sở dữ liệu cho dự án vừa và nhỏ        |
| - Checklist tính năng có dấu tích xanh                                  |
+-------------------------------------------------------------------------+
| SECTION 3: SOLUTION 2 - IT MANAGEMENT OUTSOURCING (Layout đảo ngược)    |
| - H2: High ROI — IT Management Outsourcing                              |
| - Giải quyết bài toán bảo trì hệ thống cũ, giải phóng ngân sách         |
| - Checklist lợi ích kinh tế                                             |
+-------------------------------------------------------------------------+
| SECTION 4: VALUE COMPARISON MATRIX (Bảng so sánh 4 tiêu chí)            |
| [Tiêu chí]  |  [Tự duy trì IT nội bộ]  |  [Thuê ngoài BIZWORK-IT (Ưu việt)]
| - Bảng có viền rõ ràng, cột BIZWORK-IT được highlight nền xanh nhạt     |
+-------------------------------------------------------------------------+
| SECTION 5: FAQ ACCORDION (1 cột căn giữa max-width 800px)               |
| - Câu 1: BIZWORK-IT có hỗ trợ doanh nghiệp quy mô nhỏ không? [+]       |
| - Câu 2: Thời gian phản hồi và quy trình tiếp nhận sự cố? [+]           |
| - Câu 3: Dữ liệu doanh nghiệp được bảo mật ra sao? [+]                  |
| - Câu 4: Chi phí dịch vụ được tính toán thế nào? [+]                    |
+-------------------------------------------------------------------------+
| SECTION 6: CONSULTATION CTA BANNER                                      |
| - Cần tư vấn giải pháp IT phù hợp? | CTA: Request a Free Consultation    |
+-------------------------------------------------------------------------+
```

- **Quy tắc chuyển sang Mobile:**
  - Bảng so sánh (Comparison Matrix) cho phép cuộn ngang có chỉ dẫn hoặc chuyển đổi thành dạng thẻ so sánh trước-sau (Cards view) trên màn hình $< 640$px để tránh vỡ chữ.
  - Accordion FAQ mở rộng 100% bề ngang, icon `+`/`-` kích thước lớn dễ chạm.

---

### 4.4. Trang Liên hệ (Contact — `/contact`)

```
+-------------------------------------------------------------------------+
| SECTION 1: PAGE HEADER                                                  |
| - Breadcrumb: Home > Contact                                            |
| - H1: Contact Us / Liên hệ với chúng tôi                                |
| - Subtitle: Drop us a line! / Better yet, see us in person!             |
+-------------------------------------------------------------------------+
| SECTION 2: CONTACT CONTAINER (Layout 2 cột: 60% Form - 40% Thông tin)   |
|                                                                         |
| [CỘT TRÁI: FORM LIÊN HỆ HIỆN ĐẠI]      [CỘT PHẢI: KẾT NỐI TRỰC TIẾP]     |
| - Ô Name (Họ và tên)                   - BIZWORKIT (S) PTE LTD          |
| - Ô Email* (Email bắt buộc)            - Địa điểm: Singapore (PC-01)    |
| - Dropdown Service Category (Dịch vụ)  - Email: contact@... (PC-02)     |
| - Ô Message (Nội dung tin nhắn)        - Hotline: Call us (PC-02)       |
| - Khung Attach Files (Tối đa 10MB)     - Giờ làm việc: 9:00 - 18:00     |
| - Nút Send (Gửi tin nhắn)              -------------------------------- |
| - Thông báo bảo mật thông tin          - Cam kết bảo mật quyền riêng tư |
+-------------------------------------------------------------------------+
```

- **Quy tắc chuyển sang Mobile:** Cột form hiển thị lên trước; khối thông tin kết nối và giờ làm việc xếp ngay bên dưới với các nút bấm chạm để gọi (`tel:`) và chạm để gửi mail (`mailto:`).

---

## 5. QUY TẮC PHẢN HỒI CO GIÃN (RESPONSIVE RULES)

1. **Không có thanh cuộn ngang (Zero Horizontal Scroll):**
   - Mọi container và hình ảnh đều có thuộc tính `max-w-full overflow-hidden` hoặc `overflow-x-auto` cục bộ có kiểm soát (như bảng số liệu).
2. **Khu vực chạm cảm ứng (Touch Targets):**
   - Mọi phần tử có thể click trên mobile (nút menu, dropdown, CTA, ô input) có chiều cao tối thiểu $44$px (`min-h-[44px]`).
3. **Thanh điều hướng Mobile Drawer:**
   - Khi kích hoạt nút Hamburger, Drawer trượt từ cạnh phải chiếm $85\%$ chiều rộng màn hình (tối đa $360$px).
   - Lớp phủ mờ (Backdrop overlay) làm tối màn hình (`bg-slate-900/60`).
   - Phím `ESC` hoặc chạm ngoài backdrop lập tức đóng Drawer.

---

## 6. DANH SÁCH THÀNH PHẦN UI DÙNG CHUNG (REUSABLE UI COMPONENTS)

Để đảm bảo tính tái sử dụng và chuẩn hóa khi bước vào giai đoạn code, dự án chốt danh mục **10 Thành phần UI cốt lõi**:

1. **`Navbar` / `Header`:** Thanh điều hướng sticky hỗ trợ đa ngôn ngữ và menu mobile.
2. **`Footer`:** Chân trang 4 cột chứa bản quyền và kênh kết nối.
3. **`Button`:** Hỗ trợ 3 biến thể (`primary`, `secondary`, `link`) và trạng thái `loading` (spinner xoay).
4. **`Card`:** Khối thẻ chứa nội dung có viền mỏng, hỗ trợ hiệu ứng hover vi tương tác.
5. **`SectionHeader`:** Khối tiêu đề section chuẩn hóa (Badge danh mục, Tiêu đề H2, Đoạn subtitle).
6. **`Input`:** Ô nhập text có nhãn rõ ràng, hiển thị viền đỏ và text lỗi khi validation thất bại.
7. **`Textarea`:** Ô nhập tin nhắn nhiều dòng, tự co giãn, hiển thị trạng thái focus.
8. **`Select`:** Hộp chọn dropdown danh mục dịch vụ chuẩn accessibility.
9. **`Accordion`:** Khối câu hỏi thường gặp FAQ đóng mở mượt mà bằng CSS transitions.
10. **`LanguageSwitch`:** Nút chuyển đổi song ngữ viên thuốc `EN | VI` gắn tại Header.

---

## 7. CÁC MỤC CHỜ XÁC NHẬN (`PENDING_CONFIRMATION`)

Tuyệt đối tuân thủ nguyên tắc không bịa đặt thông tin doanh nghiệp, các mục sau đây tiếp tục được duy trì trạng thái chờ duyệt và có giải pháp dự phòng:

| Mã | Nội dung chờ xác nhận | Giải pháp thiết kế tạm thời (Fallback) |
| :---: | :--- | :--- |
| **PC-01** | **Địa chỉ văn phòng cụ thể tại Singapore** | Hiển thị chữ `"Singapore"` trên giao diện; cấu trúc dữ liệu địa chỉ chi tiết được đóng gói sẵn trong file constants. |
| **PC-02** | **Hotline & Email hỗ trợ chính thức** | Đặt placeholder cấu hình: `contact@bizwork-it.com` và nút liên hệ dẫn tới Form thay vì hiển thị số điện thoại giả. |
| **PC-03** | **Logo thương hiệu chính thức** | Sử dụng phương án **Typographic Logo BIZWORK-IT** sắc nét (như đặc tả tại Mục 3.2), sẵn sàng thay thế bằng file SVG khi có. |
| **PC-04** | **Nội dung dịch vụ chưa có căn cứ** | Chỉ thiết kế đúng 2 nhóm dịch vụ đã xác minh: *Hỗ trợ kỹ thuật* và *Quản trị IT thuê ngoài*; không tự ý thêm dịch vụ SEO/Marketing. |
| **PC-05** | **Nhà cung cấp gửi email cho Form** | Thiết kế giao diện Form hoàn chỉnh kèm client validation; cơ chế gửi mail sẽ tích hợp ở Giai đoạn 6 (Resend/Web3Forms). |

---

## 8. CHECKLIST SẴN SÀNG CHUYỂN SANG CODE (PHASE 3 READINESS CHECKLIST)

- [x] **PASS:** Nguyên tắc thiết kế (Modern Tech Enterprise) được chốt rõ ràng, nhất quán.
- [x] **PASS:** Toàn bộ Design Tokens (Màu sắc, Typography Plus Jakarta Sans, Spacing, Elevation) có thông số kỹ thuật cụ thể.
- [x] **PASS:** Bố cục chi tiết của cả 4 trang (Home, About, Services, Contact) được đặc tả mạch lạc, đúng kiến trúc `INFORMATION_ARCHITECTURE.md`.
- [x] **PASS:** Thành phần dùng chung (Header, Footer, Logo Typographic, Buttons, FAQ, Form) có quy chuẩn rõ ràng.
- [x] **PASS:** Quy tắc Responsive và Accessibility (WCAG 2.1 AA) được xác lập đầy đủ.
- [x] **PASS:** Các thông tin chưa xác minh được giữ nguyên trạng thái `PENDING_CONFIRMATION`, không bịa dữ liệu.
- [x] **PASS:** Không tạo mã nguồn ứng dụng, không sửa tài liệu đã duyệt, không tác động môi trường production.
