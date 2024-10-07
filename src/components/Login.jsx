import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    
    if (!email || !password) {
      alert('يرجى ملء جميع الحقول.');
      return;
    }

    try {
      
      const response = await fetch('https://67039eeaab8a8f892730e4d0.mockapi.io/login');

      if (!response.ok) {
        throw new Error('فشل الاتصال بـAPI');
      }

      const users = await response.json();

      console.log('Data from API:', users); 
      
      const user = users.find(u => u.email === email && u.password === password);
      
      console.log('Matching user:', user);  

      if (user) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userEmail', user.email);  
        localStorage.setItem('nickname', user.nickname);       
      localStorage.setItem('username', user.username);      
      localStorage.setItem('profileImage', user.profileImage); 
        navigate('/home');
      } else {
        alert('الايميل أو كلمة المرور غير صحيحة. يرجى تسجيل حساب جديد.');
        setEmail('');   
        setPassword('');
      }
    } catch (error) {
      console.error('حدث خطأ أثناء تسجيل الدخول:', error);
      alert('حدث خطأ أثناء الاتصال بالسيرفر. يرجى المحاولة لاحقاً.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <img
          src="https://i.pinimg.com/564x/bb/32/92/bb329227a223e6c32f4c66077fc8181c.jpg"
          alt="Logo"
          className="w-1/2 mx-auto mb-4 rounded-lg"
        />
        <h2 className="text-2xl font-bold text-center mb-4">تسجيل الدخول</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-right">الايميل</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
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
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              placeholder="ادخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            تسجيل الدخول
          </button>
          <p className="text-center mt-4">
            ليس لديك حساب؟ <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/signup')}>تسجيل حساب جديد</span>
          </p>
        </form>
      </div>


      
    </div>
  );
}

export default Login;
