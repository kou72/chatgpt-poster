import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-500 min-h-screen">
      <div className="flex">
        <ul className="border-r">
          <li className="py-2 border-b">メニュー1</li>
          <li className="py-2 border-b">メニュー2</li>
          <li className="py-2 border-b">メニュー3</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
