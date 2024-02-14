import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from "axios";
import { useSelector } from 'react-redux';

function PageUser(){
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const username = useSelector((state) => state.user.username);
    const userId =useSelector((state) => state.user.id);
    const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
     
        try {
          await axios.delete(`http://localhost:5001/user/${id}`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          handleLogout(); 
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
    


 return(
    <>
    <p>Hi {username}</p>
    <button onClick={() => handleDelete(userId)}>
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
    <button 
            className="w-full bg-[#DB89D5] hover:bg-[#a21caf]  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
            type="submit"
            onClick={handleLogout}>
        Logout
    </button>
    </>
 );
}
export default PageUser;