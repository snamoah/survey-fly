const Page = () => (
  <div className="grid justify-items-center">
    <article className="mt-16 flex w-4/6 flex-col divide-y rounded-sm bg-yellow-50">
      <header className="p-6 pt-8">
        <h3>How does it work?</h3>
        <p className="text-sm">
          Configure webhooks to send submissions to your endpoint. You can
          configure up to 3 endpoints
        </p>
      </header>
      <section className="flex flex-col gap-2 p-6">
        <label className="text-sm text-slate-600">Add webhook</label>

        <input
          type="url"
          className="w-full rounded-sm p-3 text-xs ring-1 ring-slate-400"
          placeholder="http:// or https://"
          defaultValue={"https://"}
        />
        <footer className="flex justify-end">
          <button className="btn bg-purple-500">Add new webhook</button>
        </footer>
      </section>
    </article>
  </div>
);

export default Page;
