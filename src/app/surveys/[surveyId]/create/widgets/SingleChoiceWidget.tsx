const DEFAULT_OPTIONS = ["Option 1", "Option 2", "Option 3"];

const SingleChoiceWidget = () => (
  <ul className="flex flex-col gap-3">
    {DEFAULT_OPTIONS.map((option) => (
      <li key={option} className="flex h-10 gap-2 rounded-sm ring-1">
        <div className="grid w-10 place-content-center">
          <span className="h-5 w-3 bg-green-300"></span>
        </div>
        <div className="my-1 grid place-content-center rounded-sm">
          <input type="radio" disabled className="h-11/12 w-11/12" />
        </div>
        <input
          type="text"
          value={option}
          className="my-1 w-full grow text-xs outline-none"
        />
        <div className="w-12 bg-slate-200"></div>
      </li>
    ))}
    <li className="mt-2 flex gap-2">
      <button className="btn bg-purple-500">Add an option</button>
      <button className="btn text-slate-700 ring-1 ring-slate-700">
        Add "Other"
      </button>
    </li>
  </ul>
);

export default SingleChoiceWidget;
