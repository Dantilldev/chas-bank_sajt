"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useSession} from "../context/SessionContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {session, setSession} = useSession();

  const router = useRouter();

  async function handleLogIn(e) {
    e.preventDefault();

    const newUser = {username, password};

    try {
      const response = await fetch("http://localhost:4000/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      console.log(data);
      setSession(data);
      router.push("/accountPage");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("Error creating user", error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <Link href="/">
        <button className=" "> Back </button>
      </Link>
      <div className="border flex flex-col justify-center items-center w-full overflow-x-hidden mt-10">
        <h1 className="p-5">Login</h1>
        <form onSubmit={handleLogIn} className="flex flex-col">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
