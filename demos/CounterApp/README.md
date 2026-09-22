# CounterApp — theo dõi quá trình thực thi

App có hai bộ đếm số, mỗi bộ có nút Tăng và Reset. Local dùng `useReducer`, global dùng Redux Toolkit. Đây là bộ đếm theo thao tác, không tự tăng theo thời gian.

## Chạy ứng dụng

Trong thư mục `demos/CounterApp`, chạy `npm start`, rồi mở trên thiết bị hoặc trình giả lập tương thích với Expo SDK của dự án.

## Các khái niệm

- **State**: dữ liệu hiện tại, ví dụ số đếm là 2.
- **Action**: thông điệp mô tả yêu cầu, ví dụ `{ type: 'increment' }`.
- **Dispatch**: gửi action đến nơi xử lý.
- **Reducer**: hàm tính state mới từ state hiện tại và action.
- **Render**: React gọi component để tính giao diện cần hiển thị.
- **Store**: nơi Redux giữ global state.

Quy luật chung: **Nhấn nút → dispatch action → reducer tính state mới → giao diện hiển thị state mới.**

## 1. Khi mở app

1. `index.js` import `App`. Các module mà `App` phụ thuộc được nạp trước khi sử dụng.
2. `store/counterSlice.js` gọi `createSlice`, tạo reducer và các hàm tạo action `increment`, `reset`.
3. `store/store.js` gọi `configureStore`. Global state ban đầu là `{ counter: { value: 0 } }`. Key `counter` trong cấu hình store quyết định đường dẫn `state.counter.value`.
4. `registerRootComponent(App)` đăng ký component gốc với Expo.
5. Khi React render `App`, `<Provider store={store}>` cung cấp store cho cây component bên trong.
6. `LocalCounter` gọi `useReducer(localReducer, 0)`: lần đầu `count = 0`, kèm hàm dispatch riêng của local.
7. `GlobalCounter` dùng `useSelector` đọc `state.counter.value`, bằng 0; `useDispatch` lấy hàm dispatch của Redux store.
8. Hai bộ đếm đều hiển thị 0. Các hàm trong `onPress={() => ...}` chỉ được truyền cho nút, chưa chạy.

## 2. Nhấn Tăng Local

```text
onPress
  → dispatch({ type: 'increment' }) của useReducer
  → localReducer(state hiện tại, action)
  → case 'increment': return state + 1
  → React render LocalCounter với count mới
  → số Local trên màn hình tăng
```

Ví dụ local đang là 0, reducer trả về 1. Redux store không nhận action này nên global giữ nguyên. Số 0 trong `useReducer(localReducer, 0)` chỉ là giá trị khởi tạo; render lại không đặt count về 0.

## 3. Nhấn Tăng Global

```text
onPress
  → increment() tạo action có type 'counter/increment'
  → dispatch(action) của Redux
  → store chuyển action đến reducer
  → reducer của slice tăng value thêm 1
  → store lưu state mới và thông báo cho các bên đăng ký
  → useSelector thấy giá trị được chọn thay đổi
  → React render GlobalCounter với count mới
```

`increment()` chỉ tạo action; `dispatch(increment())` mới gửi action tới store. Trong slice, `state.value += 1` sửa một bản draft do Immer quản lý; Redux Toolkit tạo state mới từ draft đó. Không áp dụng cách sửa object trực tiếp này cho reducer thông thường của `useReducer`.

## 4. Nhấn Reset

- **Reset Local** gửi `{ type: 'reset' }` đến localReducer, trả về 0. Global giữ nguyên.
- **Reset Global** gửi action có type `counter/reset` đến Redux store, đặt `value = 0`. Local giữ nguyên.
- Nhấn lần lượt cả hai nút thì cả hai giá trị đều về 0.

## 5. Vì sao độc lập?

| Đặc điểm | LocalCounter | GlobalCounter |
| --- | --- | --- |
| Nơi giữ state | React, gắn với instance LocalCounter | Redux store |
| Đọc dữ liệu | count từ useReducer | useSelector |
| Hàm dispatch | Từ useReducer | Từ useDispatch |
| Reducer xử lý | localReducer | counterSlice.reducer |

Hai biến cùng tên `dispatch` thuộc hai component khác nhau và gửi tới hai nơi khác nhau. Provider không tự chuyển local state vào Redux. Global nghĩa là có thể chia sẻ qua store; không có nghĩa là tự động làm thay đổi mọi state trong app.

## 6. Kiểm tra theo thứ tự

Khởi động app mới, sau đó thực hiện liên tiếp:

| Thao tác | Local mong đợi | Global mong đợi |
| --- | --- | --- |
| Ban đầu | 0 | 0 |
| Tăng Local | 1 | 0 |
| Tăng Global | 1 | 1 |
| Tăng Local lần nữa | 2 | 1 |
| Reset Local | 0 | 1 |
| Tăng Local | 1 | 1 |
| Reset Global | 1 | 0 |
| Reset Local | 0 | 0 |

Bảng này kiểm tra cả tăng, reset và tính độc lập theo hai chiều. Có thể đặt breakpoint tại các `onPress` và reducer để quan sát action, state đầu vào và state đầu ra.

Đọc `count` ngay sau dispatch trong cùng callback vẫn có thể thấy giá trị của lần render cũ. Hãy quan sát lần render tiếp theo. Khi reset một số đã bằng 0, React có thể bỏ qua cập nhật giao diện vì giá trị không đổi.

## Tài liệu đối chiếu

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [React: useReducer](https://react.dev/reference/react/useReducer)
- [Redux Toolkit: Quick Start](https://redux-toolkit.js.org/tutorials/quick-start)
