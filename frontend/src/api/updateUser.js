export const updateUser = async (id, data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:5000/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};