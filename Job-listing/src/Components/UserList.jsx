import React from "react";

const UserList = ({ users, selectedUser, setSelectedUser }) => {
  return (
    <div className="w-1/3 border-r overflow-y-auto">
      <h2 className="text-xl font-bold p-4">Users</h2>
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className={`p-4 cursor-pointer hover:bg-gray-200 ${
            selectedUser?._id === user._id ? "bg-gray-300" : ""
          }`}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;
