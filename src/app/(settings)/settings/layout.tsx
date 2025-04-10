import { getSessionFromCookie } from "@/utils/auth";
import { redirect } from "next/navigation";
import { SettingsSidebar } from "./settings-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { SettingsBreadcrumbs } from "./settings-breadcrumbs";
import Layout from "@/components/layout/layout";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromCookie();

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <Layout>
        <SidebarInset className="mx-auto max-w-7xl flex flex-col ">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SettingsBreadcrumbs />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="lg:w-1/5">
                <SettingsSidebar />
              </aside>
              <div className="flex-1">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </Layout>
    </SidebarProvider>
  );
}

