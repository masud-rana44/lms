import { File } from "lucide-react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Banner } from "@/components/banner";
import { Preview } from "@/components/preview";
import { getChapter } from "@/actions/get-chapter";
import { Separator } from "@/components/ui/separator";
import { VideoPlayer } from "./_components/video-palyer";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import profiles from "@/data/user";
import Image from "next/image";
import EmojiRating from "@/components/emoji-rating";
import StarRating from "@/components/star-rating";

const ChapterIdPage = async ({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  const profile = profiles[Number.parseInt(Math.random() * 15 + "")];
  console.log(profile);

  const handleSubmit = () => {};

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-12">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between space-x-3">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
              <div className="flex items-center space-x-3">
                <Image
                  src={profile.image}
                  alt="Creator avatar"
                  height={40}
                  width={40}
                  className="rounded-full border-2"
                />
                <h4 className="font-medium">{profile.name}</h4>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="flex gap-x-2">
                <StarRating rating={profile.rating} />
                <div className="flex flex-row">
                  <p>{profile.rating}</p>
                  {"/5"}
                  <EmojiRating rating={profile.rating} />
                </div>
              </div>
              {purchase ? (
                <CourseProgressButton
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  nextChapterId={nextChapter?.id}
                  isCompleted={!!userProgress?.isCompleted}
                />
              ) : (
                <CourseEnrollButton
                  price={course.price!}
                  courseId={params.courseId}
                />
              )}
            </div>
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}

          {/* reviews */}
          <form className="flex flex-col mt-2">
            <textarea
              // value={review}
              // onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              className="border border-gray-300 rounded-md p-2"
              rows={4}
              cols={50}
            />
            <div>
              <button
                type="submit"
                className="text-left bg-sky-700 hover:bg-sky-800 transition text-white py-2 px-4 mt-3 rounded-sm"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
