export const getUsers = async() =>{
    const response = await fetch("http://localhost:5000/api/users")
    return response.json()
}

export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:5000/api/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
