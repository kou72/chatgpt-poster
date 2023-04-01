import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <div className="w-1/12">
          <Sidebar />
        </div>
        <div className="w-11/12">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
