import { classNames } from '@/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <h2
      className={classNames(
        'bg-gradient-to-r from-orange-500 to-cyan-400 bg-clip-text font-extrabold text-slate-50 text-transparent',
        className,
      )}
    >
      SurveyFly
    </h2>
  );
}
