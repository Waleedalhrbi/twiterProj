import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RightSidebar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    
    localStorage.removeItem('userData');
    navigate('/login');  
  };

  const confirmLogout = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="w-full md:w-1/4 p-4 bg-black flex flex-col space-y-4 md:relative fixed bottom-0 left-0 right-0">
      <ul className="space-y-6 flex md:flex-col justify-around md:justify-start">
        <li className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/home')}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
          </svg>
          <span className="text-lg hidden sm:inline">الرئيسية</span>
        </li>
        <li className="flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
          </svg>
          <span className="text-lg hidden sm:inline">استكشف</span>
        </li>
        <li className="flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#ffffff">
            <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/>
          </svg>
          <span className="text-lg hidden sm:inline">التنبيهات</span>
        </li>
        <li className="flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#ffffff">
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/>
          </svg>
          <span className="text-lg hidden sm:inline">الرسائل</span>
        </li>
        <li className="flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M480-118 120-398l66-50 294 228 294-228 66 50-360 280Zm0-202L120-600l360-280 360 280-360 280Zm0-280Zm0 178 230-178-230-178-230 178 230 178Z"/>
          </svg>
          <span className="text-lg hidden sm:inline">Grok</span>
        </li>
        <li className="flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Z"/>
          </svg>
          <span className="text-lg hidden sm:inline">المجتمعات</span>
        </li>
        <li className="flex items-center space-x-4">
          <img width="32" height="32" src="https://img.icons8.com/windows/32/twitterx.png" alt="twitterx" className='bg-white'/>
          <span className="text-lg hidden sm:inline">Premium</span>
        </li>
        <li className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/profile')}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T240-306q-9 5-14.5 14t-5.5 20v32Z"/>
          </svg>
          <span className="text-lg hidden sm:inline">الملف الشخصي</span>
        </li>
        <li className="flex items-center space-x-4 cursor-pointer" onClick={confirmLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
            <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
          </svg>
          <span className="text-lg hidden sm:inline">تسجيل الخروج</span>
        </li>
      </ul>

       
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg mb-4 text-black">هل ترغب في تسجيل الخروج؟</h2>
            <div className="flex justify-between">
              <button className="btn btn-danger" onClick={handleLogout}>نعم</button>
              <button className="btn btn-secondary" onClick={handleCloseModal}>لا</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RightSidebar;
