"use client";
import React from "react";
import { Input } from "@heroui/react";

export default function EmailInput() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full flex flex-col gap-2 max-w-[240px]">
      <Input label="Email" placeholder="Enter your email" value={value} onValueChange={setValue} />
    </div>
  );
}

