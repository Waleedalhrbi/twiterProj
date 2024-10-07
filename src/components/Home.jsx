import React from 'react';
import LeftSidebar from './LeftSidebar';
import MainContent from './MainContent';
import RightSidebar from './RightSidebar';

function Home() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      <LeftSidebar />
      <MainContent />
      <RightSidebar />
    </div>
  );
}

export default Home;
