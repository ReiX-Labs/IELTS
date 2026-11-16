# Bố cục học trên PC 2K và tablet ngang

## Vấn đề được sửa

Bản trước giới hạn trang ở 1600px rồi căn giữa khung bài khoảng 721px thêm lần nữa bên trong cột co giãn. Khoảng trống xuất hiện cả ngoài lẫn giữa các cột. Điều khiển đọc bị đẩy sang cột phải ở desktop. Tablet 1024–1180px vừa giữ thư viện cố định vừa có menu hai hàng, làm giảm cả chiều rộng và chiều cao dành cho bài.

## Thiết kế hiện tại

- Thanh đọc luôn nằm ngay trên bài: đóng/mở thư viện, từng phần/toàn bài, vị trí và tiến trình đọc. Chữ bài 1.0625rem (17px) ở mọi kích thước màn hình.
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


## Sửa scroll và footer — 03/11/2026

Bằng chứng trước sửa: viewport 2560×1300, trang bài ngắn c3/8 cao 1435px; footer bắt đầu ở y=1336. Sidebar dùng gần trọn viewport nhưng padding main và footer vẫn cộng thêm bên ngoài. Mục lục phải trải qua ba hàng grid tự động khiến chiều cao dư chia vào tiêu đề/thanh đọc. Trang quiz thiếu main co giãn nên footer nằm ngay dưới câu hỏi.

Thay đổi:
- Body dùng flex theo cột, chiều cao tối thiểu 100dvh và main nhận phần chiều cao còn lại. Trang thường có footer cuối màn hình nếu nội dung ngắn, sau nội dung nếu dài; không dùng footer fixed che nội dung.
- Trang học trên PC từ 1440px rộng và 640px cao dùng khung vừa viewport (trước 17/11/2026 là từ 768px rộng). Main, grid và các vùng con có min-height:0; các hàng là max-content / max-content / minmax(0,1fr). Sidebar và bài lấy giới hạn chiều cao từ khung này, không cộng thêm một viewport.
- Bài, danh sách chương và mục lục cuộn độc lập, overscroll-behavior-y:contain ngăn cuộn lan sang vùng cha. Khung bài ngắn chỉ cao theo nội dung; bài dài cuộn trong chiều cao còn lại. Footer chiếm 49px trong bố cục.
- Điều hướng phần tính tọa độ theo vùng bài; đọc toàn bài theo dõi sự kiện scroll của vùng thực tế. Chuyển về từng phần đặt scrollTop=0; thay kích thước vẫn giữ phần đang đọc. Bỏ IntersectionObserver chỉ theo viewport cũ. Vùng bài có tabindex và tên để dùng bàn phím.
- Tablet, điện thoại hoặc cửa sổ thấp cuộn tài liệu tự nhiên.

Kiểm tra riêng: cuộn bánh xe qua cuối danh sách chương; cuộn toàn bài và Ctrl+End; đổi toàn bài/từng phần; footer trang quiz ngắn; mở mục trong bài ở tablet. Smoke test kiểm tra tọa độ vùng cuộn, cập nhật mục khi cuộn, cuối bài, reset scroll, gỡ listener và giữ nguyên dữ liệu học.

Nguồn đã đọc: [MDN Sticky footers](https://developer.mozilla.org/en-US/docs/Web/CSS/How_to/Layout_cookbook/Sticky_footers), [MDN overscroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior), [MDN position](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position). Các lựa chọn khung trang học ở trên là cách áp dụng cho dự án này.


## Thiết kế lại cho tablet và chế độ tối — 17/11/2026

Người dùng học chủ yếu trên tablet (cả dọc lẫn ngang) và đọc ở chế độ tối, thường trong phòng tối.

Vấn đề trước khi sửa:
- Từ 768px, trang học là khung cố định: menu chính và thanh đọc luôn chiếm phần trên, bài cuộn trong một vùng riêng nên vuốt dễ cuộn nhầm vùng và còn ít chiều cao để đọc.
- Nút trên thanh đọc và mục lục chữ 13px; chữ bài 16px.
- Mỗi loại hộp trong bài (mục tiêu, luyện tập, ví dụ, mẹo) có nền màu riêng, trang nhiều mảng màu nên rối mắt.
- Nút hoàn thành/luyện cả chương hiện ở mọi phần, cạnh nút đi tiếp.
- Tablet dọc giấu menu chính sau nút ☰.
- Nền tối xanh đen với chữ trắng xanh (tương phản khoảng 16:1) gây chói khi đọc trong phòng tối; chữ trắng trên nút xanh nhạt chỉ đạt 2.7:1.

Thay đổi:
- Dưới 1440px, menu trên cùng cuộn đi theo trang; chỉ thanh đọc mỏng dính lại ở mép trên. Cả trang cuộn tự nhiên, không còn vùng cuộn lồng nhau. Khung cố định chỉ còn trên PC từ 1440×640 (khớp BOUNDED_LAYOUT trong app.js).
- Bài nằm giữa màn hình, rộng tối đa 48rem; chữ bài 17px, giãn dòng 1.75. Thư viện vẫn mở dạng bảng trượt, mỗi chương cao 48px.
- Thanh đọc: nút cao 48px (điện thoại 44px), chữ 15px. Từng phần/toàn bài là một nút gạt hai lựa chọn. Mục lục bài là nút "Mục lục ▾" ở cuối thanh; mỗi mục cao 48px. Trên điện thoại, thanh đọc có hai hàng: thư viện và chế độ đọc ở hàng trên, vị trí và mục lục ở hàng dưới.
- Nút chuyển phần ghi "← Phần trước" / "Phần tiếp →" kèm tên phần, tự ẩn khi không còn phần.
- Nút hoàn thành/luyện cả chương chỉ hiện khi đã tới phần cuối hoặc đang xem toàn bài.
- Các hộp trong bài dùng chung một nền; chỉ nhãn nhỏ mang màu. Ví dụ, ghi chú và mẹo chỉ còn vạch màu bên trái.
- Tablet dọc (601–991px): menu chính luôn hiện ở hàng thứ hai, không cần mở ☰.
- Trang chủ: phần học hôm nay lên đầu; hướng dẫn bắt đầu thành mục thu gọn.
- Quiz: câu hỏi 19px, đáp án 17px, mỗi ô đáp án cao ít nhất 52px.
- Bảng màu tối mới: nền than ấm (#161514, thẻ #1e1d1b), chữ trắng ngà #e5dfd4, màu nhấn giảm độ rực. Tương phản chữ bài trên thẻ 12.7:1, chữ phụ trên nền hộp 6.0:1, chữ trên nút 5.5–6.4:1. Giao diện sáng giữ nguyên hình thức; chỉ thêm biến màu mới.

Kiểm tra: năm bộ kiểm thử Node đều đạt. Đã xem trên Chromium ở chế độ tối tại 820×1180 và 768×1024 (tablet dọc), 1180×820 và 1024×768 (tablet ngang), 375×812 (điện thoại), 1440×900 và 1920×1080 (PC). Các mục đã thử: thanh đọc dính khi cuộn, mở và chọn mục lục, đổi từng phần/toàn bài, thư viện dạng bảng trượt, nút chuyển phần có tên phần, nút hoàn thành chỉ ở phần cuối, trang chủ, quiz và giao diện sáng. Chưa thử trên tablet thật hoặc Safari/iPadOS.

Dữ liệu: khóa ielts75_v1 và cấu trúc dữ liệu học không đổi.
