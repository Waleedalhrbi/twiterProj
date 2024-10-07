import React, { useState, useEffect } from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

function Profile() {
  const [userData, setUserData] = useState(null);  
  const [tweets, setTweets] = useState([]); 
  const [likedTweets, setLikedTweets] = useState([]);  
  const [activeTab, setActiveTab] = useState('posts'); 

   
  const fetchUserData = async () => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
      
      try {
        const response = await fetch('https://67039eeaab8a8f892730e4d0.mockapi.io/login');
        const users = await response.json();
        
       
        const currentUser = users.find(user => user.email === localStorage.getItem('userEmail'));
        if (currentUser) {
          setUserData(currentUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

 
  const fetchTweets = async () => {
    try {
      const response = await fetch('https://67039eeaab8a8f892730e4d0.mockapi.io/Tweets');
      const data = await response.json();
      setTweets(data);
      
      
      const liked = data.filter(tweet => tweet.liked);  
      setLikedTweets(liked);
      
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

 
  const toggleLike = async (tweetId, liked) => {
    const updatedTweets = tweets.map((tweet) =>
      tweet.id === tweetId ? { ...tweet, liked: !liked } : tweet
    );
    setTweets(updatedTweets);

    
    if (liked) {
      setLikedTweets(likedTweets.filter(tweet => tweet.id !== tweetId));
    } else {
      const likedTweet = tweets.find(tweet => tweet.id === tweetId);
      if (likedTweet) {
        setLikedTweets([ { ...likedTweet, liked: true }, ...likedTweets ]);
      }
    }

    try {
      await fetch(`https://67039eeaab8a8f892730e4d0.mockapi.io/Tweets/${tweetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ liked: !liked }),
      });
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

   
  useEffect(() => {
    fetchUserData();
    fetchTweets();
  }, []);

   
  const userTweets = tweets.filter(tweet => tweet.username === userData?.username);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      <LeftSidebar />
      <div className="w-full md:w-2/4 p-4">
        {!userData ? (
          <p>Loading...</p>
        ) : (
          <>
            
            <div className="bg-gray-800 rounded-lg p-4 mb-4 flex flex-col items-center">
              <img
                src={userData.profileImage}
                alt="Profile"
                className="rounded-full mb-2 w-28 h-28"
              />
              <h1 className="text-2xl font-bold">{userData.nickname}</h1>
              <p className="text-gray-400">@{userData.username}</p>
              <div className="flex space-x-4 mt-2">
                <span>102 متابعين</span>
                <span>12 متابع</span>
              </div>
              <button className="btn btn-info text-white mt-2">تعديل الملف الشخصي</button>
            </div>

             
            <div className="bg-gray-800 rounded-lg mb-4">
              <div className="flex justify-around p-2">
                <button
                  className={`flex-1 text-center py-2 border-b-2 ${activeTab === 'posts' ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => setActiveTab('posts')}
                >
                  المنشورات
                </button>
                <button
                  className={`flex-1 text-center py-2 border-b-2 ${activeTab === 'replies' ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => setActiveTab('replies')}
                >
                  الردود
                </button>
                <button
                  className={`flex-1 text-center py-2 border-b-2 ${activeTab === 'liked' ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => setActiveTab('liked')}
                >
                  المميزة
                </button>
                <button
                  className={`flex-1 text-center py-2 border-b-2 ${activeTab === 'more' ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => setActiveTab('more')}
                >
                  المزيد
                </button>
              </div>
            </div>

           
            <div className="bg-gray-800 p-4 rounded-lg">
              {activeTab === 'posts' && userTweets.length > 0 ? (
                userTweets.map((tweet) => (
                  <div key={tweet.id} className="bg-gray-800 p-4 rounded-lg mb-4 relative">
                   
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <img src={userData.profileImage} alt="User Avatar" className="rounded-full w-10 h-10" />
                        <div className="ml-2">
                          <span className="font-bold">{userData.username}</span> 
                          <span>{` @${userData.nickname}`}</span>  
                          <p className="text-gray-400 text-sm">{tweet.createdAt}</p>
                        </div>
                      </div>
                    
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#FFFFFF"
                        >
                          <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                        </svg>
                      </div>
                    </div>

                   
                    <p>{tweet.content}</p>

                   
                    <div className="flex justify-around mt-4 text-gray-400">
                      <button className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                          <path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                        </svg>
                        <span>تعليق</span>
                      </button>
                      <button className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                          <path d="M280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z" />
                        </svg>
                        <span>ريتويت</span>
                      </button>
                      <button className="flex items-center space-x-1" onClick={() => toggleLike(tweet.id, tweet.liked)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill={tweet.liked ? "#E0245E" : "#FFFFFF"}
                        >
                          <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                        </svg>
                        <span>إعجاب</span>
                      </button>
                      <button className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                          <path d="M200-160v-240h120v240H200Zm240 0v-440h120v440H440Zm240 0v-640h120v640H680Z" />
                        </svg>
                        <span>المشاهدات</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : activeTab === 'liked' && likedTweets.length > 0 ? (
                likedTweets.map((tweet) => (
                  <div key={tweet.id} className="bg-gray-800 p-4 rounded-lg mb-4 relative">
                    
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <img src={tweet.avatar} alt="User Avatar" className="rounded-full w-10 h-10" />
                        <div className="ml-2">
                          <span className="font-bold">{tweet.user}</span> <span>{tweet.username}</span>
                          <p className="text-gray-400 text-sm">{tweet.createdAt}</p>
                        </div>
                      </div>
                     
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#FFFFFF"
                        >
                          <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                        </svg>
                      </div>
                    </div>

                 
                    <p>{tweet.content}</p>

                  
                    <div className="flex justify-around mt-4 text-gray-400">
                      <button className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                          <path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                        </svg>
                        <span>تعليق</span>
                      </button>
                      <button className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                          <path d="M280-80 120-240l160-160 56 58-62 62h406v-160h80v240H274l62 62-56 58Zm-80-440v-240h486l-62-62 56-58 160 160-160 160-56-58 62-62H280v160h-80Z" />
                        </svg>
                        <span>ريتويت</span>
                      </button>
                      <button className="flex items-center space-x-1" onClick={() => toggleLike(tweet.id, tweet.liked)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill={tweet.liked ? "#E0245E" : "#FFFFFF"}  
                        >
                          <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                        </svg>
                        <span>إعجاب</span>
                      </button>
                      <button className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                          <path d="M200-160v-240h120v240H200Zm240 0v-440h120v440H440Zm240 0v-640h120v640H680Z" />
                        </svg>
                        <span>المشاهدات</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">لا توجد تغريدات لعرضها</p>
              )}
            </div>
          </>
        )}
      </div>
      <RightSidebar />
    </div>
  );
}

export default Profile;
