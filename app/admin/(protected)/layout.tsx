import { AppSidebar } from "@/components/admin-dashboard/app-sidebar"
import { SiteHeader } from "@/components/admin-dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default async function Layout({ children }: { children: React.ReactNode }) {
const authenticated = await isAuthenticated();
  console.log('authenticated', authenticated);
  if (!authenticated) {
    redirect('/admin/login');
  }
  return (
     <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 px-8 md:gap-6 md:py-6">
             {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
