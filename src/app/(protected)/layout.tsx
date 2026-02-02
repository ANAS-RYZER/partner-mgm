import AuthWrapper from "../AuthWrapper";
import Header from "./header";
import Sidebar from "./sidebar";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthWrapper>
      <Header />
      <div className="min-h-screen w-screen flex">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
      </AuthWrapper>
    </>
  );
}
