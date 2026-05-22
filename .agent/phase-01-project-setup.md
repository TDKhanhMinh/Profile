### Phase 1 — Project Setup (Ước tính: 30 phút)

**Mục tiêu:** Project chạy được local, có cấu trúc thư mục đầy đủ.

**Các bước:**

1. Chạy lệnh khởi tạo:  
     
   npx create-next-app@latest my-profile \\  
     
     \--typescript \\  
     
     \--tailwind \\  
     
     \--eslint \\  
     
     \--app \\  
     
     \--src-dir=false \\  
     
     \--import-alias="@/\*"  
     
   cd my-profile  
     
2. Cài thêm dependencies:  
     
   npm install framer-motion lucide-react clsx tailwind-merge  
     
3. Tạo toàn bộ thư mục theo cấu trúc section 2\.  
     
4. Copy data từ section 3 vào `data/projects.ts` và `data/skills.ts`.  
     
5. Cập nhật `tailwind.config.ts` theo section 7\.  
     
6. Thêm font vào `app/layout.tsx`:  
     
   import { Sora, Inter } from 'next/font/google';  
     
   const sora \= Sora({ subsets: \['latin'\], variable: '--font-display' });  
     
   const inter \= Inter({ subsets: \['latin'\], variable: '--font-body' });  
     
7. Chạy `npm run dev` — xác nhận `http://localhost:3000` load được.

**Output kiểm tra:** ✅ `localhost:3000` không lỗi, thư mục đúng cấu trúc.

---
