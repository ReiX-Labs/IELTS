# Bố cục trang học

## Chẩn đoán

Hai bản sửa trước nhầm tỷ lệ hiển thị với cách phân bố nội dung. Tăng chữ theo viewport và kéo card hết màn hình không giải quyết được việc mục lục, nút đọc và trạng thái cùng chiếm một chồng lớn trước bài. Chỉ kiểm tra không tràn ngang cũng chưa đủ để đánh giá responsive.

## Quyết định thiết kế

- Chữ bài học giữ `1rem`; tôn trọng thiết lập cỡ chữ và zoom của người dùng.
- Tiêu đề, bài, nút trước/sau dùng chung một khung đọc có chiều dài dòng giới hạn. Không đặt một dải chữ hẹp trong card khổng lồ.
- Dưới `64rem`: một cột, tìm kiếm/chọn chương gọn, mục lục bài mở theo yêu cầu.
- Từ `64rem`: đủ chỗ cho danh sách chương và bài đọc cùng xuất hiện.
- Từ `88rem`: thêm cột “Trong bài” để chọn phần và thấy vị trí đọc; dùng cùng mục lục, không nhân đôi ID.
- Các mốc trên dựa trên diện tích cần cho ba vùng của website này; không phải danh sách kích thước thiết bị hay yêu cầu từ nguồn tham khảo.
- Bảng dài cuộn trong vùng riêng. Chiều rộng mục lục đã lưu được giữ, nhưng bị giới hạn khi cửa sổ hẹp.

## Cách kiểm tra

Kiểm tra hai phía của từng breakpoint, màn hình 2560px, màn hình 320px và cửa sổ thu nhỏ với mục lục đã kéo rộng. Ngoài overflow, cần kiểm tra số cột, cỡ chữ bài không đổi theo viewport, chiều rộng khung đọc, khả năng mở/đóng menu bằng bàn phím và vị trí phần đang đọc sau đổi kích thước. Các kiểm thử logic vẫn phải bảo vệ XP, SRS, từ vựng và trạng thái hoàn thành.

Kết quả trong trình duyệt: 320, 390, 768, 1023, 1024, 1407, 1408, 1920 và 2560px đều không tràn trang; chữ bài giữ 16px với thiết lập trình duyệt mặc định. Khung bài tối đa khoảng 721px và tự thu khi hẹp hơn. Đã kiểm tra menu bằng bàn phím, tìm không dấu, bảng cuộn riêng và mở đúng mục trong chế độ toàn bài ở ba bố cục. Chưa kiểm tra điện thoại vật lý và zoom trình duyệt 200%.

## Nguồn

- [web.dev — Responsive web design basics](https://web.dev/articles/responsive-web-design-basics): chọn breakpoint theo nhu cầu nội dung và kiểm soát độ dài dòng.
- [web.dev — Macro layouts](https://web.dev/learn/design/macro-layouts): tổ chức thứ tự một cột trước, sau đó bố trí các vùng bằng Grid/Flexbox.
- [MDN — Media query fundamentals](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Media_queries): đổi bố cục khi nội dung bắt đầu quá dài hoặc các cột bị ép chật.
