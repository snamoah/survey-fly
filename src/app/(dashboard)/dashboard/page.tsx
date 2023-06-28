import { getUserSurveys } from "@/lib/actions";
import { EmptyPackage } from "@/ui/illustrations";

import { CreateSurveyButton } from "../components/CreateSurveyButton";
import SurveyList from "./components/SurveyList";

const EmptyScreen = () => (
  <div className="grid h-full place-content-center">
    <section className="flex flex-col items-center gap-1">
      <div className="p-15 flex-wrap rounded-full bg-cyan-50">
        <EmptyPackage />
      </div>

      <h1 className="mt-5 text-center">You don't have any surveys yet</h1>
      <p className="text-center text-sm">Your surveys will appear here.</p>
    </section>
  </div>
);

export default async function DashboardPage() {
  const list = await getUserSurveys();

  return (
    <div className="flex h-full flex-col divide-y">
      <header className="flex h-24 place-content-between items-center px-20">
        <h1>Surveys</h1>
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search surveys..."
            className="w-72 rounded-sm bg-slate-200 px-3 py-3 text-xs text-slate-800 outline-slate-400"
          />
          <CreateSurveyButton />
        </div>
      </header>
      <div className="flex-1 overflow-auto px-20">
        {list.length ? <SurveyList items={list} /> : <EmptyScreen />}
      </div>
    </div>
  );
}
