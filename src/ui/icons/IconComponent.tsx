import React, { cloneElement } from 'react';

export type IconProps = {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
};

export type Icon = React.ComponentType<IconProps>;

export default function IconComponent({ icon }: { icon: React.ReactElement }) {
  return ({ size = 14, width, height, className }: IconProps) => {
    return cloneElement(icon, {
      width: width || size,
      height: height || size,
      ...(className ? { className } : {}),
    });
  };
}
