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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="border border-gray-300 rounded-lg bg-white shadow-sm flex flex-col justify-center items-center w-full p-6">
          <div className="flex flex-row justify-between w-full">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Log in
            </h1>
            <Link href="/">
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700">
                ← Back to home
              </button>
            </Link>
          </div>
          <form
            onSubmit={handleLogIn}
            className="flex flex-col w-full space-y-4"
          >
            <input
              type="text"
              placeholder="Användarnamn"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="px-4 py-2 border border-gray-300 rounded-md "
            />

            <input
              type="password"
              placeholder="Lösenord"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="px-4 py-2 border border-gray-300 rounded-md "
            />

            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 "
            >
              Logga in
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            <Link href="/signup" className="text-blue-600 hover:underline">
              Registrera dig
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
