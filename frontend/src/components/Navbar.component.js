import { Link, useLocation } from 'react-router-dom';
import "../css/Navbar.css"

const Navbar = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const role = pathSegments[2]; // Extract role from the URL (e.g., 'Doctor', 'Patient', 'Staff')

    const handleLogout = () => {
        // Implement logout logic here (e.g., clear authentication tokens)
        console.log("Logged out");
        window.location.href = '/login'; // Redirect to login page
    };

    // Role-specific navigation
    const renderNavbarContent = () => {
        if (role === 'Doctor') {
            return (
                <>
                    <Link to={`/notifications/Doctor/${pathSegments[3]}`}>Notifications</Link>
                    <Link to={`/profile/Doctor/${pathSegments[3]}`}>Profile</Link>
                    
                    
                </>
            );
        } else if (role === 'Patient') {
            return (
                <>
                    <Link to={`/notifications/Patient/${pathSegments[3]}`}>Notifications</Link>
                    <Link to={`/profile/Patient/${pathSegments[3]}`}>Profile</Link>
                    
                </>
            );
        } else if (role === 'Staff') {
            return (
                <>
                    <Link to={`//notificationsStaff/${pathSegments[3]}`}>Notifications</Link>
                    <Link to={`/profile/Staff/${pathSegments[3]}`}>Profile</Link>
                    
                </>
            );
        } else {
            return null; // For unauthenticated users or undefined roles
        }
    };

    return (
        <header>
            <div className="container">
                <div className="navbar">
                    <Link to="/login">
                        <h1>Hospify</h1>
                    </Link>
                    <nav>
                        {renderNavbarContent()}
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
