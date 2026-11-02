# Bố cục học trên PC 2K và tablet ngang

## Vấn đề được sửa

Bản trước giới hạn trang ở 1600px rồi căn giữa khung bài khoảng 721px thêm lần nữa bên trong cột co giãn. Khoảng trống xuất hiện cả ngoài lẫn giữa các cột. Điều khiển đọc bị đẩy sang cột phải ở desktop. Tablet 1024–1180px vừa giữ thư viện cố định vừa có menu hai hàng, làm giảm cả chiều rộng và chiều cao dành cho bài.

## Thiết kế hiện tại

- Thanh đọc luôn nằm ngay trên bài: đóng/mở thư viện, từng phần/toàn bài, vị trí và tiến trình đọc. Chữ bài giữ 1rem.
- PC từ 1440 CSS px: thư viện, bài và mục lục nằm sát nhau với khoảng cách 24px. Bỏ giới hạn lồng nhau của bài; trên 2K khung bài khoảng 1008–1056px tùy độ rộng thư viện đã lưu. Toàn vùng học giới hạn 1664px để không kéo dòng chữ theo toàn bộ màn hình.
- Có thể ẩn thư viện trên PC. Lựa chọn được lưu riêng trong settings.libraryCollapsed; không ghi đè tiến độ học.
- Dưới 1440px: bài chiếm vùng chính, thư viện mở dạng bảng bên trái có nền che. Tìm kiếm luôn nằm trên danh sách chương cuộn riêng. Chọn bài sẽ đóng bảng; Escape, nút đóng và chạm bên ngoài đều đóng được. Bàn phím được giữ trong bảng khi mở.
- Tablet ngang 1024–1366px có menu chính một hàng cao 61–65px. Tiêu đề và thông tin chương dùng cùng một hàng khi đủ chỗ. Mục lục bài mở tại thanh đọc, tự đóng sau khi chọn phần.
- Công thức có nền nhấn; nút đi tiếp là hành động chính. Hoàn thành/luyện cả chương là nhóm hành động phụ.
- Bảng cuộn riêng; liên kết phần cũ, toàn bộ kiến thức và khóa dữ liệu ielts75_v1 được giữ.

## Kiểm tra

Đã xem trình duyệt Chromium tại 2560×1440, 1920px, tablet 1366px, 1194×834 và 1024×768; kiểm tra thêm 1440px và điện thoại 320/390px. Kiểm tra tìm không dấu, chọn phần trong chế độ toàn bài, vị trí phần không bị thanh đọc che, đóng/mở thư viện và mục lục, tìm kiếm chuyển bài. Năm bộ kiểm thử Node bảo vệ parser, nội dung, logic ứng dụng và dữ liệu học qua tải lại; smoke test thêm hành vi thư viện và đổi kích thước. Chưa thử trên tablet vật lý hoặc Safari/iPadOS.

## Nguồn thiết kế

- [web.dev — Responsive web design basics](https://web.dev/articles/responsive-web-design-basics)
- [web.dev — Macro layouts](https://web.dev/learn/design/macro-layouts)
- [MDN — Media query fundamentals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Media_queries)

Các breakpoint và kích thước là quyết định riêng cho nội dung này, không phải quy định của các nguồn trên.
