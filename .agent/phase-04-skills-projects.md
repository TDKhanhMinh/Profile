### Phase 4 — Skills & Projects Section (Ước tính: 2.5 giờ)

**Mục tiêu:** Hiển thị đầy đủ kỹ năng và dự án với giao diện card đẹp.

**Các bước:**

1. Build `components/ui/SkillBadge.tsx`:  
     
   - Prop: `name`, `color?`.  
   - Pill shape, hover scale.

   

2. Build `components/sections/Skills.tsx`:  
     
   - Map qua `skillGroups`.  
   - Mỗi nhóm: icon Lucide \+ grid badges.  
   - Stagger animation từng badge.

   

3. Build `components/ui/ProjectCard.tsx`:  
     
   - Prop: `project: Project`.  
   - Ảnh thumbnail, category badge, tên, mô tả, tech stack tags.  
   - GitHub/Demo icon buttons.  
   - Hover card glow effect.

   

4. Build `components/sections/Projects.tsx`:  
     
   - Filter state (`useState<string>('all')`).  
   - Filter tabs UI.  
   - Grid với animated layout (Framer Motion `AnimatePresence`).  
   - Map qua filtered projects.

**Output kiểm tra:** ✅ Skill badges hiển thị đúng nhóm, filter projects hoạt động, card hover effect.

---
