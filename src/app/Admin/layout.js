import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
    return<>
    <div className="flex">
        <div className="w-1/3">
            <Sidebar></Sidebar>
        </div>
    <div className="w-full">
        {children}
    </div>
    </div>
    </>
  }