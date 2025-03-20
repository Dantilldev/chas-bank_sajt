"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

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
    const newUser = { username, password };

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
    <div>
      <Link href="/">
        <button className="p-2 bg-blue-400 rounded-xl"> Back </button>
      </Link>
      <h1>Signup</h1>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
