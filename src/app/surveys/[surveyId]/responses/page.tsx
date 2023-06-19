import Link from "next/link";
import { Share } from "@/ui/illustrations";

const Page = ({ params: { surveyId } }: { params: { surveyId: string } }) => {
  return (
    <div className="grid h-full place-content-center">
      <section className="flex  flex-col items-center gap-3">
        <div className="rounded-full bg-sky-200">
          <Share />
        </div>
        <div className="flex w-2/3 flex-col gap-1 text-center">
          <h2>No responses yet</h2>
          <p className="text-xs">
            Start receiving responses to your survey by sharing the link on your
            various platforms.
          </p>
        </div>
        <Link
          href={`/surveys/${surveyId}/share`}
          className="btn bg-orange-500 text-white"
        >
          Share survey
        </Link>
      </section>
    </div>
  );
};

export default Page;
