import axios from "axios";
import React, { useState } from "react";
import { Link ,useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const Signup = () => {
    const [error, setError] = useState(null);
    const [verificationMessage, setVerificationMessage] = useState('');
    const [values, setValues] = useState({
        username:"",
        email: "",
        password: ""
     
    });
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(values);
            const response = await axios.post("http://localhost:5001/user/register", values);
            
           
            setCookies("access_token", response.data.token);
            
            setVerificationMessage('Inscription réussie ! Veuillez vérifier votre e-mail pour activer votre compte.');
            
            // navigate('/');
        } catch (error) {
          console.log(error);
     
          if (error.response.status === 400) {
            setError("username , email or Password is not valid");
          }else if (error.response.status === 409) {
            setError("User already exists");
          } else {
            setError("An error occurred during login");
          }
        }
    }


  return (
    <div className="flex ">
      {/* Partie gauche avec le formulaire */}
      <div className="w-1/2 pt-10 overflow-hidden" > 
        <form>
          <div className="flex flex-col items-center justify-center px-6  mx-auto lg:py-0 overflow-hidden">
            <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Create an account
                </p>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your username
                  </label>
                  <input
                    placeholder="JohnDoe"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    id="username"
                    type="text"
                    value={values.username}
                    onChange={(e) => setValues({ ...values, username: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="JohnDoe@gmail.com"
                    id="confirmPassword"
                    type="email"
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="••••••••"
                    id="password"
                    type="password"
                    value={values.password}
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                      type="checkbox"
                      aria-describedby="terms"
                      id="terms"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-light text-gray-500 text-gray-300">
                      I accept the
                      <a
                        href="#"
                        className="font-medium text-primary-600 hover:underline text-primary-500"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                <div className="mt-2">
                    {error && <p className="text-red-500">{error}</p>}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#DB89D5] hover:bg-[#a21caf] font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                  type="submit"
                >
                  Create an account
                </button>
                {verificationMessage && <p>{verificationMessage}</p>}
              </div>
              
            </div>
          </div>
        </form>
      </div>

      {/* Partie droite avec l'image */}
      <div className="w-1/2 bg-white p-8 overflow-hidden">
        {/* Ajoutez ici l'image ou tout autre contenu que vous souhaitez afficher à droite */}
        <img
          src="src/images/5150721.jpg"
          alt="Description de l'image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
