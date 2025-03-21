"use client";
import Link from "next/link";
import {useState, useEffect} from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  async function getUsers() {
    try {
      const response = await fetch("http://localhost:4000/users", {
        method: "GET",
      });
      const data = await response.json();
      setUsers(data);
      console.log(users);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  function handleCreateUser(e) {
    e.preventDefault();
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      alert("User already exists");
      setPassword("");
      setUsername("");
      return;
    }
    const newUser = {username, password};

    try {
      fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      alert("User created");
      console.log("created user", newUser);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("Error creating user", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <Link href="/">
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 transition-colors">
              Back to home
            </button>
          </Link>
        </div>

        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md "
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center">
          <Link href="/login" className="text-blue-600   hover:underline p-2">
            Logga in här
          </Link>
        </p>
      </div>
    </div>
  );
}
