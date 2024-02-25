import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/UserSlice';

const handleRequestError = (error, setError) => {
  if (error.response.status === 400) {
    setError("All fields are required");
  } else if (error.response.status === 401) {
    setError("Username or password is incorrect");
  } else {
    setError("An error occurred during login");
  }
};

const getTokenPayload = (token) => {
  if (!token) {
    return null;
  }

  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    return null;
  }

  const payloadBase64 = tokenParts[1];
  const decodedPayload = atob(payloadBase64);

  try {
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload;
  } catch (error) {
    console.error('Error parsing JWT payload:', error);
    return null;
  }
};

const Login = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(values);
      const response = await axios.post(`http://localhost:5001/user/login`, values);

      setCookies("access_token", response.data.token);

      const jwtToken = response.data.token;
      const payload = getTokenPayload(jwtToken);

      if (payload) {
        console.log('JWT Payload:', payload);
        const { id, username } = payload;
        dispatch(setUser({ id, username }));
      } else {
        console.log('Invalid JWT token or unable to extract payload.');
      }

      if (response.data.role === 'user') {
        navigate('/user_page');
      } else {
        navigate('/admin_page');
      }
    } catch (error) {
      console.log(error);
      handleRequestError(error, setError);
    }
  };

  return (
    <div className="flex ">
      <div className="w-1/2 bg-white p-8 overflow-hidden">
        <img
          src="src/images/4707071.jpg"
          alt="Description de l'image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 pt-20 overflow-hidden" >
        <form>
          <div className="flex flex-col items-center justify-center px-6  mx-auto lg:py-0 overflow-hidden">
            <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Login
                </p>
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
                  <div className="ml-3 text-sm">
                    <p className="font-medium text-primary-600 hover:underline text-primary-500">
                      Not registered? <Link to="/Sign_up" className="text-blue-500">Sign up</Link>
                    </p>
                  </div>
                </div>


                <div className="mt-2">
                  {error && <p className="text-red-500">{error}</p>}
                </div>

                <button onClick={handleSubmit}
                  className="w-full bg-[#DB89D5] hover:bg-[#a21caf]  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                  type="submit"
                >
                  Login
                </button>

              </div>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Login;
