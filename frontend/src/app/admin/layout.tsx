import type { Metadata } from "next";
import { GitHubStagingProvider } from "@/lib/admin/githubStaging";
import PublishBar from "@/components/admin/PublishBar";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <GitHubStagingProvider>
      <div className="admin-surface">{children}</div>
      <PublishBar />
    </GitHubStagingProvider>
  );
}
