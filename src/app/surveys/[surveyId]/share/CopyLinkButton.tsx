"use client";

import copy from "copy-to-clipboard";
import { useRef, useState } from "react";

type Props = {
  value: string;
};

export const CopyLinkButton = ({ value }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onClick = () => {
    setIsCopied(true);
    timeoutId.current && clearTimeout(timeoutId.current);
    copy(value, { format: "text/plain" });
    timeoutId.current = setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <button disabled={isCopied} onClick={onClick} className="btn bg-purple-500">
      {isCopied ? "Copied" : "Copy link"}
    </button>
  );
};
