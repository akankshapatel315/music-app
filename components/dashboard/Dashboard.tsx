"use client";
import { ContentLayout } from "@/components/panel/content-layout";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";

export default function Dashboard() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  return (
    <ContentLayout title="Dashboard">
        <div className="flex gap-6 mt-6">
         Akanksha
        </div>
    </ContentLayout>
  );
}
