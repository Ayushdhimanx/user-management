import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../api/uservalue";
import { updateUser } from "../api/updateUser";
import { Editdata } from "../components/editdata";
import { toast } from "react-toastify";
import {
  Users,
  Search,
  Trash2,
  Menu,
} from "lucide-react";
import Logout from "../components/logout";

function Dashboard() {
  const [users, setusers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setusers(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );


  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteUser(id);
      setusers((prev) => prev.filter((u) => u._id !== id));
        toast.success("User deleted successfully ✅");
    } catch (error) {
      console.log("Delete error", error);
        toast.error("Delete failed ❌");
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="flex min-h-screen bg-gray-100">

      <div className="w-[220px] bg-blue-600 text-white p-5">
       
        <h2 className="text-xl font-bold mb-6"> Dashboard</h2>
        <ul className="space-y-3">
          <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Home</li>
          <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Users</li>
          <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1">

        {/* NAVBAR */}
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Welcome Back 👋</h1>
       <Logout />
        </div>

        {/* CONTENT */}
        <div className="p-6">

          {/* 📊 STATS */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-gray-500">Total Users</h3>
              <p className="text-2xl font-bold">{users.length}</p>
               
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-gray-500">Filtered Users</h3>
              <p className="text-2xl font-bold">{filteredUsers.length}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-gray-500">Current Page</h3>
              <p className="text-2xl font-bold">{currentPage}</p>
            </div>
          </div>

          {/* 🔍 SEARCH */}
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* TABLE */}
          <div className="bg-white shadow rounded p-4 overflow-x-auto">
            {loading ? (
              <p className="text-center p-4">Loading...</p>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center p-4 text-gray-500">
                        No Data Available
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user) => (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2 space-x-2">
                          <Editdata
                            user={user}
                            users={users}
                            setusers={setusers}
                            updateUser={updateUser}
                          />

                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                              <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* 📄 PAGINATION */}
          <div className="flex justify-center mt-4 gap-2 flex-wrap">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;