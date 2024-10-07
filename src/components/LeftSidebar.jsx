import React from 'react';

function LeftSidebar() {
  return (
    <div className="hidden md:flex w-full md:w-1/4 p-4 bg-black flex-col space-y-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="بحث"
          className="input input-bordered w-full bg-gray-800 text-white text-right"
        />
      </div>
      <div className="bg-gray-800 p-4 rounded-lg text-right">
        <h2 className="font-bold mb-4"> Premium الاشتراك في</h2>
        <p>اشترك لاكتشاف ميزات جديدة وفي حال كنت مؤهلًا، ستتسلّم حصة من إيرادات الإعلانات</p>
        <button className="btn btn-info mt-4 text-white">اشترك</button>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="font-bold mb-4">ماذا يحدث</h2>
        <ul>
          <li className="mb-2">Big3 Season 7 - رياضة</li>
          <li className="mb-2">الراتب الأساسي</li>
          <li className="mb-2">#سلطان_عود_المران_حادث</li>
          <li className="mb-2">#أرامكو</li>
        </ul>
      </div>
    </div>
  );
}

export default LeftSidebar;
