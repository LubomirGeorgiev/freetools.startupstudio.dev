import NavFooterLayout from "@/layouts/NavFooterLayout";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return <NavFooterLayout>{children}</NavFooterLayout>;
};

export default ChatLayout;
