import { Chain } from "@/ui/icons";
import { CopyLinkButton } from "./CopyLinkButton";

const Page = ({ params: { surveyId } }: { params: { surveyId: string } }) => {
  const url = `https://fill.surveyfly.com/s/${surveyId}`;

  return (
    <div className="flex h-full flex-col items-center gap-3 overflow-y-auto p-10">
      <article className="flex w-3/5 flex-col gap-3">
        <header className="">
          <h1>Share Survey</h1>
          <p className="">
            Find various ways to share your survey with the world
          </p>
        </header>
        <p className="relative grid place-content-center rounded-sm bg-yellow-200 p-2 text-sm text-slate-600">
          <span className="absolute left-0 top-0 h-full w-1 rounded-bl-sm rounded-tl-sm bg-yellow-500"></span>
          <span>
            Make sure you <b>publish</b> your survey before sharing.
          </span>
        </p>
        <section className="mt-5 flex flex-col gap-5 rounded-sm p-6 ring-1 ring-slate-300">
          <header>
            <h3>Direct Survey Link</h3>
            <p className="text-sm">
              Copy direct link to survey and share whereever you want.
            </p>
          </header>
          <footer className="flex flex-col gap-2">
            <p className="flex items-center rounded-sm bg-slate-200">
              <span className="bg-green grid place-content-center p-3">
                <Chain size={12} />
              </span>
              <span className="flex-1 select-all font-mono text-slate-600">
                {url}
              </span>
            </p>
            <div className="flex justify-end">
              <CopyLinkButton value={url} />
            </div>
          </footer>
        </section>
        <section className="mt-5 flex flex-col gap-5 rounded-sm p-6 ring-1 ring-slate-300">
          <header>
            <h3>Share on Social Media</h3>
            <p className="text-sm">
              One click to share survey on your favorite social media
            </p>
          </header>
          <footer className="flex gap-2">
            <button className="btn bg-blue-600">Facebook</button>
            <button className="btn bg-sky-500">Twitter</button>
            <button className="btn bg-blue-900">LinkedIn</button>
          </footer>
        </section>
      </article>
    </div>
  );
};
export default Page;
