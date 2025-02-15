import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchUserById,
  updateUserRole,
  updateUserPassword,
  fetchRoles,
} from "../services/adminServices";

const AdminUserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    loadUser();
    loadRoles();
  }, []);

  const loadUser = async () => {
    try {
      const data = await fetchUserById(userId);
      setUser(data);
      setNewRole(data.roleName);
    } catch (error) {
      console.error("Failed to load user.");
    }
  };

  const loadRoles = async () => {
    try {
      const data = await fetchRoles();
      setRoles(data);
    } catch (error) {
      console.error("Failed to load roles.");
    }
  };

  const handleRoleChange = async () => {
    try {
      await updateUserRole(userId, newRole);
      alert("User role updated successfully");
      loadUser();
    } catch (error) {
      console.error("Failed to update role.");
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      await updateUserPassword(userId, newPassword);
      alert("Password updated successfully");
      setNewPassword("");
    } catch (error) {
      console.error("Failed to update password.");
    }
  };

  return user ? (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">User Profile</h2>
        <p>
          <strong>User ID:</strong> {user.userId}
        </p>
        <p>
          <strong>Username:</strong> {user.userName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Verified:</strong> {user.verified ? "Yes" : "No"}
        </p>
        <p>
          <strong>Created Date:</strong>{" "}
          {new Date(user.createdDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Updated Date:</strong>{" "}
          {new Date(user.updatedDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Role:</strong>
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="ml-2 border px-2 py-1 rounded"
          >
            {roles.map((role) => (
              <option key={role.roleId} value={role.roleName}>
                {role.roleName}
              </option>
            ))}
          </select>
          <button
            onClick={handleRoleChange}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Role
          </button>
        </p>
        <h3 className="text-lg font-semibold mt-4">Profile Details</h3>
        <p>
          <strong>Full Name:</strong> {user.fullName || "N/A"}
        </p>
        <p>
          <strong>Contact:</strong> {user.contact || "N/A"}
        </p>
        <p>
          <strong>Address:</strong> {user.address || "N/A"}
        </p>
        <p>
          <strong>Date of Birth:</strong>{" "}
          {user.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
        </p>
        {user.profileUrl && (
          <img
            src={user.profileUrl}
            alt="Profile"
            className="mt-2 w-32 h-32 rounded-full"
          />
        )}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Update Password</h3>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border px-2 py-1 rounded w-full mt-2"
            placeholder="Enter new password"
          />
          <button
            onClick={handlePasswordUpdate}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Update Password
          </button>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  ) : (
    <p>Loading user data...</p>
  );
};

export default AdminUserProfile;
