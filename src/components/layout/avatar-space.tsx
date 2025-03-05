import { Avatar } from "@heroui/react";

export const AvatarSpace = () => {
  return (
    <div className="flex items-center gap-3 px-3">
      <Avatar isBordered size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      <div className="flex flex-col">
        <p className="text-small font-medium text-default-600">John Doe</p>
        <p className="text-tiny text-default-400">Product Designer</p>
      </div>
    </div>
  );
};