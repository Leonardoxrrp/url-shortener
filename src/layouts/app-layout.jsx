import Header from '@/components/header'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div>
        <main className='min-h-screen container'>
            <Header /> 
            <Outlet />
        </main>
        <div className='text-center bg-gray-800 mt-10'>
            <h3>footer</h3>
        </div>
    </div>
  )
}

export default AppLayout