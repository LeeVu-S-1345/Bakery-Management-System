# Dữ liệu mẫu tạm thời cho Frontend

Frontend đã được cấu hình để sử dụng dữ liệu mẫu (mock data) để có thể chạy mà không cần Backend API.

## Cách sử dụng

1. **Chạy Frontend:**
   ```bash
   npm run dev
   ```

2. **Mock data sẽ tự động được sử dụng** khi:
   - `VITE_BACKEND_URL` không được set hoặc rỗng
   - Hoặc `VITE_USE_MOCK=true` trong file `.env`

## Tài khoản đăng nhập mẫu

### Customer (Khách hàng)
- **Email:** `customer@test.com`
- **Password:** `123456`

### Employee (Nhân viên)
- **Email:** `employee@test.com`
- **Password:** `123456`

### Manager/Admin (Quản lý)
- **Email:** `manager@test.com`
- **Password:** `123456`

## Dữ liệu mẫu có sẵn

### Products (Sản phẩm)
- 20 sản phẩm mẫu với đầy đủ thông tin (id, name, category, price, stock, description, image)
- Bao gồm các danh mục: Mousse, Birthday Cake, Cream Choux, Cup Cake, Tin Box Cake

### Employees (Nhân viên)
- 5 nhân viên mẫu với đầy đủ thông tin

### Orders (Đơn hàng)
- 5 đơn hàng mẫu với timeline và trạng thái khác nhau

### Menu
- Menu được nhóm theo category với các sản phẩm tương ứng

## Cấu trúc Mock Data

Tất cả mock data được định nghĩa trong:
- `src/data/mockData.js` - Chứa tất cả dữ liệu mẫu
- `src/lib/mockApi.js` - Service xử lý các API calls và trả về mock data

## Cách hoạt động

1. Các pages sẽ check `mockApi.shouldUseMock()` trước khi gọi API
2. Nếu `useMockData()` trả về `true`, sẽ sử dụng `mockApi` thay vì gọi API thật
3. Nếu API thật fail, sẽ tự động fallback về mock data

## Lưu ý

- Mock data được lưu trong memory, nên các thay đổi (thêm/sửa/xóa) sẽ chỉ tồn tại trong session hiện tại
- Khi refresh trang, dữ liệu sẽ reset về ban đầu
- Tất cả các API endpoints đã được mock, bạn có thể test toàn bộ chức năng của Frontend

## Tắt/Bật Mock Mode

Để tắt mock mode và sử dụng API thật:
1. Set `VITE_BACKEND_URL` trong file `.env` với URL của Backend
2. Hoặc set `VITE_USE_MOCK=false` trong file `.env`

