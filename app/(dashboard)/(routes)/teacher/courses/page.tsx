import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const CoursesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="flex flex-col space-y-2">
      {courses.map((course) => (
        <Link href={`/teacher/courses/${course.id}`} key={course.id}>
          {course.title}
        </Link>
      ))}
    </div>
  );
};

export default CoursesPage;
