"use client";
import React, {useEffect, useState} from "react";
import {useSession} from "../context/SessionContext";
import Link from "next/link";
import {BASE_URL} from "@/utils/baseUrl";

export default function AccountPage() {
  const {session} = useSession();
  const [account, setAccount] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);

  async function getAccount() {
    if (!session || !session.token) {
      console.log("No session token found");
      return;
    }

    try {
      const response = await fetch(`http://${BASE_URL}:4000/me/accounts`, {
        method: "POST", // Use POST to match the backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({token: session.token}), // Send token in the request body
      });

      if (!response.ok) {
        console.log("Error fetching account", response.statusText);
        return;
      }

      const data = await response.json();
      setAccount(data);
      console.log("Account data: ", data);
    } catch (error) {
      console.log("Error fetching account:", error);
    }
  }

  async function handleDeposit() {
    if (depositAmount <= 0) {
      console.log("Invalid deposit amount");
      return;
    }

    try {
      const response = await fetch(
        `http://${BASE_URL}:4000/me/accounts/transactions`,
        {
          method: "POST", // Use POST to match the backend
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({depositAmount, token: session.token}), // Send Deposit amount in the request body
        }
      );

      if (!response.ok) {
        console.log("Error fetching account", response.statusText);
        console(typeof depositAmount);

        return;
      }
      setDepositAmount("");
      getAccount();
      // const data = await response.json();
    } catch (error) {
      console.log("Error fetching account:", error);
    }
  }

  useEffect(() => {
    getAccount();
  }, [session]); // Re-fetch account info if session changes

  // useEffect(() => {
  //   handleDeposit();
  // }, [session]); // Re-fetch account info if session changes

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-md ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My account</h1>
          <Link href="/">
            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700">
              Logout
            </button>
          </Link>
        </div>

        {session ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <p className="text-xl mb-6">
              Welcome back,{" "}
              <span className="font-semibold">{session.username}</span>!
            </p>

            {account ? (
              <div className="space-y-6 ">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h2 className="text-lg font-medium text-gray-800 mb-3">
                    Account details:
                  </h2>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">User-ID:</span>
                    <span className="font-medium">{account.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Saldo:</span>
                    <span className="text-xl font-bold text-green-700">
                      {account.amount} SEK
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Do a deposit
                  </h3>
                  <div className="space-y-3">
                    <input
                      value={depositAmount}
                      type="number"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                    <button
                      onClick={handleDeposit}
                      className="w-full bg-yellow-500 hover:bg-amber-500 p-3 text-white font-semibold rounded-lg"
                    >
                      Deposit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600">Loading...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <p className="text-gray-700 mb-4">
              You need to log in to see your account
            </p>
            <Link href="/login">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
