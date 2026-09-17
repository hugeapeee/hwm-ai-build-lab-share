# Bảng chấm Adoption — 70 điểm

BGK: Hiếu, Emma, Điệp. Kỳ bằng chứng: 10–23/9/2026. Final: 24/9/2026.

[Form chấm](https://docs.google.com/forms/d/e/1FAIpQLSdVem8s1PkDv8g6Lb3YyGGUqr1sRRBrb8DD-_CevyD9z-qkGw/viewform) · [Chỉnh sửa / Responses](https://docs.google.com/forms/d/1zha11BmkLTOHcqBU2VaAE0blqQc8zdAbN-3oXTGhLJc/edit)

Chọn mức cao nhất mà bằng chứng đáp ứng đầy đủ. Mỗi tiêu chí có lựa chọn **Chưa đủ bằng chứng — chưa chốt điểm**. Khi chọn mục này, nêu phần còn thiếu và giữ trống tổng chính thức đến khi BGK đối chiếu. Thiếu dữ liệu không đồng nghĩa 0; 0 dùng khi có dữ liệu xác nhận kết quả ở mức 0.

Các mức là căn cứ chấm, không phải yêu cầu phải có nhiều user hoặc nhiều lượt chạy như nhau giữa mọi tool. Không tính lượt test/rerun cùng một case thành case dùng thật mới. Nếu N=0 hoặc chưa có cơ hội dùng lại, ghi rõ. Mẫu nhỏ thì nêu giới hạn, không suy rộng.

## 1. Dùng trong việc thật — 25 điểm

Căn cứ: log, số case đủ điều kiện N, số case đã dùng U, tỷ lệ U/N, output và xác nhận người dùng.

| Điểm | Mức |
|---:|---|
| 0 | Có cơ hội dùng nhưng chưa dùng trong case thật |
| 5 | Có 1 case thật; chưa chứng minh dùng tiếp |
| 10 | Có nhiều case thật nhưng dùng rời rạc |
| 15 | Đã vào workflow ở một phần case phù hợp; có U/N |
| 20 | Dùng ở phần lớn case phù hợp; có log và output |
| 25 | Dùng ổn định ở phần lớn case phù hợp; người dùng xác nhận |

## 2. Dùng lại và tự chủ — 15 điểm

Căn cứ: ai quay lại, ngày nào, tác vụ nào, có cần nhắc hoặc builder chạy hộ. Xét người dùng mục tiêu; tool cá nhân không bắt buộc nhiều người dùng.

| Điểm | Mức |
|---:|---|
| 0 | Có cơ hội nhưng không quay lại; chưa hình thành cách dùng |
| 3 | Có dùng lại nhưng builder phải chạy hộ |
| 6 | Có dùng lại nhưng phải nhắc hoặc hỗ trợ nhiều |
| 9 | Người dùng tự chạy được; đôi lúc cần nhắc hoặc hỗ trợ |
| 12 | Chủ động quay lại ở nhiều thời điểm; ít hỗ trợ |
| 15 | Tự chủ và dùng đều khi có việc; người dùng xác nhận sẽ tiếp tục |

## 3. Hiệu quả có bằng chứng — 20 điểm

Căn cứ: case trước/sau tương đương, số mẫu, thời gian cả kiểm tra/sửa lỗi, hoặc lỗi thật được xác nhận đã bắt/giảm, hoặc giảm rework. Chọn chỉ số phù hợp; không buộc mọi tool phải tiết kiệm thời gian. Không coi ước lượng là số đo.

| Điểm | Mức |
|---:|---|
| 0 | Dữ liệu cho thấy chưa cải thiện hoặc làm việc tệ hơn |
| 4 | Mới có cảm nhận hoặc ước lượng; chưa có đối chiếu |
| 8 | Có 1 case trước/sau cho thấy cải thiện |
| 12 | Có nhiều case tương đương, nêu số mẫu và cách đo |
| 16 | Cải thiện lặp lại; đã tính công kiểm tra/sửa và case thất bại |
| 20 | Cải thiện lặp lại, có người dùng xác nhận, nêu rõ giới hạn |

## 4. Bàn giao và duy trì — 10 điểm

Căn cứ: owner nhận trách nhiệm, người dùng mở được tool, hướng dẫn, lỗi đã biết, bước người duyệt, fallback và việc tiếp theo có deadline.

| Điểm | Mức |
|---:|---|
| 0 | Chưa có owner hoặc cách vận hành tiếp |
| 2 | Có owner nhận trách nhiệm, bàn giao còn thiếu |
| 4 | Owner và người dùng đã có quyền truy cập, có hướng dẫn |
| 6 | Có thêm lỗi đã biết, bước duyệt và cách quay về quy trình cũ |
| 8 | Người dùng đã thử bàn giao; có next action và deadline |
| 10 | Bàn giao đã thử, fallback đã kiểm tra, owner cam kết duy trì |

## Tổng hợp và xử lý thiếu bằng chứng

1. Ba BGK chấm độc lập, một phiếu/team/người; phiếu mới thay phiếu cũ phải được xác định rõ.
2. Mỗi phiếu có 4 điểm; tổng tối đa 70. Lấy phần số đầu mỗi lựa chọn khi tổng hợp. Form không tự cộng điểm.
3. Có mục “Chưa đủ bằng chứng” thì không tự quy 0 hoặc bỏ qua mục đó để lấy trung bình.
4. Đối chiếu phần thiếu với team; nếu hết thời gian vẫn chưa đủ, đánh dấu kết quả tạm thời/chưa chốt, không xếp như kết quả đã đủ bằng chứng.
5. Sau khi đủ ba phiếu hợp lệ: Adoption = trung bình ba tổng trên 70. Chung cuộc = Demo đã quy về 30 + Adoption.
6. Adopt / Revise / Keep testing / Deprecate / Kill là quyết định vận hành riêng; BGK và owner chốt, không tự suy ra từ thứ hạng.

Form yêu cầu đăng nhập Google và ghi nhận email theo cài đặt hiện tại của tài khoản; không giới hạn một phản hồi; kết quả tổng hợp không hiển thị cho người trả lời.
