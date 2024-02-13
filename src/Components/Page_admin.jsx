import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const PageAdmin = () => {
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
  });

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Retrieve the token from cookies
  const token = cookies['access_token'];  // Utilisez cookies au lieu de useCookies
  console.log("token",token );

  const handleSeeMoreClick = (userId) => {
    setSelectedUser(userId);
  };

  const handleSeeLessClick = () => {
    setSelectedUser(null);
  };

  const fetchData = async () => {
    try {

      const response = await axios.get('http://localhost:5001/user/get-all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/user/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      console.log(values);
      console.log(id);
      await axios.put(`http://localhost:5001/user/assign-roles/${id}`, values,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    removeCookie("access_token");
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserID");
    navigate('/login');
  };

  return (
    <div className="grid grid-cols-3 gap-4 h-screen">
      <div className="col-span-1 grid grid-auto-rows gap-4 p-4 bg-white overflow-y-auto">
        {users.map((user) => (
          <div
            key={user._id}
            className={`flex flex-col justify-center gap-2 bg-white rounded-lg shadow-2xl p-4 mb-4 ${
              selectedUser === user._id ? 'border-4 border-purple-500' : ''
            }`}
          >
            <div className="flex gap-2 items-center">
              <img
                src="src/images/profil.png"
                alt="profil"
                className="bg-neutral-500 w-16 h-16 shrink-0 rounded-lg"
              />
              <div className="flex flex-col">
                <span className="font-bold text-neutral-700 italic">{user.username}</span>
                <p className="line-clamp-3">{user.email}</p>
                <p className="font-bold text-neutral-700 italic ">{user.roles.name}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(user._id)}>
              {/* Delete button */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 m-1"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button onClick={() => handleSeeMoreClick(user._id)}>
              {/* Edit button */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 m-1"
              >
                <path
                  d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z"
                />
                <path
                  d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="col-span-2 p-4 flex justify-center items-center">
        {selectedUser !== null ? (
          <div className="flex flex-col justify-center gap-2 bg-white rounded-lg shadow-2xl p-4 mb-4">
            <div className="flex gap-2 items-center">
              <img
                src="src/images/profil.png"
                alt="profil"
                className="bg-neutral-500 w-16 h-16 shrink-0 rounded-lg"
              />
              <div className="flex flex-col">
                <span className="font-bold text-neutral-700 italic">
                  {selectedUser && users.find(user => user._id === selectedUser)?.username}
                </span>
                <p className="line-clamp-3">
                  {selectedUser && users.find(user => user._id === selectedUser)?.email}
                </p>
              </div>
            </div>
            <div>
              {/* Formulaire de mise à jour du rôle */}
              <label htmlFor="name">Nouveau rôle: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                    onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
              <button onClick={() => handleUpdate(selectedUser)}>
                {/* Mettre à jour le rôle */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 m-1"
                >
                  {/* Icône de mise à jour */}
                  {/* (Ajoutez le chemin approprié pour l'icône de mise à jour) */}
                </svg>
              </button>
            </div>
            <br />
            <button
              className="w-full bg-[#DB89D5] hover:bg-[#a21caf] font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
              onClick={handleSeeLessClick}
            >
              Fermer
            </button>
          </div>
        ) : (
          <img src="src/images/admin.png" alt="admin" className="w-full h-full" />
        )}
      </div>
      <button
            className="w-full bg-[#DB89D5] hover:bg-[#a21caf]  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
            type="submit"
            onClick={handleLogout}>
        Logout
    </button>
    </div>
    
  );
};

export default PageAdmin;
