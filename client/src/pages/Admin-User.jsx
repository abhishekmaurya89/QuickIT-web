import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom"; 

export const AdminUsers = () => {
  const { authToken } = useAuth();
  const [users, setUsers] = useState([]);

  const getAllUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/admin", {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      console.log("admin", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log("Delete user:", id);
      const response = await fetch(`http://localhost:5000/api/user/admin/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authToken,
        },
      });

      if (response.ok) {
        console.log("User deleted successfully");
        getAllUser();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-container">
      <h2>All Users</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <Link to={`/admin/update/${user._id}`} className="update-btn">
                    Update
                  </Link>
                  <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
