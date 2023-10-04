import { Category, Chapter, Course, UserProgress } from "@prisma/client";

export type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

export type CourseWithChapterWithProgress = Course & {
  chapters: (Chapter & {
    userProgress: UserProgress[] | null;
  })[];
};
