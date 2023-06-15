import MultiChoiceWidget from "./widgets/MultiChoiceWidget";
import SingleChoiceWidget from "./widgets/SingleChoiceWidget";

const Page = () => (
  <article className="m-10 flex flex-col divide-y divide-slate-300 rounded-md ring-1 ring-slate-300">
    <header className="px-6 pb-6">
      <div className="flex justify-end">
        <button>X</button>
      </div>
      <h3>Question:</h3>
      <input className="w-full ring-1" type="text" />
    </header>
    <footer className="p-6">
      <SingleChoiceWidget />
    </footer>
  </article>
);

export default Page;
