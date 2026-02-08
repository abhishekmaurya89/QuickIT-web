import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { useParams } from "react-router-dom";
import {toast } from 'react-toastify';
export const UpdateUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const { authToken } = useAuth();
const params=useParams();
 console.log("Fetching user with ID:", params.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
   const handleUpdate = async (e) => {
  e.preventDefault(); 

  try {
    console.log("update user:", params.id);
    const response = await fetch(`http://localhost:5000/api/user/update/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
     toast.success("user updated successfull" );
    } else {
      toast.error("Failed to update user");
    }
  } catch (error) {
    console.log("Update error:", error);
  }
};

 const getSingleUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/get/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      console.log("single", data);
      setFormData(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
 useEffect(() => {
  getSingleUser();
}, []);

  return (
    <>
      <section>
        <div className="section-contact">
          <div className="container grid grid-two-cols">
           

            <div className="section-form">
              <h1 className="main-heading mb-3">Update User</h1>
              <form onSubmit={handleUpdate}>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    id="username"
                    required
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    id="email"
                    required
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label htmlFor="phone">phone</label>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone"
                    id="phone"
                    required
                    autoComplete="off"
                  />
                </div>
                

                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
};
