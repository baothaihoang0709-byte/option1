# BÁO CÁO KIỂM KÊ NỘI DUNG VÀ HÌNH ẢNH (CONTENT & MEDIA INVENTORY)
**Dự án:** BIZWORK-IT Website Redesign  
**Nguồn dữ liệu:** [https://bizwork-it.com/](https://bizwork-it.com/)  
**Ngày thực hiện:** 24/10/2026  
**Trạng thái tài liệu:** Task 02 — Content & Media Inventory hoàn thành

---

## 1. THÔNG TIN TASK VÀ PHẠM VI KIỂM KÊ

- **Task ID:** Task 02
- **Tên task:** Kiểm kê nội dung và hình ảnh (Content & Media Inventory)
- **Giai đoạn:** Giai đoạn 1 — Audit website hiện tại
- **Mục tiêu:** Thu thập, cấu trúc hóa và phân loại toàn bộ nội dung văn bản (headings, paragraphs, labels, CTA, SEO metadata), tài nguyên media (ảnh nền, ảnh minh họa, icon PWA) và đồ họa vector (SVG) đang hiển thị công khai trên website [https://bizwork-it.com/](https://bizwork-it.com/).
- **Phạm vi bảo vệ nội dung doanh nghiệp:**
  - Giữ nguyên 100% câu chữ, ý nghĩa và cấu trúc nội dung gốc đã xác minh.
  - Không tự ý thêm bớt dịch vụ, không sáng tác số liệu kinh doanh, không bịa đặt testimonials.
  - Các thông tin doanh nghiệp còn thiếu hoặc chưa đủ ngữ cảnh được đánh dấu `NEEDS_CONFIRMATION`.

---

## 2. PHƯƠNG PHÁP THU THẬP DỮ LIỆU

1. **Phân tích DOM / HTML Parsing:**
   - Trích xuất toàn bộ cấu trúc cây DOM thực tế từ trang chủ `https://bizwork-it.com/` bằng các công cụ phân tích tự động.
   - Quét toàn bộ thuộc tính định danh ngữ nghĩa của GoDaddy (`data-aid`, `data-ux`, `id`, `aria-label`).
2. **Kiểm tra tiêu đề, đoạn văn và trường biểu mẫu:**
   - Quét thẻ `<title>`, `<meta>` (OpenGraph, Twitter Card, theme-color).
   - Quét tất cả thẻ `<h1>` đến `<h6>`, `<p>`, `<span>`, `<button>`, `<label>`, `<input>`, `<textarea>`.
3. **Đo kiểm tài nguyên Media & Hình ảnh:**
   - Quét tất cả thẻ `<img>` (`src`, `alt`, `data-aid`).
   - Quét các lớp CSS Background (`role="img"`, `data-aid="BACKGROUND_IMAGE_RENDERED"`, responsive background CSS classes).
   - Kiểm tra mã phản hồi HTTP, `Content-Type` và `Content-Length` thực tế thông qua các request `HEAD`.
4. **Trích xuất Vector & SVG:**
   - Bóc tách mã nguồn SVG trực tiếp trong DOM (`viewBox`, `fill`, `path`, kích thước).

---

## 3. TỔNG QUAN NỘI DUNG WEBSITE HIỆN TẠI

- **Mô hình tổ chức:** Website là một Landing Page 1 trang duy nhất (One-page), gồm 4 khối nội dung chính:
  1. **Header / Hero Section:** Chứa text logo thương hiệu `BIZWORK-IT`, khẩu hiệu chính `"Professional Technology Assistance"`, thông điệp `"We make technology accessible!"`, và nút kêu gọi hành động `"Get in Touch"` (cuộn xuống khối liên hệ). Nền là ảnh stock công nghệ với lớp phủ gradient.
  2. **About / Features Section:** Tiêu đề `"About Us"`, gồm 3 khối tính năng/lợi ích:
     - *Technical Experience* (Kinh nghiệm kỹ thuật đa dạng hệ điều hành, mạng, cơ sở dữ liệu cho dự án vừa và nhỏ).
     - *High ROI* (Tối ưu ngân sách IT thông qua dịch vụ IT outsourcing).
     - *Satisfaction Guaranteed* (Cam kết chất lượng dịch vụ chuyên nghiệp theo nhu cầu doanh nghiệp).
  3. **Contact Section:** Tiêu đề `"Contact Us"`, gồm:
     - Form liên hệ `"Drop us a line!"` (Name, Email, Message, Attach Files, Send button).
     - Thông tin doanh nghiệp: Pháp nhân `"BIZWORKIT (S) PTE LTD"`, địa điểm `"Singapore"`.
  4. **Footer Section:** Bản quyền `"Copyright © 2025 BIZWORK-IT - All Rights Reserved."`, link `"Powered by GoDaddy"`, và Cookie banner.

---

## 4. BẢNG KIỂM KÊ NỘI DUNG VĂN BẢN (TEXT INVENTORY)

| Mã ID | Nội dung gốc chính xác (Verbatim Content) | Loại nội dung | Vị trí / Section xuất hiện | data-aid / Selector | Trang dự kiến (Website mới) | Trạng thái | Ghi chú & Đánh giá |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| **TXT-001** | `BIZWORK-IT` | Brand Name / Logo Text | Header (Desktop & Mobile) | `HEADER_LOGO_TEXT_RENDERED` | Header, Footer | **VERIFIED** | Dạng text thuần, chưa có file logo vector chính thức. |
| **TXT-002** | `Professional Technology Assistance` | Main Tagline / H1 | Hero Section | `HEADER_TAGLINE_RENDERED` | Home (Hero) | **VERIFIED** | Tiêu đề H1 chính của trang chủ. |
| **TXT-003** | `We make technology accessible!` | Sub-tagline / Giá trị cốt lõi | Hero Section & OpenGraph | `dynamic-tagline` / `og:description` | Home, About | **VERIFIED** | Thông điệp định vị thương hiệu. |
| **TXT-004** | `Get in Touch` | Call To Action (Button) | Hero Section | `HEADER_CTA_BTN` | Home, Header, Contact | **VERIFIED** | Nút CTA chính dẫn tới biểu mẫu liên hệ. |
| **TXT-005** | `More` | Navigation Link | Mobile Header Nav | `NAV_MORE` | Header | **VERIFIED** | Nhãn dropdown điều hướng mobile của web cũ. |
| **TXT-006** | `About Us` | Section Heading (H2) | About Section | `ABOUT_SECTION_TITLE_RENDERED`| About, Home | **VERIFIED** | Tiêu đề phần giới thiệu. |
| **TXT-007** | `Technical Experience` | Feature Heading (H4) | About Item 0 | `ABOUT_HEADLINE_RENDERED0` | About, Services | **VERIFIED** | Tiêu đề năng lực kỹ thuật. |
| **TXT-008** | `We are well-versed in a variety of operating systems, networks, and databases. We work with just about any technology that a small business would encounter. We use this expertise to help customers with small to mid-sized projects.` | Feature Body Text | About Item 0 | `ABOUT_DESCRIPTION_RENDERED0` | About, Services | **VERIFIED** | Mô tả năng lực hỗ trợ hệ điều hành, mạng, database cho doanh nghiệp vừa và nhỏ. |
| **TXT-009** | `High ROI` | Feature Heading (H4) | About Item 1 | `ABOUT_HEADLINE_RENDERED1` | About, Services | **VERIFIED** | Tiêu đề lợi ích kinh tế. |
| **TXT-010** | `Do you spend most of your IT budget on maintaining your current system? Many companies find that constant maintenance eats into their budget for new technology. By outsourcing your IT management to us, you can focus on what you do best--running your business.` | Feature Body Text | About Item 1 | `ABOUT_DESCRIPTION_RENDERED1` | About, Services | **VERIFIED** | Mô tả giải pháp IT Management Outsourcing giúp tối ưu ngân sách. |
| **TXT-011** | `Satisfaction Guaranteed` | Feature Heading (H4) | About Item 2 | `ABOUT_HEADLINE_RENDERED2` | About, Home | **VERIFIED** | Tiêu đề cam kết dịch vụ. |
| **TXT-012** | `The world of technology can be fast-paced and scary. That's why our goal is to provide an experience that is tailored to your company's needs. No matter the budget, we pride ourselves on providing professional customer service. We guarantee you will be satisfied with our work.` | Feature Body Text | About Item 2 | `ABOUT_DESCRIPTION_RENDERED2` | About, Home | **VERIFIED** | Mô tả cam kết đồng hành và may đo theo nhu cầu/ngân sách. |
| **TXT-013** | `Contact Us` | Section Heading (H2) | Contact Section | `CONTACT_SECTION_TITLE_REND` | Contact, Home | **VERIFIED** | Tiêu đề khu vực liên hệ. |
| **TXT-014** | `Drop us a line!` | Form Title (H4) | Contact Form | `CONTACT_FORM_TITLE_REND` | Contact | **VERIFIED** | Tiêu đề mời gửi tin nhắn. |
| **TXT-015** | `Name` | Input Label | Contact Form | `CONTACT_FORM_NAME` | Contact | **VERIFIED** | Nhãn trường nhập họ tên. |
| **TXT-016** | `Email*` | Input Label (Bắt buộc) | Contact Form | `CONTACT_FORM_EMAIL` | Contact | **VERIFIED** | Nhãn trường nhập email bắt buộc. |
| **TXT-017** | `Message` | Textarea Placeholder | Contact Form | `CONTACT_FORM_MESSAGE` | Contact | **VERIFIED** | Nhãn trường nhập nội dung tin nhắn. |
| **TXT-018** | `Attach Files` | Action Label | Contact Form | `CONTACT_FILE_INPUT_REND` | Contact | **VERIFIED** | Nhãn nút đính kèm file. |
| **TXT-019** | `Attachments (0)` | Counter Label | Contact Form | `CONTACT_ATTACHMENT_COUNT_REND` | Contact | **VERIFIED** | Số lượng file đính kèm. |
| **TXT-020** | `Send` | Submit Button Label | Contact Form | `CONTACT_SUBMIT_BUTTON_REND` | Contact | **VERIFIED** | Nút gửi biểu mẫu. |
| **TXT-021** | `This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.` | Legal / Security Note | Contact Form Footer | Form Details | Contact | **VERIFIED** | Thông báo bảo vệ bởi Google reCAPTCHA. |
| **TXT-022** | `Better yet, see us in person!` | Info Heading (H4) | Contact Info Container | `CONTACT_INTRO_HEADING_REND` | Contact | **VERIFIED** | Lời mời gặp trực tiếp. |
| **TXT-023** | `BIZWORKIT (S) PTE LTD` | Legal Business Entity | Contact Info Details | `CONTACT_INFO_BIZ_NAME_REND` | Contact, Footer | **VERIFIED** | Tên pháp nhân đăng ký chính thức tại Singapore. |
| **TXT-024** | `Singapore` | Business Location | Contact Info Details | `CONTACT_INFO_ADDRESS_REND` | Contact, Footer | **PARTIALLY VERIFIED** | Chỉ hiển thị "Singapore". Cần xác nhận địa chỉ chi tiết (Building, Street, Postal Code). |
| **TXT-025** | `Copyright © 2025 BIZWORK-IT - All Rights Reserved.` | Copyright Text | Footer Section | `FOOTER_COPYRIGHT_RENDERED` | Footer | **VERIFIED** | Cập nhật năm bản quyền theo năm phát hành. |
| **TXT-026** | `Powered by GoDaddy` | Attribution Text | Footer Section | `FOOTER_POWERED_BY_RENDERED` | Other | **VERIFIED** | Nhãn GoDaddy web cũ; sẽ loại bỏ ở phiên bản Next.js mới. |
| **TXT-027** | `This website uses cookies.` | Cookie Banner Title | Footer Banner | `FOOTER_COOKIE_TITLE_RENDERED` | Global Notice | **VERIFIED** | Tiêu đề thông báo Cookie. |
| **TXT-028** | `We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data.` | Cookie Banner Body | Footer Banner | `FOOTER_COOKIE_MESSAGE_RENDERED`| Global Notice | **VERIFIED** | Nội dung giải thích chính sách Cookie. |
| **TXT-029** | `Accept` | Button Label | Footer Banner | `FOOTER_COOKIE_CLOSE_RENDERED` | Global Notice | **VERIFIED** | Nút đồng ý cookie. |
| **TXT-030** | `BIZWORK-IT` | Page Title Tag | HTML Head | `<title>` | Tất cả trang | **VERIFIED** | Tiêu đề SEO gốc. |
| **TXT-031** | `We make technology accessible!` | SEO Meta Description | HTML Head | `meta[name="description"]` | Home SEO | **VERIFIED** | Mô tả hiển thị trên Google Search snippet. |
| **TXT-032** | `Professional Technology Assistance`| Twitter Description | HTML Head | `meta[name="twitter:description"]`| Social Share | **VERIFIED** | Mô tả thẻ chia sẻ Twitter / OpenGraph. |

---

## 5. BẢNG KIỂM KÊ HÌNH ẢNH VÀ MEDIA (MEDIA INVENTORY)

| Mã ID | URL nguồn đầy đủ | Tên tệp / Stock ID | Định dạng | Kích thước / Dung lượng | Vị trí trên web cũ | Giá trị Alt | Mã HTTP | Mục đích & Đánh giá bản quyền |
| :--- | :--- | :--- | :---: | :---: | :--- | :---: | :---: | :--- |
| **MED-001** | `https://img1.wsimg.com/isteam/stock/3253` | Stock `3253` | JPEG | 116.8 KB (Responsive w:450 đến 5760px) | Hero Background & `og:image` | *(CSS Background, role="img")* | `200 OK` (204 HEAD) | **Ảnh nền Hero:** Stock photo GoDaddy về bảng mạch/công nghệ. **Rủi ro bản quyền:** Gắn liền với gói GoDaddy Website Builder; khuyến nghị thay bằng ảnh có bản quyền riêng hoặc đồ họa thiết kế mới. |
| **MED-002** | `https://img1.wsimg.com/isteam/stock/gAqG9d3/:/rs=w:600,h:300,cg:true,m/cr=w:600,h:300` | Stock `gAqG9d3` | JPEG | 600x300 px (8.15 KB) | Khối About 0 (Technical Experience) | `""` (Rỗng) | `200 OK` (204 HEAD) | **Ảnh minh họa Technical:** Stock photo GoDaddy về laptop/bo mạch chủ. Cần alt text rõ ràng và ảnh có bản quyền chuẩn. |
| **MED-003** | `https://img1.wsimg.com/isteam/stock/8766/:/rs=w:600,h:300,cg:true,m/cr=w:600,h:300` | Stock `8766` | JPEG | 600x300 px (18.6 KB) | Khối About 1 (High ROI) | `""` (Rỗng) | `200 OK` (204 HEAD) | **Ảnh minh họa ROI:** Stock photo GoDaddy về biểu đồ/ngân sách. Cần alt text chuẩn accessibility. |
| **MED-004** | `https://img1.wsimg.com/isteam/stock/DxRYKJo/:/rs=w:600,h:300,cg:true,m/cr=w:600,h:300` | Stock `DxRYKJo` | JPEG | 600x300 px (43.0 KB) | Khối About 2 (Satisfaction Guaranteed) | `""` (Rỗng) | `200 OK` (204 HEAD) | **Ảnh minh họa Satisfaction:** Stock photo GoDaddy về dịch vụ khách hàng/bắt tay. |
| **MED-005** | `https://img1.wsimg.com/isteam/ip/static/pwa-app/logo-default.png/:/rs=w:180,h:180,m` (và các cỡ: 57, 60, 72, 114, 120, 144, 152, 192, 512) | `logo-default.png` | PNG/JPEG | 180x180 px (2.3 KB) | Favicon / Apple Touch Icon / PWA | N/A | `200 OK` | **Icon mặc định của GoDaddy:** Đây là biểu tượng generic mặc định của GoDaddy PWA, không phải logo của doanh nghiệp BIZWORK-IT. Cần thay bằng Favicon chính thức. |

---

## 6. BẢNG KIỂM KÊ LOGO, SVG VÀ VECTOR ICONS

| Mã ID | Phần tử / Mã tham chiếu | viewBox | Kích thước hiển thị | Nội dung / Path tóm tắt | Vị trí xuất hiện | Mục đích sử dụng | Trạng thái |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- | :---: |
| **LOGO-001** | `HEADER_LOGO_TEXT_RENDERED` | N/A | Font 24-28px | Text: `BIZWORK-IT` (Font: Karla, Bold 700) | Header (Logo Container) | Nhận diện thương hiệu chính | **VERIFIED** |
| **SVG-001** | Chevron Down Icon | `0 0 24 24` | 16x16 px | Path: `M19.544 7.236a.773.773 0 0 1-.031 1.06l-7.883 7.743...` | Nút "More" Header Mobile | Mở menu điều hướng trên màn hình nhỏ | **VERIFIED** |
| **SVG-002** | Paperclip Icon (`data-aid="paperclip"`) | `0 0 24 24` | 1em x 1em | Path: `M15.6 11.6L17 13l-5.9 5.9c-1.3 1.3-2.9 1.9-4.6 1.9...` | Form liên hệ (`Attach Files`) | Biểu tượng đính kèm tệp tin | **VERIFIED** |
| **SVG-003** | Chat/Messaging FAB Icon | `0 0 24 24` | 44x44 px | Rect: `x="4" y="6" width="16" height="10.222"` + Bubble tail | Nút chat nổi góc dưới màn hình | Biểu tượng nhắn tin trực tiếp (GoDaddy Messaging) | **VERIFIED** |

---

## 7. BẢNG PHÂN LOẠI NỘI DUNG THEO TRANG DỰ KIẾN (WEBSITE MỚI)

Website mới gồm 4 trang: **Home**, **About**, **Services**, **Contact**. Dưới đây là phân bổ nội dung hiện có trên cơ sở bằng chứng thực tế:

| Trang mới | Các nội dung kế thừa từ website cũ | Mục đích sử dụng trên giao diện mới | Đề xuất bổ sung / Cải tiến |
| :--- | :--- | :--- | :--- |
| **Header (Dùng chung)** | - TXT-001 (`BIZWORK-IT`)<br>- Menu điều hướng: Home, About, Services, Contact<br>- Nút chuyển đổi ngôn ngữ EN / VI<br>- TXT-004 (CTA `Get in Touch`) | Thanh điều hướng đầu trang xuyên suốt toàn bộ website | Bổ sung logo dạng đồ họa SVG sắc nét và thanh chọn ngôn ngữ Tiếng Anh / Tiếng Việt. |
| **Home (Trang chủ)** | - TXT-002 (`Professional Technology Assistance`)<br>- TXT-003 (`We make technology accessible!`)<br>- TXT-004 (`Get in Touch`)<br>- Tóm tắt 3 thế mạnh (TXT-007, TXT-009, TXT-011)<br>- CTA Section dẫn tới Contact | Tạo ấn tượng ban đầu hiện đại, truyền tải thông điệp định vị và tóm lược dịch vụ | Hero section phong cách tối giản hiện đại (dark/light mode thanh lịch), thẻ tóm tắt dịch vụ với hiệu ứng vi tương tác. |
| **About (Về chúng tôi)**| - TXT-006 (`About Us`)<br>- TXT-011 & TXT-012 (`Satisfaction Guaranteed` & nội dung cam kết phục vụ)<br>- TXT-023 (`BIZWORKIT (S) PTE LTD`) | Giới thiệu doanh nghiệp, tầm nhìn, cam kết và đối tượng khách hàng mục tiêu | Cần bổ sung thêm thông tin về lịch sử thành lập, đội ngũ hoặc sứ mệnh nếu được cung cấp. |
| **Services (Dịch vụ)** | - TXT-007 & TXT-008 (`Technical Experience`: Quản trị OS, mạng, CSDL cho dự án vừa và nhỏ)<br>- TXT-009 & TXT-010 (`High ROI`: Dịch vụ IT Management Outsourcing) | Trình bày các gói giải pháp CNTT mà công ty cung cấp | Trình bày 2 nhóm dịch vụ rõ ràng: **1. Hỗ trợ kỹ thuật & Cơ sở hạ tầng**; **2. Quản trị IT thuê ngoài (IT Outsourcing)**. |
| **Contact (Liên hệ)** | - TXT-013 (`Contact Us`)<br>- TXT-014 đến TXT-021 (Toàn bộ biểu mẫu `Drop us a line!` & các trường nhập)<br>- TXT-022 (`Better yet, see us in person!`)<br>- TXT-023 (`BIZWORKIT (S) PTE LTD`)<br>- TXT-024 (`Singapore`) | Trang tiếp nhận yêu cầu tư vấn, gửi tin nhắn và thông tin kết nối pháp nhân | Cần bổ sung email liên hệ chính thức, số điện thoại hotline, địa chỉ văn phòng cụ thể. |
| **Footer (Dùng chung)** | - TXT-001 (`BIZWORK-IT`)<br>- TXT-023 (`BIZWORKIT (S) PTE LTD`)<br>- TXT-024 (`Singapore`)<br>- TXT-025 (`Copyright © 2025 BIZWORK-IT - All Rights Reserved.`)<br>- Liên kết điều hướng các trang | Chân trang cố định chứa thông tin bản quyền và liên kết điều hướng | Loại bỏ dòng "Powered by GoDaddy" để nâng tầm chuyên nghiệp của website doanh nghiệp. |

---

## 8. DANH SÁCH NỘI DUNG CẦN DỊCH SANG TIẾNG VIỆT

Website hiện tại 100% bằng tiếng Anh (`en-SG`). Khi triển khai tính năng đa ngôn ngữ ở Giai đoạn 6, các hạng mục nội dung sau bắt buộc cần bản dịch tiếng Việt tương ứng:

1. **Tagline & Thông điệp thương hiệu:**
   - `Professional Technology Assistance` (TXT-002)
   - `We make technology accessible!` (TXT-003)
2. **Kêu gọi hành động & Điều hướng (Buttons & Navigation):**
   - `Get in Touch` (TXT-004)
   - `About Us` (TXT-006)
   - `Services` (Dự kiến)
   - `Contact Us` (TXT-013)
   - `Send` (TXT-020)
   - `Attach Files` (TXT-018)
   - `Attachments (0)` (TXT-019)
3. **Nội dung giới thiệu & Dịch vụ:**
   - Tiêu đề & nội dung `Technical Experience` (TXT-007, TXT-008)
   - Tiêu đề & nội dung `High ROI` (TXT-009, TXT-010)
   - Tiêu đề & nội dung `Satisfaction Guaranteed` (TXT-011, TXT-012)
4. **Biểu mẫu liên hệ & Nhãn trường:**
   - `Drop us a line!` (TXT-014)
   - `Name` (TXT-015)
   - `Email*` (TXT-016)
   - `Message` (TXT-017)
   - `Better yet, see us in person!` (TXT-022)
5. **Thông báo hệ thống & Bản quyền:**
   - Thông báo bảo mật reCAPTCHA (TXT-021)
   - Bản quyền bản ngữ (TXT-025)
   - Cookie Notice (TXT-027, TXT-028, TXT-029)
   - SEO Title & Meta Description tiếng Việt (TXT-030, TXT-031)

*(Lưu ý: Theo đúng quy tắc an toàn, không tự sáng tác bản dịch hoàn chỉnh trong Task 02 này; bản dịch sẽ được thống nhất trong Giai đoạn 2 và triển khai ở Giai đoạn 6).*

---

## 9. DANH SÁCH THÔNG TIN VÀ TÀI NGUYÊN CẦN XÁC NHẬN (`NEEDS_CONFIRMATION`)

| STT | Hạng mục cần xác nhận | Hiện trạng trên website cũ | Vấn đề / Nguy cơ | Đề xuất giải pháp |
| :---: | :--- | :--- | :--- | :--- |
| **NC-01** | **Địa chỉ văn phòng cụ thể** | Chỉ ghi nhận chữ `"Singapore"` (TXT-024) | Không có số nhà, tên tòa nhà, tên đường hay mã bưu chính (Postal code) để khách hàng gửi thư hoặc liên hệ thực tế. | Người phụ trách xác nhận địa chỉ trụ sở đầy đủ của `BIZWORKIT (S) PTE LTD` tại Singapore. |
| **NC-02** | **Số điện thoại & Email trực tiếp** | Hoàn toàn không hiển thị số điện thoại hoặc email trên website cũ | Khách hàng chỉ có một kênh duy nhất là điền webform; thiếu thông tin liên hệ khẩn cấp hoặc gửi email trực tiếp. | Người phụ trách xác nhận có bổ sung số hotline và email hỗ trợ (ví dụ: `contact@bizwork-it.com` hoặc `support@bizwork-it.com`) hay không. |
| **NC-03** | **Bản quyền hình ảnh stock GoDaddy** | 4 ảnh (`3253`, `gAqG9d3`, `8766`, `DxRYKJo`) là ảnh kho lưu trữ GoDaddy Stock | Khi chuyển sang Next.js độc lập trên Vercel/Hosting mới, việc tiếp tục trỏ link ảnh từ CDN `img1.wsimg.com` có thể vi phạm điều khoản của GoDaddy hoặc bị đứt gãy link khi hủy gói GoDaddy. | Đề xuất thay thế bằng bộ ảnh Unsplash/Pexels có giấy phép thương mại mở hoặc tạo ảnh minh họa tối giản, chuyên nghiệp bằng công cụ thiết kế. |
| **NC-04** | **File Logo Vector chính thức** | Website cũ dùng text thuần `BIZWORK-IT`, PWA icon dùng logo mặc định của GoDaddy | Thiếu file logo chính thức (SVG/PNG nền trong suốt) để hiển thị sắc nét trên màn hình Retina/High-DPI và làm Favicon. | Người phụ trách cung cấp file logo gốc (SVG/PNG) hoặc phê duyệt thiết kế typographic logo mới. |
| **NC-05** | **Cơ chế nhận dữ liệu của Contact Form** | Form hiện tại gửi trực tiếp qua hạ tầng backend ngầm của GoDaddy | Website Next.js độc lập không thể dùng trực tiếp form handler độc quyền của GoDaddy nếu không duy trì dịch vụ GoDaddy. | Cần thống nhất phương án xử lý form ở Giai đoạn 6 (ví dụ: Resend API, Formspree, Web3Forms, hoặc EmailJS). |

---

## 10. GIỚI HẠN THU THẬP VÀ CÁC LỖI TRUY CẬP

1. **Giới hạn Rate-Limit của GoDaddy:** Máy chủ `DPS/2.0.0` giới hạn tần suất request. Toàn bộ quá trình quét hình ảnh và nội dung đã được giãn cách để đảm bảo dữ liệu toàn vẹn, không gây nghẽn kết nối.
2. **Không có trang con (Subpages):** Xác nhận 100% nội dung hiển thị nằm trọn vẹn trong một file HTML duy nhất của trang chủ.
3. **Alt Text của hình ảnh cũ bị bỏ trống:** Cả 3 ảnh minh họa dịch vụ trên website cũ (`ABOUT_IMAGE_RENDERED0`, `1`, `2`) đều có thuộc tính `alt=""` (rỗng), gây hạn chế về SEO hình ảnh và chuẩn tiếp cận người dùng khiếm thị (Accessibility / WCAG).

---

## 11. THỐNG KÊ SỐ LƯỢNG MỤC ĐÃ KIỂM KÊ

- **Tổng số hạng mục văn bản kiểm kê:** **32 mục**
  - Tiêu đề thương hiệu, Tagline, H1, H2, H4: 12 mục
  - Đoạn văn mô tả (Body copy, Features): 5 mục
  - Nhãn nút, liên kết điều hướng, CTA: 5 mục
  - Trường biểu mẫu & Thông báo pháp lý: 7 mục
  - SEO Metadata (Title, Meta Description, Twitter): 3 mục
- **Tổng số tài nguyên hình ảnh & media:** **5 tài nguyên**
  - Ảnh nền Hero banner: 1 ảnh (JPEG, responsive)
  - Ảnh minh họa dịch vụ/thế mạnh: 3 ảnh (JPEG)
  - Bộ PWA Icon GoDaddy: 1 tập hợp (nhiều kích thước)
- **Tổng số biểu tượng Vector & SVG:** **4 mục** (1 Text Logo + 3 SVG icons)
- **Số hạng mục cần người phụ trách xác nhận (`NEEDS_CONFIRMATION`):** **5 hạng mục** (Địa chỉ, Điện thoại/Email, Bản quyền ảnh GoDaddy, File logo vector, Phương thức xử lý form).

---

## 12. CHECKLIST NGHIỆM THU TASK 02

- [x] **PASS:** Trích xuất đầy đủ toàn bộ nội dung văn bản gốc kèm định danh và ngữ cảnh.
- [x] **PASS:** Kiểm kê toàn bộ tài nguyên hình ảnh, định dạng, dung lượng và vị trí xuất hiện.
- [x] **PASS:** Bóc tách đầy đủ biểu tượng SVG và text logo hiện có trên trang.
- [x] **PASS:** Phân loại vị trí sử dụng phù hợp cho 4 trang mới (Home, About, Services, Contact).
- [x] **PASS:** Liệt kê danh mục nội dung bắt buộc cần dịch sang tiếng Việt cho Giai đoạn 6.
- [x] **PASS:** Đánh dấu rõ ràng các thông tin còn thiếu và rủi ro bản quyền (`NEEDS_CONFIRMATION`).
- [x] **PASS:** File `CONTENT_INVENTORY.md` được tạo độc lập tại thư mục gốc workspace, không can thiệp file mã nguồn, không tác động website production.
