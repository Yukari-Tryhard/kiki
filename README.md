# Eng installation steps

## Step 1: Sign Up for mongoose and allow your IP address to access database

Go to https://account.mongodb.com

Sign up an account then to go `Network Access` on the left side

![image](https://user-images.githubusercontent.com/61675970/230927457-91ac83c3-547a-4005-9787-e4dca3a73718.png)

Click on `Add current IP Address` 

## Step 2: Sign Up for Cloudinary Account

Go to https://cloudinary.com/

Sign up an account with **Google** is the easiest so far for me

## Step 3: Edit .env value

Go to backend_kiki/.env

Change mongo db value to your value

`MONGO_DB_USER = your_user_name`
`MONGO_DB_PASSWORD = your_password`

If you are unsure about it. You can check it in `Database Access` on your left side panel and then click on `Edit`

![image](https://user-images.githubusercontent.com/61675970/230929106-24486420-eefe-405c-91ea-5953967b1909.png)

Also you need to change `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`

You can get those values from https://console.cloudinary.com/console after you logged in

## Step 4: Go to `client_kiki/src/app/axiosClient.js` and uncomment localhost:5000

You should have your code looks like image below

![image](https://user-images.githubusercontent.com/61675970/230930058-8258bc5c-3bcd-4437-b8ef-87b4b26c3217.png)

## Step 5: Install node_modules

Go to `client_kiki` and type `npm install -f`
Go to `backend_kiki` and type `npm install -f`
Go to `admin_kiki` and type `npm install -f`

# Hướng dẫn cách cài bằng tiếng Việt

## Bước 1: Đăng ký mongoose và cho phép địa chỉ IP của bạn truy cập cơ sở dữ liệu

Truy cập https://account.mongodb.com

Đăng ký một tài khoản sau đó chọn vào `Network Access` ở phía bên trái

![hình ảnh](https://user-images.githubusercontent.com/61675970/230927457-91ac83c3-547a-4005-9787-e4dca3a73718.png)

Nhấp vào `Add current IP address`

## Bước 2: Đăng ký tài khoản Cloudinary

Truy cập https://cloudinary.com/

Đăng ký tài khoản với **Google** là dễ nhất cho đến nay đối với mình

## Bước 3: Chỉnh sửa giá trị .env

Truy cập backend_kiki/.env

Thay đổi giá trị mongo db thành giá trị tương ứng của bản thân

`MONGO_DB_USER = ten_tai_khoan_cua_ban`
`MONGO_DB_PASSWORD = mat_khau_cua_ban

Nếu bạn không chắc chắn về nó. Bạn có thể kiểm tra nó trong `Database Access` nằm ở phía bên trái và sau đó nhấp vào `Edit`

![hình ảnh](https://user-images.githubusercontent.com/61675970/230929106-24486420-eefe-405c-91ea-5953967b1909.png)

Ngoài ra, bạn cần thay đổi `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`

Bạn có thể nhận các giá trị đó từ https://console.cloudinary.com/console sau khi đăng nhập

## Bước 4: Truy cập `client_kiki/src/app/axiosClient.js` và bỏ ghi chú localhost:5000

Bạn nên có mã của bạn trông giống như hình ảnh dưới đây

![hình ảnh](https://user-images.githubusercontent.com/61675970/230930058-8258bc5c-3bcd-4437-b8ef-87b4b26c3217.png)

## Bước 5: Cài đặt node_modules

Truy cập `client_kiki` và gõ `npm install -f`
Truy cập `backend_kiki` và gõ `npm install -f`
Truy cập `admin_kiki` và gõ `npm install -f`
