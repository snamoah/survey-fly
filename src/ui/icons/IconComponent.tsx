import React, { cloneElement } from "react";

type Props = {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
};

export default function IconComponent({ icon }: { icon: React.ReactElement }) {
  return ({ size = 14, width, height, className }: Props) => {
    return cloneElement(icon, {
      width: width || size,
      height: height || size,
      ...(className ? { className } : {}),
    });
  };
}
