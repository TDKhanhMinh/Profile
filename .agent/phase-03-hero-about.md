### Phase 3 — Hero & About Section (Ước tính: 2 giờ)

**Mục tiêu:** Phần đầu trang ấn tượng, trình bày đúng thông tin.

**Các bước:**

1. Build `components/sections/Hero.tsx`:  
     
   - Layout 2 cột.  
   - Typewriter effect cho roles (dùng `useState` \+ `useEffect` interval).  
   - Avatar placeholder từ `public/avatar.png`.  
   - Stagger animation Framer Motion cho các element.  
   - 2 CTA buttons \+ social icons.  
   - Background pattern (CSS `radial-gradient` hoặc SVG dot pattern).

   

2. Build `components/sections/About.tsx`:  
     
   - Stat cards (3+ Projects, v.v.).  
   - Đoạn text giới thiệu theo nội dung section 4.4.  
   - Fade-in animation khi scroll vào.

   

3. Build `components/ui/SectionTitle.tsx`:  
     
   - Prop: `title`, `subtitle?`.  
   - Hiển thị với underline accent màu `accent`.

   

4. Build `components/ui/AnimatedWrapper.tsx`:  
     
   - Wrap Framer Motion `motion.div` với `whileInView` fade-up.  
   - Prop: `delay?`, `children`.

**Output kiểm tra:** ✅ Hero section đầy đủ, typewriter hoạt động, About hiển thị đúng.

---
