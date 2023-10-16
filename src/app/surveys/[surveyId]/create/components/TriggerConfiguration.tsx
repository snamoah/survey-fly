import { TriggerOperator } from '@/types';

type SelectOption<T> = {
  label: string;
  value: T;
};

const triggerOperatorOptions: SelectOption<TriggerOperator>[] = [
  { label: 'Is', value: 'is' },
  { label: 'Is not', value: 'is_not' },
  { label: 'Contains', value: 'contains' },
];

const TriggerConfiguration = () => (
  <article>
    <header>
      <h1>Trigger configuration</h1>
    </header>
    <section>
      <div>If response</div>
      <div>
        <label>State</label>
        <select>
          {triggerOperatorOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Value</label>
        <select>
          {[1, 2, 3, 4].map((num) => (
            <option value={num}>Value {num}</option>
          ))}
        </select>
      </div>
    </section>
  </article>
);

export default TriggerConfiguration;
