import React, { useEffect, useState } from "react";
import User from "./User";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=500")
      .then((res) => res.json())
      .then((data) => setUsers(data?.results));
  }, []);

  console.log(users);
  return (
    <div className="flex justify-center my-5 w-full">

      <div className="max-w-full px-3">
      <h1 className="font-bold text-2xl p-5">User List</h1>
        <table className="w-full">
          <div className="flex justify-between font-bold p-5 mb-4 bg-base-200 rounded-lg">
            <h1>Photo</h1>
            <h1>Name</h1>
          </div>
          <tbody>
            {users.map((user, index) => (
              <tr className="flex justify-between px-3">
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle max-w-12 h-12 m-3">
                      <img
                        src={user?.picture?.large}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td className="text-end">
                  <div className="">
                    {user?.name?.title} {user?.name?.first} {user?.name?.last}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {user?.location?.state}, {user?.location?.country}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
