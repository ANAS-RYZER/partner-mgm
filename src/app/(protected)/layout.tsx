import AuthWrapper from "../AuthWrapper";
import AppShell from "./app-shell";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <AppShell>{children}</AppShell>
    </AuthWrapper>
  );
}
