import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');  
  const [nickname, setNickname] = useState('');  
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

     
    if (!username || !email || !password || !profileImage || !nickname) {
      alert('يرجى ملء جميع الحقول.');
      return;
    }

   
    if (password.length < 8) {
      alert('يجب أن تتكون كلمة المرور من 8 خانات على الأقل.');
      return;
    }

    
    const userData = { username, email, password, profileImage, nickname }; 
    await fetch('https://67039eeaab8a8f892730e4d0.mockapi.io/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    alert('تم تسجيل حسابك بنجاح! يمكنك تسجيل الدخول الآن.');
    navigate('/login');  
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <img
          src="https://i.pinimg.com/564x/bb/32/92/bb329227a223e6c32f4c66077fc8181c.jpg"
          alt="Logo"
          className="w-1/2 mx-auto mb-4 rounded-lg"
        />
        <h2 className="text-2xl font-bold text-center mb-4">تسجيل حساب جديد</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block mb-2 text-right">اسم المستخدم</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 border text-right border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-right">الايميل</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 border text-right border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل ايميلك"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-right">كلمة المرور</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700 border text-right border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          
          <div className="mb-4">
            <label className="block mb-2 text-right">رابط صورة البروفايل</label>
            <input
              type="url"
              className="w-full p-2 rounded bg-gray-700 border text-right border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل رابط صورة البروفايل"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              required
            />
          </div>

        
          <div className="mb-4">
            <label className="block mb-2 text-right">الاسم المستعار</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700 border text-right border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ادخل الاسم المستعار"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            إنشاء حساب
          </button>
          <p className="text-center mt-4">
            لديك حساب بالفعل؟ <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>تسجيل الدخول</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
