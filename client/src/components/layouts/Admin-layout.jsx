import { Navigate, NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { MdPermContactCalendar } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li><NavLink to="/admin/users"><FaUserEdit /> Users</NavLink></li>
              <li><NavLink to="/admin/contact"><MdPermContactCalendar /> Contact</NavLink></li>
              <li><NavLink to="/services"><RiServiceLine /> Services</NavLink></li>
              <li><NavLink to="/"><IoIosHome /> Home</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
