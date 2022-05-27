import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const navLinkClasses = ({ isActive }: { isActive: boolean }) => {
        return `sidebar-item d-inline-block w-100 ${
            isActive ? 'selected' : ''
        }`;
    };

    return (
        <aside className="left-sidebar" data-sidebarbg="skin6">
            <div className="scroll-sidebar">
                <nav className="sidebar-nav">
                    <ul id="sidebarnav">
                        <NavLink to="/" className={navLinkClasses}>
                            <div className="sidebar-link cursor-pointer">
                                <i className="mdi mdi-view-dashboard"></i>
                                <span className="hide-menu">Dashboard</span>
                            </div>
                        </NavLink>
                        <NavLink to="/user" className={navLinkClasses}>
                            <div className="sidebar-link cursor-pointer">
                                <i className="mdi mdi-account-network"></i>
                                <span className="hide-menu">
                                    User Management
                                </span>
                            </div>
                        </NavLink>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;