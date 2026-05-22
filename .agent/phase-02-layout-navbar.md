### Phase 2 — Layout & Navbar (Ước tính: 1 giờ)

**Mục tiêu:** Có navigation hoạt động, layout bao quanh hoàn chỉnh.

**Các bước:**

1. Build `app/layout.tsx`: metadata, font variables, render Navbar \+ Footer.  
2. Build `app/globals.css`: Tailwind directives, CSS variables màu sắc, base styles.  
3. Build `components/layout/Navbar.tsx`:  
   - Desktop: fixed navbar với blur backdrop.  
   - Links anchor scroll tới `#about`, `#skills`, `#projects`, `#contact`.  
   - Scroll direction detection (ẩn/hiện).  
   - Mobile hamburger: dùng `useState` toggle.  
4. Build `components/layout/Footer.tsx`.  
5. Build `hooks/useScrollSpy.ts`.  
6. Build `lib/utils.ts`.

**Output kiểm tra:** ✅ Navbar hiển thị, mobile menu hoạt động, scroll links không lỗi.

---
