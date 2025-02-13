// import React, { useEffect, useState } from "react";
// import { fetchUsers, deleteUser } from "../services/adminServices";

// const Admin = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       const data = await fetchUsers();
//       setUsers(data);
//     } catch (error) {
//       console.error("Failed to load users.");
//     }
//   };

//   const handleDelete = async (userId) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await deleteUser(userId);
//         setUsers(users.filter((user) => user.userId !== userId));
//       } catch (error) {
//         console.error("Failed to delete user.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h2>

//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
//             <thead className="bg-gray-800 text-white">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   User ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Username
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Created Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold">
//                   Role
//                 </th>
//                 <th className="px-6 py-3 text-center text-sm font-semibold">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr
//                   key={user.userId}
//                   className="border-t hover:bg-gray-100 transition"
//                 >
//                   <td className="px-6 py-4 text-gray-700">{user.userId}</td>
//                   <td className="px-6 py-4 text-gray-700">{user.userName}</td>
//                   <td className="px-6 py-4 text-gray-700">{user.email}</td>
//                   <td className="px-6 py-4 text-gray-700">
//                     {new Date(user.createdDate).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 text-gray-700">
//                     {user.role?.roleName}
//                   </td>
//                   <td className="px-6 py-4 flex justify-center space-x-3">
//                     <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
//                       View Profile
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user.userId)}
//                       className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;

import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../services/adminServices";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users.");
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        setUsers(users.filter((user) => user.userId !== userId));
      } catch (error) {
        console.error("Failed to delete user.");
      }
    }
  };

  const handleViewProfile = (userId) => {
    navigate(`/admin/user/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Created Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Role
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.userId}
                  className="border-t hover:bg-gray-100 transition"
                >
                  <td className="px-6 py-4 text-gray-700">{user.userId}</td>
                  <td className="px-6 py-4 text-gray-700">{user.userName}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(user.createdDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {user.role?.roleName}
                  </td>
                  <td className="px-6 py-4 flex justify-center space-x-3">
                    <button
                      onClick={() => handleViewProfile(user.userId)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleDelete(user.userId)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;

