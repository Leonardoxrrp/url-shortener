import Header from "@/components/header"
import { Outlet } from "react-router-dom"

function AppLayout() {
  return (
    <div>
      <main className="min-h-screen pb-10 container">
        <Header />
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
