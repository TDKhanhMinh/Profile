### Phase 6 — Tối ưu & Deploy (Ước tính: 1 giờ)

**Mục tiêu:** Code sạch, SEO tốt, deploy thành công lên Vercel.

**Các bước:**

1. Cập nhật metadata trong `app/layout.tsx` theo section 6\.  
2. Thêm `robots.txt` và `sitemap.xml` (Next.js built-in nếu cần).  
3. Tối ưu ảnh: dùng `next/image` cho tất cả ảnh, khai báo `width`, `height`.  
4. Kiểm tra Lighthouse score (target: Performance \> 85, Accessibility \> 90).  
5. Viết `README.md`:  
     
   \# Portfolio — Trần Đỗ Khánh Minh  
     
   \#\# Getting Started  
     
   npm install && npm run dev  
     
   \#\# Tech Stack  
     
   Next.js, TypeScript, Tailwind CSS, Framer Motion  
     
   \#\# Deploy  
     
   Vercel — auto deploy từ main branch  
     
6. Tạo repo GitHub, push code:  
     
   git init  
     
   git add .  
     
   git commit \-m "feat: initial portfolio"  
     
   git remote add origin https://github.com/\[username\]/my-profile.git  
     
   git push \-u origin main  
     
7. Vào [vercel.com](https://vercel.com) → "Add New Project" → Import GitHub repo → Deploy.  
8. Sau deploy: kiểm tra URL production, test mobile trên thiết bị thật.  
9. (Optional) Gắn domain cá nhân nếu có.

**Output kiểm tra:** ✅ URL Vercel hoạt động, Lighthouse score đạt target, không lỗi console.

---
