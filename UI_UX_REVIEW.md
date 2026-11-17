# ĐÁNH GIÁ CHUYÊN SÂU UI/UX WEBSITE HIỆN TẠI (UI/UX REVIEW)
**Dự án:** BIZWORK-IT Website Redesign  
**Đối tượng đánh giá:** [https://bizwork-it.com/](https://bizwork-it.com/)  
**Ngày thực hiện:** 24/10/2026  
**Chuyên môn:** Senior UI/UX Engineer & Frontend Architect

---

## 1. TỔNG QUAN HIỆN TRẠNG GIAO DIỆN

Website hiện tại của BIZWORK-IT được xây dựng trên nền tảng GoDaddy Website Builder (mẫu template cơ bản). Mặc dù giao diện đảm bảo tính sạch sẽ và tải nhanh nhờ dung lượng nhẹ, cấu trúc và phong cách thị giác hiện tại đã bộc lộ nhiều điểm hạn chế so với tiêu chuẩn của một doanh nghiệp cung cấp dịch vụ CNTT (IT Services & Solutions) chuyên nghiệp tại Singapore.

---

## 2. PHÂN TÍCH CHI TIẾT CÁC YẾU TỐ UI/UX

### 2.1. Bố cục và cấu trúc các Section (Layout Architecture)
- **Cấu trúc tuyến tính đơn điệu:** Website chỉ có 3 khối nội dung trên cùng một trang (Hero -> 3 Thẻ About/Dịch vụ -> Form Liên hệ). Bố cục này phù hợp với landing page cá nhân hoặc micro-business, nhưng chưa thể hiện được năng lực của một đơn vị dịch vụ CNTT doanh nghiệp.
- **Thiếu các khối nội dung B2B thiết yếu:**
  - Không có danh sách đối tác / công nghệ hỗ trợ (Tech Stack: Windows, Linux, AWS, Cisco, SQL Server...).
  - Không có quy trình làm việc (How We Work / 4-step Process).
  - Không có số liệu thực tế / Chỉ số niềm tin (Trust Metrics: thời gian phản hồi, tỷ lệ uptime, số năm kinh nghiệm).
  - Không có câu hỏi thường gặp (FAQ) để giải đáp thắc mắc về chi phí và gói dịch vụ outsourcing.

### 2.2. Typography (Nghệ thuật chữ & Cấp bậc thị giác)
- **Bộ font đang sử dụng:** Kết hợp font `Karla` (Sans-serif) với `Old Standard TT` (Serif cổ điển).
- **Hạn chế:** Font serif cổ điển (`Old Standard TT`) tạo cảm giác xuất bản báo chí/văn học truyền thống, không toát lên được tinh thần công nghệ cao, hiện đại và bảo mật.
- **Cấp bậc tiêu đề (Heading Hierarchy) lộn xộn:**
  - Text logo thương hiệu bị gán thẻ `<h3>`.
  - Khẩu hiệu chính ở Hero bị nhân đôi 2 thẻ `<h1>`.
  - Tiêu đề section là `<h2>`, nhưng các tiêu đề tính năng bên dưới lại nhảy xuống `<h4>` (bỏ qua `<h3>`).
  - *Định hướng:* Cần chuẩn hóa về bộ font Sans-serif công nghệ hiện đại (như `Inter` hoặc `Plus Jakarta Sans`), đảm bảo 1 thẻ `<h1>` duy nhất, các section là `<h2>` và các thẻ con là `<h3>`.

### 2.3. Màu sắc & Tính nhất quán thương hiệu (Color Palette & Branding)
- **Bảng màu thiếu điểm nhấn:**
  - Màu chủ đạo khai báo trong manifest là `#8d95a0` (xám xi măng trung tính).
  - Nền trang là màu trắng `#ffffff` đơn thuần, các nút bấm là màu đen chữ trắng kiểu đơn sắc (monochrome).
  - Thiếu hoàn toàn một màu nhận diện thương hiệu công nghệ (Brand Accent Color) như Xanh công nghệ (Electric / Royal Blue `#2563EB`, `#1E40AF`) hoặc Xanh Cyan/Teal để tạo điểm nhấn thị giác và cảm giác tin cậy (Trust & Security).
- **Nhận diện thương hiệu:** Chưa có biểu tượng logo (Symbol/Icon) chính thức, chỉ là text gõ chữ in hoa `BIZWORK-IT`.

### 2.4. Hình ảnh & Media (Imagery Quality)
- **Lạm dụng ảnh Stock mặc định:** Cả 4 hình ảnh trên website đều lấy từ kho ảnh mẫu của GoDaddy (`isteam/stock`).
- **Hình ảnh mang tính chung chung:** Ảnh bảng mạch điện tử mờ ở Hero và ảnh bắt tay/biểu đồ không mang nét đặc thù thực tế của đội ngũ kỹ sư tại Singapore.
- **Rủi ro phụ thuộc bản quyền:** Ảnh lưu trữ trên CDN GoDaddy (`img1.wsimg.com`), khi chuyển đổi nền tảng hosting độc lập cần thay thế toàn diện để tránh vi phạm giấy phép và đứt link.

### 2.5. Trải nghiệm tương tác & Biểu mẫu (UX & Form Journey)
- **Nút CTA (Call to Action):** Nút `"Get in Touch"` hoạt động mượt mà khi cuộn trang, nhưng thiết kế dạng khối chữ nhật đen phẳng, thiếu vi tương tác (micro-interactions) như hover gradient, elevation bóng đổ nhẹ hay icon mũi tên chỉ hướng.
- **Biểu mẫu liên hệ:**
  - Form quá chung chung: Không có trường chọn nhu cầu dịch vụ (Service Category) khiến khách hàng doanh nghiệp khó phân loại yêu cầu.
  - Trường đính kèm tệp (`Attach Files`) chưa hiển thị thông tin giới hạn dung lượng tệp (Max file size: 5MB hay 10MB) gây lúng túng cho người dùng.

### 2.6. Khả năng tiếp cận (Accessibility / a11y)
- **Thiếu Alt Text trên toàn bộ ảnh nội dung:** Thuộc tính `alt=""` trên cả 3 ảnh dịch vụ khiến người dùng khiếm thị sử dụng Screen Reader không thể nắm bắt được ngữ cảnh hình ảnh.
- **Hỗ trợ bàn phím:** Điều hướng Tab hoạt động ở mức cơ bản, các nút bấm nhận focus indicator, nhưng chưa có liên kết nhảy nhanh nội dung (`Skip to main content`).

### 2.7. Tối ưu hóa SEO & Trải nghiệm tìm kiếm
- **Kiến trúc One-page cản trở SEO chuyên sâu:** Do chỉ có 1 URL duy nhất (`https://bizwork-it.com/`), website không thể tối ưu thẻ title, meta description và nội dung độc lập cho các từ khóa dịch vụ tiềm năng như *"IT Outsourcing Singapore"*, *"Managed IT Support for SMBs"*, *"Network Infrastructure Singapore"*.

---

## 3. BẢNG PHÂN LOẠI CÁC PHÁT HIỆN THEO MỨC ĐỘ ƯU TIÊN

| Phân loại | Phát hiện cụ thể | Bằng chứng / Nguồn tham chiếu | Mức độ ưu tiên |
| :--- | :--- | :--- | :---: |
| **Vấn đề nghiêm trọng cần xử lý** | **1. Không có hệ thống điều hướng đa trang:** Thiếu hoàn toàn menu dẫn tới các trang About, Services, Contact chuyên sâu. | `AUDIT_REPORT.md` (Task 01) & `FUNCTIONALITY_CHECKLIST.md` (Task 03) | **P1 — Bắt buộc** |
| | **2. Rủi ro bản quyền và CDN hình ảnh GoDaddy:** 4 ảnh stock lưu trên CDN GoDaddy sẽ bị ảnh hưởng khi tách khỏi hệ thống cũ. | `CONTENT_INVENTORY.md` (Task 02) | **P1 — Bắt buộc** |
| | **3. Thiếu thông tin liên hệ trực tiếp:** Không có số điện thoại hotline, email trực tiếp và địa chỉ văn phòng cụ thể. | `CONTENT_INVENTORY.md` (NC-01, NC-02) | **P1 — Bắt buộc** |
| **Vấn đề nên cải thiện** | **4. Nâng cấp Typography & Màu sắc công nghệ:** Thay thế font serif cổ điển bằng font sans-serif hiện đại và xây dựng bảng màu công nghệ có chiều sâu. | Phân tích Typography mục 2.2 | **P2 — Khuyến nghị cao** |
| | **5. Tối ưu Accessibility (a11y):** Bổ sung đầy đủ thẻ `alt` mô tả ảnh, chuẩn hóa contrast ratio $\ge 4.5:1$ theo WCAG 2.1 AA. | DOM inspection & Accessibility audit | **P2 — Khuyến nghị cao** |
| | **6. Tối ưu SEO đa trang:** Phân tách thành 4 route riêng biệt với thẻ Title, Meta Description và OpenGraph chuyên biệt. | Sitemap & Google Search Index analysis | **P2 — Khuyến nghị cao** |
| | **7. Thêm Micro-interactions:** Bổ sung hiệu ứng hover, transition mượt mà cho thẻ card và nút bấm. | Functionality testing Task 03 | **P3 — Cải thiện UX** |
| **Thành phần có thể giữ lại** | **8. Thông điệp cốt lõi:** *"We make technology accessible!"* và *"Professional Technology Assistance"*. | `TXT-002`, `TXT-003` trong `CONTENT_INVENTORY.md` | Giữ nguyên |
| | **9. Ba trụ cột dịch vụ cốt lõi:** Technical Experience, High ROI, Satisfaction Guaranteed. | `TXT-007` đến `TXT-012` trong `CONTENT_INVENTORY.md` | Kế thừa & Mở rộng |
| | **10. Pháp nhân doanh nghiệp:** BIZWORKIT (S) PTE LTD. | `TXT-023` trong `CONTENT_INVENTORY.md` | Giữ nguyên |
| **Nội dung cần xác nhận** | **11. Địa chỉ chi tiết, Hotline & Email nhận thư:** Cần chủ dự án cung cấp thông tin chính thức. | `NC-01`, `NC-02` trong `CONTENT_INVENTORY.md` | Chờ xác nhận |
| | **12. File Logo Vector thương hiệu:** Cung cấp file gốc hoặc phê duyệt thiết kế logo chữ mới. | `NC-04` trong `CONTENT_INVENTORY.md` | Chờ xác nhận |
| **Giới hạn chưa thể kiểm chứng** | **13. Quy trình backend của Form liên hệ cũ:** Luồng chuyển tiếp thư thực tế của GoDaddy. | `UNV-01` trong `FUNCTIONALITY_CHECKLIST.md` | Độc lập hóa ở GĐ6 |
