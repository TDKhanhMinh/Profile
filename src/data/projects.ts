export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  category: "iot" | "cloud" | "web" | "fullstack";
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "iot-vegetable",
    title: "Hệ thống chăm sóc rau tự động",
    description:
      "Hệ thống IoT theo dõi và tự động chăm sóc rau xanh, tích hợp cảm biến độ ẩm, nhiệt độ và điều khiển tưới nước tự động theo lịch.",
    tech: ["IoT", "Embedded C", "MQTT", "Node.js", "Dashboard"],
    category: "iot",
    image: "/projects/iot-vegetable.png",
    githubUrl: "",
    featured: true,
  },
  {
    id: "aws-beanstalk-app",
    title: "Ứng dụng triển khai AWS Elastic Beanstalk",
    description:
      "Triển khai ứng dụng web Java Spring trên AWS Elastic Beanstalk với cấu hình EC2 instance, load balancer và môi trường production.",
    tech: ["Java", "Spring MVC", "AWS Elastic Beanstalk", "EC2", "RDS MySQL"],
    category: "cloud",
    image: "/projects/aws-beanstalk.png",
    githubUrl: "",
    featured: true,
  },
  {
    id: "real-estate-web",
    title: "Website bất động sản",
    description:
      "Ứng dụng web quản lý và hiển thị danh sách bất động sản, hỗ trợ tìm kiếm lọc theo khu vực, loại hình và mức giá.",
    tech: ["Java", "Spring MVC", "MySQL", "Amazon RDS", "Thymeleaf", "Bootstrap"],
    category: "web",
    image: "/projects/real-estate.png",
    githubUrl: "",
    featured: true,
  },
];
