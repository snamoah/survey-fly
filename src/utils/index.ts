export const classNames = (...classes: (string | boolean)[]) => {
  return classes
    .filter((name) => typeof name === "string")
    .filter(Boolean)
    .join(" ");
};
