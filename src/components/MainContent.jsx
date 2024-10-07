import React, { useState, useEffect } from 'react';

function MainContent() {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTweetId, setSelectedTweetId] = useState(null);

  
  const nickname = localStorage.getItem('nickname');
  const username = localStorage.getItem('username');
  const profileImage = localStorage.getItem('profileImage');

 
  const fetchTweets = async () => {
    try {
      const response = await fetch('https://67039eeaab8a8f892730e4d0.mockapi.io/Tweets');
      const data = await response.json();
      setTweets(data.reverse());  
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

 
  useEffect(() => {
    fetchTweets();
  }, []);

  
  const postTweet = async () => {
    if (!newTweet.trim()) return;  

    const tweetData = {
      content: newTweet,
      createdAt: new Date().toLocaleString(),
      user: nickname,      
      username: username,   
      avatar: profileImage || 'https://via.placeholder.com/40',  
      liked: false,
    };

    try {
      const response = await fetch('https://67039eeaab8a8f892730e4d0.mockapi.io/Tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tweetData),
      });
      const newTweetResponse = await response.json();
      setTweets([newTweetResponse, ...tweets]);  
      setNewTweet('');  
    } catch (error) {
      console.error('Error posting tweet:', error);
    }
  };

   
  const deleteTweet = async () => {
    if (!selectedTweetId) return;

    try {
      await fetch(`https://67039eeaab8a8f892730e4d0.mockapi.io/Tweets/${selectedTweetId}`, {
        method: 'DELETE',
      });
      setTweets(tweets.filter((tweet) => tweet.id !== selectedTweetId));  
      setShowDeleteModal(false);  
    } catch (error) {
      console.error('Error deleting tweet:', error);
    }
  };

   
  const toggleLike = async (tweetId, liked) => {
    const updatedTweets = tweets.map((tweet) =>
      tweet.id === tweetId ? { ...tweet, liked: !liked } : tweet
    );
    setTweets(updatedTweets);

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

  return (
    <div className="w-full md:w-2/4 p-4">
      
       
      <div className="bg-gray-800 p-4 rounded-lg mb-4 flex justify-between items-center">
        <textarea
          placeholder="!ماذا يحدث؟"
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value)}
          className="bg-gray-800 text-white flex-grow focus:outline-none resize-none text-right"
          rows="1"
        />
        <button className="btn btn-info text-white ml-2" onClick={postTweet}>نشـر</button>
      </div>

      
      {tweets.map((tweet) => (
        <div key={tweet.id} className="bg-gray-800 p-4 rounded-lg mb-4 relative">
          
           
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img src={tweet.avatar} alt="User Avatar" className="rounded-full h-20 " />
              <div className="ml-2">
                <span className="font-bold">{tweet.user}</span> <span>@{tweet.username}</span>
                <p className="text-gray-400 text-sm">{tweet.createdAt}</p>
              </div>
            </div>
           
            
            {tweet.username === username && (
              <div className="flex items-center">
                <svg
                  onClick={() => {
                    setSelectedTweetId(tweet.id);
                    setShowDeleteModal(true);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#FFFFFF"
                  className="cursor-pointer hover:bg-gray-700 p-1 rounded-full"
                >
                  <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                </svg>
              </div>
            )}
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
                className="cursor-pointer hover:fill-red-500 transition-colors duration-300"
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
      ))}

    
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-white mb-4">هل أنت متأكد أنك تريد حذف هذه التغريدة؟</p>
            <div className="flex justify-around">
              <button
                className="btn btn-error text-white"
                onClick={deleteTweet}
              >
                نعم
              </button>
              <button
                className="btn btn-info text-white"
                onClick={() => setShowDeleteModal(false)}
              >
                لا
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent;
