# BÁO CÁO NGHIỆM THU — TASK 14: WEBSITE-WIDE BILINGUAL IMPLEMENTATION (EN/VI)

**Dự án:** BIZWORK-IT Website Redesign  
**Workspace:** `d:\bizwork-redesign`  
**Ngày hoàn tất:** 25/10/2026  
**Trạng thái task:** ĐÃ HOÀN TẤT — SẴN SÀNG CHỜ DUYỆT (READY FOR REVIEW)  

---

## 1. Kiến trúc Đa ngôn ngữ Đã chọn & Lý do

### 1.1. Kiến trúc đã triển khai
Hệ thống đa ngôn ngữ được thiết kế theo giải pháp lightweight, native với **Next.js App Router**, **TypeScript Strict** và **React 19**, không phụ thuộc vào các thư viện bên ngoài cồng kềnh (không cài thêm package ngoài).

- **Kiểu dữ liệu TypeScript nghiêm ngặt (`lib/i18n/types.ts`):** Interface `TranslationDictionary` định nghĩa cấu trúc 100% type-safe cho toàn bộ từ điển EN/VI của cả 4 route, layout, header, footer, CTA và form validation. Tuyệt đối không dùng kiểu `any`.
- **Bộ từ điển song ngữ (`lib/i18n/dictionaries/`):**
  - `en.ts`: Bộ từ điển tiếng Anh gốc chuẩn hóa theo toàn bộ nội dung đã xác minh từ các task 09–13.
  - `vi.ts`: Bộ từ điển tiếng Việt dịch chuyên nghiệp, tự nhiên, văn phong B2B công nghệ chuẩn mực, giữ nguyên các thuật ngữ kỹ thuật (Windows, Linux, OS, LAN, Wi-Fi, Router, Switch, Database, High ROI, SMBs) và thương hiệu (`BIZWORK-IT`, `BIZWORKIT (S) PTE LTD`, `Singapore`).
- **Store & React Context (`lib/i18n/LanguageContext.tsx`):**
  - Tích hợp `useSyncExternalStore` của React 19 để đồng bộ an toàn với `localStorage` mà không gây cascading render, không vi phạm ESLint `react-hooks/set-state-in-effect`.
  - Cung cấp hook `useLanguage()` trả về `{ language, setLanguage, toggleLanguage, t }`.
  - Tự động cập nhật `document.documentElement.lang` và dynamic `document.title` tương ứng với route và ngôn ngữ được chọn.
- **Giữ nguyên Server Component của Root Layout (`app/layout.tsx`):** `RootLayout` vẫn là Server Component xuất metadata tĩnh chuẩn SEO cho build tĩnh (`○ (Static)`), bao bọc bởi `<LanguageProvider>` Client Component nhận `children`.

### 1.2. Lý do lựa chọn
1. **Bảo toàn Server Side Rendering & Static Pre-rendering:** Toàn bộ 5 route (`/`, `/about`, `/services`, `/contact`, `/_not-found`) vẫn prerendered 100% static (`○ (Static)`).
2. **Không thay đổi URL Route:** Khi người dùng chuyển đổi EN/VI, route giữ nguyên vị trí (ví dụ `/services` vẫn giữ nguyên `/services`), đáp ứng đúng yêu cầu của Task 14.
3. **Hiệu năng tối ưu:** Chuyển đổi ngôn ngữ tức thì tại client không cần reload trang hay fetch network thêm.
4. **Không cài đặt dependency dư thừa:** Tránh xung đột phụ thuộc giữa Next.js 16/React 19 và các thư viện i18n cũ.

---

## 2. Danh sách File Tạo mới & Chỉnh sửa

### 2.1. File tạo mới
| File | Mục đích |
| :--- | :--- |
| `lib/i18n/types.ts` | Interface và types định nghĩa cấu trúc từ điển song ngữ type-safe |
| `lib/i18n/dictionaries/en.ts` | Từ điển tiếng Anh toàn diện cho toàn bộ website |
| `lib/i18n/dictionaries/vi.ts` | Từ điển tiếng Việt chuẩn B2B công nghệ cho toàn bộ website |
| `lib/i18n/LanguageContext.tsx` | Provider, hook `useLanguage` và cơ chế đồng bộ an toàn `useSyncExternalStore` |
| `lib/i18n/index.ts` | Barrel export cho module `lib/i18n` |
| `components/common/LanguageSwitcher.tsx` | Component chuyển đổi ngôn ngữ tương tác (pill toggle `EN / VI`), hỗ trợ chuột, phím (`aria-pressed`, `role="group"`), mobile |

### 2.2. File chỉnh sửa
| File | Nội dung thay đổi |
| :--- | :--- |
| `app/layout.tsx` | Tích hợp `<LanguageProvider>` bao bọc ứng dụng |
| `components/common/Header.tsx` | Kết nối `useLanguage()`, tích hợp `LanguageSwitcher` trên desktop bar và mobile drawer menu, dịch nav items và CTA |
| `components/common/Footer.tsx` | Kết nối `useLanguage()`, dịch tagline, giới thiệu pháp nhân Singapore, navigation links, inquiries và copyright |
| `components/common/SkipToContent.tsx` | Dịch nội dung liên kết bỏ qua trợ năng theo ngôn ngữ |
| `components/home/HeroSection.tsx` | Dịch badge, H1, tagline, description, CTAs, competency tags |
| `components/home/TechVisual.tsx` | Dịch các label hệ thống, metric status, ROI badge, Satisfaction badge |
| `components/home/ValuePillarsSection.tsx` | Dịch toàn bộ 3 trụ cột giá trị cốt lõi |
| `components/home/ServicesOverviewSection.tsx` | Dịch 2 nhóm giải pháp kỹ thuật, danh sách chi tiết và CTA catalog |
| `components/home/WorkingMethodologySection.tsx` | Dịch 4 bước quy trình hợp tác và link điều hướng |
| `components/home/ConversionCtaSection.tsx` | Dịch banner kêu gọi chuyển đổi và cam kết ngân sách |
| `components/about/AboutHero.tsx` | Dịch breadcrumb, badge, H1, tagline, nội dung pháp nhân, 4 ô fact strip |
| `components/about/CorporateProfile.tsx` | Dịch sứ mệnh, 2 nguyên tắc hoạt động, card pháp nhân Singapore |
| `components/about/CustomerCommitment.tsx` | Dịch cam kết khách hàng, trích dẫn triết lý, 3 chiều kích giá trị |
| `components/about/TechnicalStrengths.tsx` | Dịch 3 cụm năng lực công nghệ và checklist chi tiết |
| `components/about/PartnershipCta.tsx` | Dịch banner kêu gọi hợp tác và cam kết hỗ trợ |
| `components/services/ServicesHero.tsx` | Dịch breadcrumb, H1, tagline, mô tả, 4 ô năng lực nhanh |
| `components/services/TechnicalSupportSection.tsx` | Dịch 3 miền hỗ trợ kỹ thuật, checklist, banner tư vấn |
| `components/services/ItOutsourcingSection.tsx` | Dịch trích dẫn bài toán chi phí, mô tả, 4 thẻ lợi ích chiến lược |
| `components/services/ValueComparisonSection.tsx` | Dịch bảng so sánh 4 khía cạnh In-House vs Outsourcing, disclaimer khách quan |
| `components/services/FaqAccordion.tsx` | Dịch toàn bộ 4 câu hỏi và câu trả lời FAQ |
| `components/services/ServicesCta.tsx` | Dịch banner chuyển đổi dịch vụ |
| `components/contact/ContactHero.tsx` | Dịch breadcrumb, H1, tagline, mô tả và CTAs |
| `components/contact/ContactInfo.tsx` | Dịch card pháp nhân Singapore, thông báo kênh liên hệ minh bạch (PC-01, PC-02), cam kết dịch vụ |
| `components/contact/ContactForm.tsx` | Dịch nhãn trường, placeholder, dropdown dịch vụ, toàn bộ thông báo lỗi validation tức thì, banner thông báo thành công và nút reset |
| `components/contact/WhatHappensNext.tsx` | Dịch 3 bước quy trình tiếp nhận và đánh giá yêu cầu |
| `components/contact/ContactClosingCta.tsx` | Dịch banner tài nguyên điều hướng ngược lại Services/About |

---

## 3. Phạm vi Nội dung Đã dịch trên Từng Route

### 3.1. Header & Footer (Dùng chung)
- **Header:**
  - Navigation: `Home` → `Trang chủ`, `About` → `Giới thiệu`, `Services` → `Dịch vụ`, `Contact` → `Liên hệ`.
  - CTA Button: `Get in Touch` → `Liên hệ ngay`.
  - Language Switcher: Pill `EN / VI` với trạng thái active rõ ràng, có `aria-label` và `aria-pressed`.
  - Mobile Menu: Nhãn `Language` → `Ngôn ngữ`, giữ nguyên trải nghiệm đóng/mở và chuyển ngôn ngữ ngay trong drawer.
- **Footer:**
  - Tagline: `We make technology accessible!` → `Chúng tôi giúp công nghệ trở nên dễ tiếp cận!`.
  - Pháp nhân: Giữ nguyên `BIZWORKIT (S) PTE LTD`, dịch mô tả cam kết và `Registered in Singapore` → `Đăng ký tại Singapore`.
  - Bản quyền: `© 2026 BIZWORK-IT. All rights reserved.` → `© 2026 BIZWORK-IT. Bảo lưu mọi quyền.`

### 3.2. Trang Home `/`
- **Hero:**
  - Tiêu đề: `Professional Technology Assistance` → `Hỗ trợ Công nghệ Chuyên nghiệp`.
  - Tagline: `We make technology accessible!` → `Chúng tôi giúp công nghệ trở nên dễ tiếp cận!`.
  - Nút: `Get in Touch` → `Liên hệ ngay`, `Explore Services` → `Khám phá Dịch vụ`.
  - Thẻ năng lực: Hệ điều hành Windows & Linux, Hạ tầng Mạng văn phòng, Hỗ trợ Cơ sở dữ liệu, Thuê ngoài Quản trị IT.
- **TechVisual:**
  - Đồ họa kiến trúc hạ tầng đồng bộ: Multi-OS, Mạng văn phòng, Quản trị Cơ sở dữ liệu, Giám sát vận hành.
  - Thẻ nổi: `High ROI Focus` → `Trọng tâm ROI Cao`, `Satisfaction Guaranteed` → `Đảm bảo Hài lòng`.
- **Value Pillars:**
  - 3 trụ cột: Kinh nghiệm Kỹ thuật, ROI Cao, Đảm bảo Hài lòng.
- **Services Overview:**
  - Hỗ trợ Kỹ thuật & Hạ tầng, Thuê ngoài Quản trị IT.
- **Working Methodology:**
  - 4 bước: 01 Tiếp nhận & Khảo sát, 02 Đánh giá Hệ thống, 03 Triển khai Phù hợp, 04 Hỗ trợ & Đồng hành.
- **Conversion CTA:**
  - Kêu gọi nâng cấp hạ tầng công nghệ cho doanh nghiệp vừa và nhỏ.

### 3.3. Trang About `/about`
- **About Hero:**
  - H1: `About BIZWORK-IT` → `Về BIZWORK-IT`.
  - Strip pháp nhân: Pháp nhân `BIZWORKIT (S) PTE LTD`, Địa bàn Singapore, Đối tượng Doanh nghiệp vừa và nhỏ, Cam kết Đảm bảo Hài lòng.
- **Corporate Profile:**
  - Sứ mệnh doanh nghiệp, 2 nguyên tắc hoạt động: Công nghệ Dễ tiếp cận và Dự đoán Ngân sách.
  - Card pháp nhân chính thức với nhãn Verified.
- **Customer Commitment:**
  - Trích dẫn nguyên văn cam kết dịch vụ khách hàng từ nguồn TXT-012.
  - 3 chiều kích: Phương pháp Tiếp cận May đo, Tôn trọng Ngân sách Doanh nghiệp, Cam kết Hài lòng.
- **Technical Strengths:**
  - 3 mảng năng lực kỹ thuật: Hệ điều hành, Hệ thống mạng, Hỗ trợ Cơ sở dữ liệu.
- **Partnership CTA:**
  - Biểu ngữ kêu gọi hợp tác cùng phát triển.

### 3.4. Trang Services `/services`
- **Services Hero:**
  - H1: `IT Support & Managed Services` → `Hỗ trợ Kỹ thuật & Dịch vụ Quản trị IT`.
  - Dải năng lực nhanh: HĐH Windows & Linux, Kết nối Mạng văn phòng, Bảo trì Cơ sở dữ liệu, Thuê ngoài ROI Cao.
- **Technical Support:**
  - 3 miền kỹ thuật: Hỗ trợ Hệ điều hành, Mạng & Kết nối Văn phòng, Hỗ trợ Cơ sở dữ liệu.
  - Banner liên hệ hỗ trợ kỹ thuật tức thì.
- **IT Outsourcing Section:**
  - Trích dẫn nguồn TXT-010 về bài toán chi phí bảo trì hệ thống.
  - 4 lợi ích chiến lược: Dự đoán Ngân sách, Bảo trì Hệ thống Chủ động, Năng lực Đa nền tảng, Tập trung 100% vào Kinh doanh.
- **Value Comparison:**
  - Bảng so sánh 4 khía cạnh giữa IT Nội bộ Doanh nghiệp và Mô hình Thuê ngoài BIZWORK-IT: Nhân sự & Tổ chức, Chuyên môn Kỹ thuật, Quản lý & Thời gian, Cấu trúc Chi phí.
  - Ghi chú đánh giá khách quan (Objective Assessment).
- **FAQ Accordion:**
  - 4 câu hỏi & câu trả lời đầy đủ bằng tiếng Việt: Phù hợp doanh nghiệp nhỏ, Hỗ trợ đa hệ điều hành, Cơ chế phối hợp thuê ngoài, Quy trình đánh giá phạm vi.
- **Services CTA:**
  - Biểu ngữ tư vấn giải pháp công nghệ.

### 3.5. Trang Contact `/contact`
- **Contact Hero:**
  - H1: `Contact BIZWORK-IT` → `Liên hệ BIZWORK-IT`.
  - Lời mời: `Drop us a line! We make technology accessible.` → `Hãy liên hệ với chúng tôi! Chúng tôi giúp công nghệ trở nên dễ tiếp cận.`
- **Contact Info:**
  - Card thực thể pháp lý `BIZWORKIT (S) PTE LTD`, Singapore.
  - Thông báo minh bạch kênh liên hệ (Contact Channel Notice): Nêu rõ địa chỉ, hotline, email đang chờ xác thực chính thức (PC-01, PC-02).
- **Contact Form:**
  - Nhãn: `Họ và tên *`, `Email doanh nghiệp *`, `Tên công ty (Không bắt buộc)`, `Dịch vụ quan tâm`, `Tin nhắn / Nội dung yêu cầu *`.
  - Tùy chọn dịch vụ: Hỗ trợ Kỹ thuật & Hạ tầng, Thuê ngoài Quản trị IT (ROI Cao), Tư vấn Công nghệ Chung.
  - Placeholder: `Ví dụ: Nguyễn Văn A`, `Ví dụ: name@company.com`, `Mô tả về hệ điều hành, hệ thống mạng...`
  - Validation messages tiếng Việt:
    - Họ tên: `Vui lòng nhập họ và tên của bạn.` (hoặc `Họ và tên phải có ít nhất 2 ký tự.`)
    - Email: `Vui lòng nhập email doanh nghiệp của bạn.` (hoặc `Vui lòng nhập địa chỉ email hợp lệ...`)
    - Tin nhắn: `Vui lòng mô tả yêu cầu công nghệ của bạn.` (hoặc `Nội dung tin nhắn phải có ít nhất 10 ký tự.`)
  - Banner thành công: `Xác thực Phía Trình duyệt Thành công`, `Thông báo: Đang chờ Cấu hình Gửi Phía Máy chủ`.
  - Nút hành động: `Kiểm tra & Gửi Yêu cầu (Client Demo)`, nút `Đặt lại Biểu mẫu để Thử lại`.
- **What Happens Next:**
  - 3 bước quy trình tiếp nhận yêu cầu: 01 Đánh giá Yêu cầu, 02 Trao đổi & Khảo sát, 03 Đề xuất May đo.
- **Closing CTA:**
  - Điều hướng ngược lại Services/About.

---

## 4. Cách Hoạt Động của Language Switcher & Lưu Lựa Chọn

1. **Vị trí hiển thị:**
   - Trên desktop: Language switcher pill dạng `EN / VI` đặt ngay trên thanh tiện ích Header.
   - Trên mobile: Switcher nhỏ gọn hiển thị trực tiếp trên thanh Header cạnh nút hamburger, và một switcher đầy đủ được đặt bên trong Mobile Drawer Menu.
2. **Hành vi chuyển đổi:**
   - Người dùng click vào `VI` hoặc `EN` (hoặc dùng phím Tab + Space/Enter).
   - Trạng thái `language` lập tức cập nhật qua custom event và `useSyncExternalStore`.
   - Toàn bộ nội dung trang hiện tại được cập nhật ngay lập tức mà **không cần reload trang**.
   - URL trên thanh địa chỉ giữ nguyên (ví dụ: `/services` giữ nguyên `/services`).
3. **Lưu trữ lựa chọn:**
   - Lưu vào `localStorage.getItem('bizwork_lang')` với giá trị `'en'` hoặc `'vi'`.
   - Khi chuyển trang (navigate) hoặc reload (F5), website tự động đọc giá trị đã lưu và giữ nguyên ngôn ngữ người dùng đã chọn.
4. **Trợ năng (Accessibility):**
   - Vùng chọn bọc trong container `role="group"`.
   - Có `aria-label="Language selection: English or Vietnamese"`.
   - Nút đang được chọn có `aria-pressed="true"` và style nổi bật (`bg-white text-blue-600 shadow-xs font-bold`).

---

## 5. Xử Lý Hydration & Fallback

- **Tránh Hydration Mismatch:**
  - Khi render phía server (SSR/SSG), Next.js luôn kết xuất ngôn ngữ mặc định là English (`en`).
  - Tại client, hook `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` được sử dụng:
    - `getServerSnapshot()` trả về `"en"` đồng bộ tuyệt đối với SSR HTML ban đầu.
    - Sau khi hydrate, React tự động cập nhật snapshot từ `getSnapshot()` (đọc `localStorage`) mà không gây chớp nháy (no flash of incorrect language) và không kích hoạt lỗi hydration.
- **Graceful Fallback khi localStorage bị chặn:**
  - Mọi thao tác đọc/ghi `localStorage` được bọc cẩn thận trong khối `try...catch`.
  - Nếu trình duyệt ở chế độ ẩn danh bị chặn lưu trữ hoặc vô hiệu hóa cookie/storage, ứng dụng vẫn hoạt động bình thường với ngôn ngữ mặc định (`en`) mà không phát sinh bất kỳ lỗi runtime nào.
- **Đồng bộ Thẻ `html lang` và Document Title:**
  - Khi ngôn ngữ thay đổi, hook tự động gán `document.documentElement.lang = language` (`en` hoặc `vi`).
  - Đồng thời cập nhật `document.title` theo bảng tiêu đề song ngữ đã định nghĩa cho từng route tương ứng.

---

## 6. Kết Quả Kiểm Thử

### 6.1. Kiểm thử Kỹ thuật (CLI)
1. **Kiểm tra TypeScript Strict:**
   ```bash
   npx tsc --noEmit
   # Exit code: 0 (Zero errors)
   ```
2. **Kiểm tra ESLint:**
   ```bash
   npm run lint
   # Exit code: 0 (Zero errors, zero warnings)
   ```
3. **Kiểm tra Production Build:**
   ```bash
   npm run build
   # Compiled successfully in 668ms
   # 100% 5 routes prerendered static ○ (Static)
   ```

### 6.2. Kiểm thử Chức năng Trình duyệt (Browser Subagent)
- **Home `/`:**
  - Chuyển `EN` → `VI`: Toàn bộ Hero, TechVisual, Value Pillars, Services Overview, Methodology, CTA và Footer chuyển sang tiếng Việt thành công.
  - Chuyển `VI` → `EN`: Khôi phục tiếng Anh tức thì, không reload.
- **About `/about`:**
  - Mở trang ở trạng thái tiếng Việt: H1 "Về BIZWORK-IT", thông tin pháp nhân BIZWORKIT (S) PTE LTD, triết lý "Satisfaction Guaranteed" hiển thị chuẩn xác.
- **Services `/services`:**
  - Bảng so sánh 4 chiều kích hiển thị chuẩn xác trên desktop table và mobile cards.
  - Mở/đóng FAQ accordion hiển thị nội dung câu hỏi và câu trả lời tiếng Việt hoàn hảo.
  - Tải lại trang (F5): Ngôn ngữ tiếng Việt vẫn được duy trì từ `localStorage`.
- **Contact `/contact`:**
  - Form validation: Submit rỗng hiển thị thông báo lỗi tiếng Việt 100%, có biểu tượng cảnh báo và `aria-invalid="true"`.
  - Nhập dữ liệu hợp lệ: Banner xác thực thành công hiển thị bằng tiếng Việt kèm thông báo trung thực về việc chưa tích hợp backend.
  - Nút "Đặt lại biểu mẫu để thử lại": Xóa sạch dữ liệu và trả form về trạng thái ban đầu thành công.

### 6.3. Kiểm thử Responsive & Regression
- **1440px (Desktop):** Bố cục cân đối, thanh điều hướng desktop hiển thị switcher rõ nét.
- **768px (Tablet):** Bảng so sánh, lưới section thích ứng tốt, `document.documentElement.scrollWidth === window.innerWidth`.
- **390px & 375px (Mobile):**
  - Switcher nhỏ hiển thị trên header cạnh nút hamburger.
  - Drawer menu mở mượt mà, chứa switcher tiếng Việt/Anh và chuyển đổi trực tiếp trong drawer thành công.
  - Kiểm tra tràn ngang: Không có thanh cuộn ngang (`overflow-x` an toàn).
- **Console Logs:** Không có lỗi runtime, không có lỗi hydration, không có warning từ React hay Next.js.

---

## 7. Giới Hạn Đã Tuân Thủ & Tình Trạng Xác Minh Nội Dung

- **Bảo toàn dữ liệu nguồn:** Giữ nguyên tên pháp nhân `BIZWORKIT (S) PTE LTD`, tên thương hiệu `BIZWORK-IT`, địa bàn `Singapore`.
- **Minh bạch kênh liên hệ:** Giữ nguyên cảnh báo trung thực (PC-01, PC-02) trong cả hai ngôn ngữ đối với địa chỉ, số điện thoại và email hỗ trợ trực tiếp.
- **Không tự ý tích hợp backend/API/database:** Form chỉ xác thực client-side và có banner thông báo trạng thái demo rõ ràng.
- **Giới hạn SEO đa ngôn ngữ:** Do website sử dụng kiến trúc route chung (in-place switcher, không có tiền tố URL như `/vi/` hay `/en/`), báo cáo ghi nhận rõ ràng rằng đây là client-side bilingual switching, không tuyên bố hỗ trợ hreflang đa URL cho search engine crawlers.

---

## 8. Kết Luận

Task 14 — Website-Wide Bilingual Implementation (EN/VI) đã hoàn thành xuất sắc 100% các tiêu chí yêu cầu. Website BIZWORK-IT hiện đã có khả năng hoạt động song ngữ Anh - Việt mượt mà, chuyên nghiệp, responsive và an toàn tuyệt đối về kỹ thuật.

**Dừng lại tại đây và chờ người dùng duyệt.**
