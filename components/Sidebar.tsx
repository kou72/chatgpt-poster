import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-600 min-h-screen pt-12">
      <div className="flex">
        <ul className="border-r">
          <li className="py-2 border-b">メニュー1</li>
          <li className="py-2 border-b">メニュー2</li>
          <li className="py-2 border-b">メニュー3</li>
        </ul>
      </div>
      {/* <input list="frameworks" />
      <datalist id="frameworks">
        <option value="React" />
        <option value="Vue" />
        <option value="Angular" />
      </datalist> */}
    </div>
  );
};

export default Sidebar;
