const IntegrateSidebar = () => (
  <div className="flex h-full flex-col">
    <section className="grow">
      <header className=" p-6">
        <h1>Integrations</h1>
        <p className="mt-2 text-xs text-slate-600">
          Configure your favorite app with SurveyFly
        </p>
      </header>

      <menu className="mt-12">
        <li className="pl relative rounded-sm bg-slate-100 py-3">
          <span className="absolute left-0 top-0 h-full w-1 bg-yellow-500"></span>
          <span className="ml-5 font-semibold text-slate-600">Webhooks</span>
        </li>
      </menu>
    </section>
    <footer className="flex h-24 bg-indigo-300"></footer>
  </div>
);

export default IntegrateSidebar;
