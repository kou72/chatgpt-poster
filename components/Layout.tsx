import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <div className="w-2/12">
          <Sidebar />
        </div>
        <div className="w-10/12">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
