### Phase 5 — Contact Section & Responsive Polish (Ước tính: 1.5 giờ)

**Mục tiêu:** Section liên hệ hoàn chỉnh, toàn trang responsive tốt.

**Các bước:**

1. Build `components/sections/Contact.tsx`:  
     
   - Copy email to clipboard với `navigator.clipboard.writeText`.  
   - Toast notification "Đã copy\!" (dùng `useState` \+ `setTimeout`).  
   - Social links.

   

2. Kiểm tra responsive toàn bộ trang:  
     
   - Mobile: 375px, 390px (iPhone).  
   - Tablet: 768px.  
   - Desktop: 1280px, 1440px.  
   - Fix overflow, font size, spacing.

   

3. Đảm bảo `app/page.tsx` render đúng thứ tự:  
     
   \<main\>  
     
     \<section id="home"\>\<Hero /\>\</section\>  
     
     \<section id="about"\>\<About /\>\</section\>  
     
     \<section id="skills"\>\<Skills /\>\</section\>  
     
     \<section id="projects"\>\<Projects /\>\</section\>  
     
     \<section id="contact"\>\<Contact /\>\</section\>  
     
   \</main\>

**Output kiểm tra:** ✅ Contact copy hoạt động, không overflow trên mobile 375px.

---
