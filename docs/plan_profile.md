# Kế hoạch chi tiết: Trang Portfolio cá nhân — Trần Đỗ Khánh Minh

**Dành cho AI Agent thực thi:** Đây là tài liệu đặc tả đầy đủ để build toàn bộ trang portfolio từ zero đến deploy. Đọc kỹ từng phase trước khi thực hiện. Mỗi task có output rõ ràng để kiểm tra hoàn thành.

---

## 0\. Thông tin chủ sở hữu

name: Trần Đỗ Khánh Minh

role: Web Developer / Full-stack Developer / Student Developer

tagline: "Nodejs-NestJS-NextJS-Java Spring Boot-React"

email: trandokhanhminh@gmail.com

github: https://github.com/TDKhanhMinh 

linkedin:https://www.linkedin.com/in/tr%E1%BA%A7n-%C4%91%E1%BB%97-kh%C3%A1nh-minh-454894376/ 

location: Ho Chi Minh City, Vietnam

---

## 1\. Tech Stack & Tooling

| Hạng mục | Công nghệ |
| :---- | :---- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion (dùng có chọn lọc) |
| Icons | Lucide React |
| Font | Google Fonts — display: `Sora`, body: `Inter` |
| Color scheme | Dark theme chính, với accent xanh lá (\#22c55e) hoặc xanh lam (\#3b82f6) |
| Deploy | Vercel (auto từ GitHub) |
| Source control | GitHub |
| Package manager | npm |

---

## 2\. Cấu trúc thư mục đầy đủ

my-profile/

├── app/

│   ├── layout.tsx              \# Root layout: font, metadata, Navbar, Footer

│   ├── page.tsx                \# Landing page: tổng hợp tất cả section

│   ├── globals.css             \# Tailwind base, custom CSS variables

│   └── favicon.ico

├── components/

│   ├── layout/

│   │   ├── Navbar.tsx          \# Navigation cố định, smooth scroll, mobile menu

│   │   └── Footer.tsx          \# Footer đơn giản, social links

│   ├── sections/

│   │   ├── Hero.tsx            \# Tên, tagline, CTA buttons, avatar

│   │   ├── About.tsx           \# Giới thiệu, mục tiêu, ảnh

│   │   ├── Skills.tsx          \# Skill grid với icon và nhóm danh mục

│   │   ├── Projects.tsx        \# Project cards với filter tag

│   │   └── Contact.tsx         \# Email link, social icons, copy-to-clipboard

│   └── ui/

│       ├── ProjectCard.tsx     \# Card component cho từng project

│       ├── SkillBadge.tsx      \# Badge component cho từng kỹ năng

│       ├── SectionTitle.tsx    \# Tiêu đề section nhất quán

│       └── AnimatedWrapper.tsx \# Wrapper Framer Motion fade-in khi scroll

├── data/

│   ├── projects.ts             \# Dữ liệu tất cả project

│   └── skills.ts               \# Dữ liệu kỹ năng theo nhóm

├── public/

│   ├── avatar.png              \# Ảnh đại diện (placeholder nếu chưa có)

│   ├── cv.pdf                  \# File CV (optional)

│   └── projects/

│       ├── iot-vegetable.png

│       ├── aws-beanstalk.png

│       └── real-estate.png

├── lib/

│   └── utils.ts                \# Helper functions (cn, formatDate...)

├── hooks/

│   └── useScrollSpy.ts         \# Hook detect section đang active cho Navbar

├── tailwind.config.ts

├── tsconfig.json

├── next.config.ts

├── .env.local                  \# Biến môi trường (email service nếu dùng)

├── .gitignore

└── README.md

---

## 3\. Data Models (TypeScript types)

### `data/projects.ts`

export type Project \= {

  id: string;

  title: string;

  description: string;          // 2–3 câu mô tả

  longDescription?: string;     // Chi tiết hơn nếu cần

  tech: string\[\];               // Danh sách công nghệ

  category: 'iot' | 'cloud' | 'web' | 'fullstack';

  image: string;                // Đường dẫn ảnh trong /public

  githubUrl?: string;

  demoUrl?: string;

  featured: boolean;

};

export const projects: Project\[\] \= \[

  {

    id: 'iot-vegetable',

    title: 'Hệ thống chăm sóc rau tự động',

    description:

      'Hệ thống IoT theo dõi và tự động chăm sóc rau xanh, tích hợp cảm biến độ ẩm, nhiệt độ và điều khiển tưới nước tự động theo lịch.',

    tech: \['IoT', 'Embedded C', 'MQTT', 'Node.js', 'Dashboard'\],

    category: 'iot',

    image: '/projects/iot-vegetable.png',

    githubUrl: '',

    featured: true,

  },

  {

    id: 'aws-beanstalk-app',

    title: 'Ứng dụng triển khai AWS Elastic Beanstalk',

    description:

      'Triển khai ứng dụng web Java Spring trên AWS Elastic Beanstalk với cấu hình EC2 instance, load balancer và môi trường production.',

    tech: \['Java', 'Spring MVC', 'AWS Elastic Beanstalk', 'EC2', 'RDS MySQL'\],

    category: 'cloud',

    image: '/projects/aws-beanstalk.png',

    githubUrl: '',

    featured: true,

  },

  {

    id: 'real-estate-web',

    title: 'Website bất động sản',

    description:

      'Ứng dụng web quản lý và hiển thị danh sách bất động sản, hỗ trợ tìm kiếm lọc theo khu vực, loại hình và mức giá.',

    tech: \['Java', 'Spring MVC', 'MySQL', 'Amazon RDS', 'Thymeleaf', 'Bootstrap'\],

    category: 'web',

    image: '/projects/real-estate.png',

    githubUrl: '',

    featured: true,

  },

\];

### `data/skills.ts`

export type SkillGroup \= {

  category: string;

  icon: string;           // Tên icon Lucide

  skills: string\[\];

};

export const skillGroups: SkillGroup\[\] \= \[

  {

    category: 'Frontend',

    icon: 'Monitor',

    skills: \['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'\],

  },

  {

    category: 'Backend',

    icon: 'Server',

    skills: \['Java', 'Spring MVC', 'Spring Boot', 'REST API'\],

  },

  {

    category: 'Database',

    icon: 'Database',

    skills: \['MySQL', 'Amazon RDS'\],

  },

  {

    category: 'Cloud & DevOps',

    icon: 'Cloud',

    skills: \['AWS Elastic Beanstalk', 'EC2', 'S3', 'Vercel', 'Git', 'GitHub'\],

  },

  {

    category: 'IoT',

    icon: 'Cpu',

    skills: \['Embedded C', 'MQTT', 'Cảm biến môi trường', 'Điều khiển tự động'\],

  },

\];

---

## 4\. Chi tiết từng Component

### 4.1 `app/layout.tsx`

- Import font `Sora` (display) và `Inter` (body) từ `next/font/google`.  
- Cấu hình `<html lang="vi">`.  
- Thêm metadata mặc định (title template, description, og:image).  
- Render `<Navbar />` và `<Footer />` bao quanh `{children}`.  
- Thêm `<ScrollProgressBar />` nhỏ ở top nếu muốn (optional).

### 4.2 `components/layout/Navbar.tsx`

**Yêu cầu:**

- Fixed top, blur backdrop (`backdrop-blur-md bg-black/70`).  
- Logo bên trái: tên viết tắt "KM" hoặc full name.  
- Nav links: `About`, `Skills`, `Projects`, `Contact` — dùng anchor scroll `href="#about"`.  
- Active state highlight dựa trên `useScrollSpy` hook.  
- Nút CTA nhỏ "Download CV" hoặc "Contact" bên phải.  
- Mobile: hamburger menu → slide-down drawer với Framer Motion.  
- Transition: ẩn khi scroll xuống, hiện khi scroll lên (scroll direction detection).

### 4.3 `components/sections/Hero.tsx`

**Yêu cầu:**

- Full viewport height (`min-h-screen`).  
- Layout 2 cột trên desktop: text trái, avatar phải. Stack 1 cột trên mobile.  
- Avatar hình tròn với ring gradient, placeholder từ `public/avatar.png`.  
- Heading: `"Xin chào, tôi là"` nhỏ → `"Trần Đỗ Khánh Minh"` lớn (Sora font, bold).  
- Typewriter effect cho role: lần lượt hiện `"Web Developer"`, `"Spring MVC Developer"`, `"IoT Builder"`.  
- Mô tả ngắn 1–2 câu.  
- 2 CTA buttons: `"Xem Projects"` (primary) \+ `"Liên hệ tôi"` (ghost).  
- Social icon links nhỏ: GitHub, LinkedIn, Email.  
- Scroll indicator animation ở cuối (arrow bounce).  
- Background: subtle grid pattern hoặc dot pattern CSS.

**Animation:** Stagger reveal (name → role → description → buttons) dùng Framer Motion.

### 4.4 `components/sections/About.tsx`

**Yêu cầu:**

- 2 cột: ảnh/graphic trái, text phải.  
- Tiêu đề section: `"Về tôi"` với underline accent.  
- Nội dung:  
  - Đoạn 1: Giới thiệu bản thân là sinh viên/developer, quan tâm đến web và IoT.  
  - Đoạn 2: Mục tiêu — xây dựng sản phẩm thực tế, học công nghệ cloud và fullstack.  
  - Đoạn 3: Các công nghệ đang học và định hướng nghề nghiệp.  
- 3–4 stat card nhỏ: `"3+ Projects"`, `"2+ Years Learning"`, `"5+ Technologies"`.  
- Nút "Download CV" nếu có `/public/cv.pdf`.

### 4.5 `components/sections/Skills.tsx`

**Yêu cầu:**

- Tiêu đề: `"Kỹ năng"`.  
- Render theo `skillGroups` từ `data/skills.ts`.  
- Mỗi nhóm: heading với icon Lucide \+ danh sách badge `<SkillBadge />`.  
- `SkillBadge`: pill shape, border, hover scale \+ glow effect nhẹ.  
- Màu badge phân biệt theo nhóm (Frontend \= xanh, Backend \= cam, Cloud \= tím, IoT \= xanh lá).  
- Stagger animation từng badge khi scroll vào viewport.

### 4.6 `components/sections/Projects.tsx`

**Yêu cầu:**

- Tiêu đề: `"Dự án"`.  
- Filter tabs: `Tất cả | IoT | Cloud | Web` — filter theo `category` field.  
- Grid 3 cột desktop, 2 cột tablet, 1 cột mobile.  
- Mỗi card `<ProjectCard />`:  
  - Ảnh thumbnail phía trên (aspect-ratio 16/9, object-fit cover).  
  - Badge category (màu theo loại).  
  - Tên dự án (font Sora).  
  - Mô tả 2–3 dòng.  
  - Stack tech: hiển thị tối đa 4 tag, còn lại hiện "+N more".  
  - Footer card: icon GitHub \+ icon Demo (disabled/mờ nếu không có link).  
  - Hover effect: scale nhẹ \+ shadow đậm hơn \+ border glow.  
- Featured projects có badge "⭐ Featured".

### 4.7 `components/sections/Contact.tsx`

**Yêu cầu:**

- Layout centered, không cần form phức tạp (tránh cần backend).  
- Tiêu đề: `"Liên hệ"` \+ subtitle `"Hãy cùng xây dựng điều gì đó."`.  
- Email lớn, click copy-to-clipboard với toast notification `"Đã copy!"`.  
- Nút `"Gửi email"` → `mailto:`.  
- Row social links: GitHub, LinkedIn, Facebook — icon \+ label.  
- Optional: embed Calendly hoặc link form Google.

### 4.8 `components/layout/Footer.tsx`

**Yêu cầu:**

- Đơn giản: tên, năm, "Built with Next.js & Tailwind CSS".  
- Link back to top.  
- Social icons nhỏ.

---

## 5\. Hooks & Utilities

### `hooks/useScrollSpy.ts`

// Nhận vào mảng section IDs, trả về ID của section đang active

// Dùng IntersectionObserver

export function useScrollSpy(sectionIds: string\[\], offset \= 0): string

### `lib/utils.ts`

import { clsx, type ClassValue } from 'clsx';

import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue\[\]) {

  return twMerge(clsx(inputs));

}

---

## 6\. SEO & Metadata (`app/layout.tsx`)

export const metadata: Metadata \= {

  title: {

    default: 'Trần Đỗ Khánh Minh | Portfolio',

    template: '%s | Khánh Minh',

  },

  description:

    'Portfolio cá nhân của Trần Đỗ Khánh Minh — Web Developer với kinh nghiệm Spring MVC, Next.js, AWS và IoT.',

  keywords: \['portfolio', 'web developer', 'spring mvc', 'nextjs', 'aws', 'iot', 'vietnam'\],

  authors: \[{ name: 'Trần Đỗ Khánh Minh' }\],

  openGraph: {

    type: 'website',

    locale: 'vi\_VN',

    url: 'https://your-domain.vercel.app',

    title: 'Trần Đỗ Khánh Minh | Portfolio',

    description: 'Personal portfolio showcasing Web, Cloud, and IoT projects.',

    images: \[{ url: '/og-image.png', width: 1200, height: 630 }\],

  },

  twitter: {

    card: 'summary\_large\_image',

  },

};

---

## 7\. Tailwind Config bổ sung (`tailwind.config.ts`)

import type { Config } from 'tailwindcss';

const config: Config \= {

  content: \['./app/\*\*/\*.{ts,tsx}', './components/\*\*/\*.{ts,tsx}'\],

  theme: {

    extend: {

      fontFamily: {

        display: \['Sora', 'sans-serif'\],

        body: \['Inter', 'sans-serif'\],

      },

      colors: {

        accent: {

          DEFAULT: '\#22c55e',   // green-500 — màu chủ đạo

          dark: '\#16a34a',

          light: '\#4ade80',

        },

      },

      animation: {

        'fade-up': 'fadeUp 0.6s ease forwards',

        'typewriter': 'typewriter 2s steps(30) forwards',

      },

      keyframes: {

        fadeUp: {

          from: { opacity: '0', transform: 'translateY(20px)' },

          to: { opacity: '1', transform: 'translateY(0)' },

        },

      },

    },

  },

  plugins: \[\],

};

export default config;

---

## 8\. Phân tách Giai đoạn thực hiện

---

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

## 9\. Checklist hoàn thành tổng thể

\[ \] Project Next.js chạy local không lỗi

\[ \] Navbar fixed, blur, mobile menu hoạt động

\[ \] Hero: typewriter effect, stagger animation, avatar

\[ \] About: stat cards, text đầy đủ

\[ \] Skills: đủ 5 nhóm, filter badge màu

\[ \] Projects: 3 dự án, filter tab hoạt động, card hover

\[ \] Contact: copy email, social links đầy đủ

\[ \] Responsive đúng: 375px / 768px / 1280px

\[ \] Metadata SEO: title, description, og:image

\[ \] Ảnh dùng next/image

\[ \] Deploy Vercel thành công

\[ \] GitHub repo có README

\[ \] Không có lỗi TypeScript (npm run build thành công)

\[ \] Lighthouse Performance \> 85

---

## 10\. Lưu ý dành cho AI Agent

1. **Điền thực tế trước khi code:** Các trường `email`, `github`, `linkedin`, link dự án trong `data/projects.ts` cần được điền thực tế bởi người dùng. Dùng placeholder `"[FILL_IN]"` nếu chưa có.  
     
2. **Ảnh project:** Nếu chưa có ảnh thực tế, tạo placeholder bằng màu gradient CSS trong `ProjectCard.tsx` thay vì để broken image.  
     
3. **Không dùng form phức tạp:** Contact section chỉ cần email \+ social links, không cần backend form handler.  
     
4. **Animation:** Framer Motion chỉ dùng ở client component — thêm `"use client"` directive cho các component có animation.  
     
5. **Font loading:** `next/font/google` load tự động, không cần `<link>` tag thủ công trong HTML.  
     
6. **Build test bắt buộc:** Sau khi hoàn thành, chạy `npm run build` để xác nhận không có lỗi TypeScript hoặc build error trước khi deploy.

