import { classNames } from '@/utils';

const widgetClassName = 'rounded-sm bg-white ring-1 ring-slate-400 h-60';

export const Stats = () => (
  <div className="grid h-full grid-cols-6 gap-3 overflow-y-auto bg-slate-100 p-4">
    <article className={classNames('col-span-2', widgetClassName)}></article>
    <article className={classNames(widgetClassName, 'col-span-3')}></article>
    <article className={classNames(widgetClassName)}></article>
    <article className={classNames(widgetClassName, 'col-span-3')}></article>
    <article className={classNames(widgetClassName, 'col-span-3')}></article>
    <article className={classNames(widgetClassName, 'col-span-2')}></article>
  </div>
);
