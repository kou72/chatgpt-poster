import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <div className="w-1/6">
          <Sidebar />
        </div>
        <div className="w-5/6">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
