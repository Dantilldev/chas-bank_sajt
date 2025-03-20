"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "../context/SessionContext";

export default function AccountPage() {
  const { session } = useSession();
  const [account, setAccount] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);

  async function getAccount() {
    if (!session || !session.token) {
      console.log("No session token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/me/accounts", {
        method: "POST", // Use POST to match the backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: session.token }), // Send token in the request body
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
        "http://localhost:4000/me/accounts/transactions",
        {
          method: "POST", // Use POST to match the backend
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ depositAmount, token: session.token }), // Send Deposit amount in the request body
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
    <div>
      <h1>Welcome to your account!</h1>
      {session ? (
        <div>
          <p>Welcome back, {session.username}!</p>
          {account ? (
            <div className="flex flex-col gap-4">
              <h2>Your Account Details</h2>
              <p>Account ID: {account.id}</p>
              <p>Balance: {account.amount} SEK</p>
              {/* You can add additional details or functionality like depositing money */}
              <input
                value={depositAmount}
                type="number"
                className="w-56 p-2 border border-gray-300 rounded-xl"
                placeholder="Enter amount to deposit..."
                onChange={(e) => setDepositAmount(e.target.value)}
              />
              <button
                onClick={handleDeposit}
                className="w-56 bg-amber-400 p-2 text-white rounded-xl"
              >
                Click to Deposit money
              </button>
            </div>
          ) : (
            <p>Loading your account...</p>
          )}
        </div>
      ) : (
        <p>Please log in to view your account details.</p>
      )}
    </div>
  );
}
