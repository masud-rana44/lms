import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";

import InfoCard from "./_components/info-card";
import { CourseList } from "@/components/course-list";
import { getDashboardCourses } from "@/actions/get-dashboard-course";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          variant="success"
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
        />
      </div>
      <CourseList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
