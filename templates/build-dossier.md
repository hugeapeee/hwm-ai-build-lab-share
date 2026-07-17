# Bộ hồ sơ build

Team:
Vấn đề muốn xử:
Ngày:

## Vai trò

- Đứa cầm máy:
- Đứa biết chuyện:
- Đứa kiếm chuyện:

## 1. Workflow hiện tại - phần quan trọng nhất

Mô tả theo công thức:

> Ai -> làm gì -> bằng tool nào -> tạo ra gì -> chuyển cho ai

| Bước | Ai làm | Làm gì | Tool đang dùng | Input | Output / bàn giao cho ai | Chỗ đau |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

### Một case thật gần đây

Điều gì đã xảy ra từ đầu đến cuối?


## 2. Vấn đề muốn xử

- Đoạn nào đang đau nhất?
- Đau vì chậm, lặp lại, thiếu thông tin hay dễ sai?
- Hiện tại team đang chữa cháy thế nào?


## 3. Dữ liệu để build - đưa cho Codex

- 2-3 input thật đã ẩn thông tin nhạy cảm:
- Output đúng tương ứng để làm mẫu:
- Checklist, SOP hoặc quy tắc đang áp dụng:


## 4. Thế nào là xài được? - dùng để chấm

Chỉ coi là xài được khi chạy các case dưới đây và đạt điều kiện đã chốt.

| Case đem chạy | Input | Kết quả phải ra | Đạt khi |
|---|---|---|---|
| Case bình thường | | | |
| Case thiếu thông tin | | | |
| Case dễ làm AI sai | | | |

## 5. Rủi ro và điểm review

- AI có thể sai kiểu gì?
- Ai cần kiểm tra trước khi output được dùng thật?
- Output nào tuyệt đối không được tự gửi khách hoặc publish?

## Prompt để Codex lên plan

```text
Đọc Bộ hồ sơ build dưới đây. Chưa bắt đầu code.

1. Mô tả lại workflow hiện tại theo: ai làm, từng bước, tool, input, output và điểm bàn giao.
2. Chỉ ra các giả định và context còn thiếu.
3. Xác định bước phù hợp nhất để AI can thiệp và human review gate cần giữ.
4. Đề xuất phiên bản đầu tiên đơn giản nhất và những thứ chưa cần làm.
5. Đề xuất kế hoạch build cùng 3 test case.

Nếu chưa đủ thông tin, hãy hỏi trước khi lên plan.
```
