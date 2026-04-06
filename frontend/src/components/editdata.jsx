import React, { useState } from "react";
import { toast } from "react-toastify";
export const Editdata = ({ user, users, setusers, updateUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  // open modal
  const openModal = () => {
    setFormData({ name: user.name, email: user.email });
    setIsOpen(true);
  };

  // close modal
  const closeModal = () => setIsOpen(false);

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit update
  const handleSubmit = async () => {
    try {
      await updateUser(user._id, formData);

      // update UI instantly
      setusers(
        users.map((u) =>
          u._id === user._id ? { ...u, ...formData } : u
        )
      );

      closeModal();
      toast.success("Data Updated")
    } catch (error) {
      console.log("Edit error", error);
      toast.error("Edit error", error)
    }
  };

  return (
    <>
      {/* Edit Button */}
      <button
        onClick={openModal}
        className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-sm"
      >
        Edit
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          
          <div className="bg-white rounded-xl shadow-lg w-96 p-6">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>

            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-2 rounded mb-3"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-2 rounded mb-4"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-1 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};