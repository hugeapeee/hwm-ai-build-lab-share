# HWM AI Build Lab - Checklist setup Codex

Mục tiêu: mỗi "đứa cầm máy" kết thúc buổi 2A với một máy có thể tìm và đọc thông tin từ Klaviyo hoặc Google Drive.

## 1. Mở được Codex

- [ ] Đã cài và đăng nhập Codex Desktop.
- [ ] Tạo được một task thử.
- [ ] Biết cách đính kèm file, ảnh hoặc link vào task.
- [ ] Không dán API key, token hoặc mật khẩu vào chat.

## 2. Chỉnh Codex settings

- [ ] Model: giữ model mặc định của Codex.
- [ ] Reasoning effort: `Medium` cho bài thường; chỉ chuyển `High` khi lên plan hoặc debug khó.
- [ ] Quyền thay đổi: Codex phải hỏi trước khi sửa, gửi, schedule hoặc publish.
- [ ] Thư mục làm việc: chỉ mở thư mục chứa bài build của team.
- [ ] Kết nối dữ liệu: chỉ bật nguồn cần cho bài test.

## 3. Nối một nguồn dữ liệu

Chọn ít nhất một nguồn để test:

- [ ] Klaviyo MCP ở chế độ chỉ đọc.
- [ ] Google Drive connector với đúng phạm vi file được cấp.
- [ ] Codex tìm và đọc được một campaign/email hoặc file test.
- [ ] Xác nhận Codex chưa có quyền sửa, schedule, send hoặc chia sẻ.

Nếu kết nối chưa chạy:

1. Ghi lại lỗi hoặc quyền còn thiếu.
2. Không chuyển sang dùng tài khoản live theo cách thiếu kiểm soát.
3. Tiếp tục setup cùng người hỗ trợ.

## 4. Chạy bài test

Mở một task mới và gửi:

```text
Chọn một nguồn để test:

KLAVIYO
Tìm campaign/email [TÊN]. Cho biết status, subject, audience và link mở lại.

GOOGLE DRIVE
Tìm file [TÊN]. Cho biết loại file, ngày cập nhật, nội dung chính và link mở lại.

Chỉ đọc. Không sửa hay chia sẻ.
```

Đạt khi Codex:

- [ ] Tìm đúng campaign/email hoặc file.
- [ ] Trả đúng các thông tin được hỏi.
- [ ] Có link hoặc nguồn mở lại.
- [ ] Không thay đổi dữ liệu.

## 5. Các kết nối khác

Google Drive, Figma, Slack, Trello, Gmail, Calendar, Git hoặc Node chỉ cài khi bài build thật sự cần.

## 6. Chốt trước khi về

- [ ] Đứa cầm máy biết cách mở lại task và các kết nối.
- [ ] Quyền của từng connector đã rõ.
- [ ] Phần chưa nối được đã có người xử lý tiếp.
- [ ] Team biết Skill chưa phải điều kiện của buổi này. Prompt chạy ngon và kết quả đủ ưng rồi mới đóng gói thành Skill.
