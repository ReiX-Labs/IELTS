# 🎯 IELTS 7.5 — Grammar Trainer

Web ôn luyện **ngữ pháp IELTS** — điểm danh mỗi ngày, quiz theo ngày, flashcards và ôn lặp lại ngắt quãng để tiến bộ đều đặn.

🔗 **Bản demo:** https://reix-labs.github.io/IELTS/

---

## ✨ Tính năng

- **Điểm danh mỗi ngày** — chuỗi streak 🔥 và lịch heatmap kiểu GitHub.
- **Lộ trình học** — mỗi ngày một chương, tự động giao bài.
- **Quiz hằng ngày** — bộ câu hỏi cố định theo ngày, trộn nhiều dạng: chọn câu đúng, điền công thức, nhớ công thức, bài tập.
- **Ôn lặp lại (spaced repetition)** — chương đã học được xếp lịch ôn giãn dần; trả lời tốt thì giãn lịch, còn yếu thì ôn lại sớm.
- **Flashcards** — công thức ngữ pháp, động từ bất quy tắc, các cặp câu sai/đúng.
- **Ngân hàng bài tập** — nhiều bộ có đáp án đối chiếu từng câu.
- **Sổ từ vựng cá nhân** — thêm từ (đơn lẻ hoặc hàng loạt), ôn bằng flashcard theo SRS, từ đến hạn tự trộn vào quiz ngày.
- **Gamification** — XP, cấp độ theo band, huy hiệu, nhiệm vụ ngày, đếm ngược ngày thi.
- **Tìm kiếm toàn văn**, giao diện tối/sáng, **xuất/nhập tiến độ** (JSON) khi đổi máy.
- **Đọc từng phần hoặc xem toàn bài** — mục lục trong bài, vị trí đang đọc, nút trước/sau và liên kết đến từng mục.
- **30 hướng dẫn học theo chương** — mục tiêu → giải thích và ví dụ → tự luyện → tiêu chí tự kiểm tra; bảng tra cứu dài và đáp án có thể mở/thu gọn.
- **Tìm kiếm không dấu và bàn phím** — gõ ít nhất 2 ký tự; dùng phím mũi tên để chọn, Enter để mở, Escape để đóng kết quả.

## 🛠 Công nghệ

Web tĩnh thuần: HTML + CSS + JavaScript. Không framework, không bước build.

## 🚀 Chạy thử tại máy

```bash
python -m http.server 8000
# mở http://localhost:8000
```

> Tiến độ lưu bằng `localStorage` theo từng trình duyệt/máy. Dùng nút **Xuất/Nhập tiến độ** ở trang chủ khi chuyển máy.

Vị trí và chế độ đọc được lưu riêng trong `settings` của dữ liệu cũ `ielts75_v1`. Đọc/chuyển phần không tự đánh dấu đã học, cộng XP hoặc đổi lịch SRS. Mức Band trong giao diện là cấp độ XP, không thay cho đánh giá IELTS.

## Kiểm tra tại máy

Không có bước build. Chạy các bộ kiểm tra bằng Node.js:

```bash
node js/test_parser.js
node js/test_md.js
node js/test_app_logic.js
node js/test_dom_smoke.js
node js/test_content_contract.js
```

`test_content_contract.js` đối chiếu nội dung đang sửa với Git HEAD (hoặc revision truyền vào), bảo vệ mã chương/mục và toàn bộ dữ liệu quiz, flashcard, bài tập. `test_dom_smoke.js` kiểm tra luồng học/ôn và tải lại với dữ liệu mẫu; vẫn cần xem trình duyệt để kiểm tra bố cục responsive.

---

<p align="center"><sub>Sản phẩm của <strong>ReiX&nbsp;Labs</strong> · © 2026 ReiX Labs</sub></p>
