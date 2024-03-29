import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/user/verify-email/${token}`);
        if (response.status === 200) {
          setVerificationStatus('Email verified successfully');
        }
      } catch (error) {
        setVerificationStatus('Email verification failed. Please try again.');
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">

        <div className="text-center">
          {verificationStatus.includes('successfully') ? (
            <>
              <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
              </svg>
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">{verificationStatus}</h3>
              <p className="text-gray-600 my-2">Thank you for completing.</p>
              <div className="py-10 text-center">
                <Link to="/login" className="w-full bg-[#DB89D5] hover:bg-[#a21caf] font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white">
                  Login
                </Link>
              </div>
            </>
          ) : (
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">{verificationStatus}</h3>
          )}
        </div>
      </div>
    </div>
  );
};
export default VerifyEmail;
