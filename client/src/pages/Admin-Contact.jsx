import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import {toast } from 'react-toastify';
export const AdminContact = () => {
  const { authToken } = useAuth();
  const [contact, setContact] = useState([]);

  const getAllcontact = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(`${backendUrl}/api/user/contact`, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch message");
      }

      const data = await response.json();
      console.log("admin", data);
      setContact(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      console.log("Delete message:", id);
      const response = await fetch(`${backendUrl}/api/user/contact/${id}`, {
        
        method: "DELETE",
        headers: {
          Authorization: authToken,
        },
      });

      if (response.ok) {
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete user");
      }
      getAllcontact();
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAllcontact();
  }, []);

  return (
    <div className="admin-container">
      <h2>All Contact</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
             <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contact.length > 0 ? (
            contact.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.message}</td>
                 <td>
                  <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No contact found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
