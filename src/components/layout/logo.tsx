import type { IconSvgProps } from "./types";

import React from "react";
import Image from "next/image";
import Link from "next/link";
export const Logo: React.FC<IconSvgProps> = ({ size = 48, width, height, ...props }) => (
  <Link href="/">
    <Image
      src="/logo.svg"
      alt="Logo"
      width={Number(size || width) || 48}
      height={Number(size || height) || 48}
      className={props.className}
    />
  </Link>
);
