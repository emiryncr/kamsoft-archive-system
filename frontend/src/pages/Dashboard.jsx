import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Dashboard = () => {
    return (
        
        <div>
            <Navbar />
            <main className="min-h-[70vh]">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Dashboard;