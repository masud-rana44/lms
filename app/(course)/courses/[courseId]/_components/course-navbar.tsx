import { CourseWithChapterWithProgress } from "@/types";
import { CourseMobileSidebar } from "./course-mobile-sidebar";
import { NavbarRoutes } from "@/components/navbar-routes";

interface CourseNavbarProps {
  course: CourseWithChapterWithProgress;
  progressCount: number;
}

export const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};
