import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Generera engångslösenord
function generateOTP() {
  // Generera en sexsiffrig numerisk OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

// Din kod här. Skriv dina arrayer
let users = [];
let accounts = [];
let sessions = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  const {username, password} = req.body;
  const user = {id: Date.now(), username, password};
  const account = {
    id: accounts.length + 1,
    userId: user.id,
    amount: 0,
  };
  accounts.push(account);
  users.push(user);
  res.json(user);
  console.log(users);
});

app.post("/sessions", (req, res) => {
  const {username, password} = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = generateOTP();
    const session = {
      userId: user.id,
      id: sessions.length + 1,
      token,
      username,
    };
    sessions.push(session);
    res.json(session);
  }
});

app.post("/me/accounts", async (req, res) => {
  const {token} = req.body; // Accept the token from the body
  const session = sessions.find((session) => session.token === token);

  // If the session is found, get the account
  if (session) {
    const {userId} = session;

    const account = accounts.find((account) => account.userId === userId);
    // If the account is found, return it and go to its personal page
    if (account) {
      res.json(account);
    } else {
      res.status(404).send("Account not found");
    }
  } else {
    res.status(404).send("Session not found");
  }
});

app.post("/me/accounts/transactions", async (req, res) => {
  const {depositAmount, token} = req.body;

  const session = sessions.find((session) => session.token === token);

  if (session) {
    const userId = session.userId;
    const account = accounts.find((account) => account.userId === userId);

    if (account && session) {
      account.amount += Number(depositAmount);
      res.json(account);
    } else {
      res.status(404).send("Account not found");
    }
  } else {
    res.status(404).send("Session not found");
  }

  // const session = sessions.find((session) => session.token === token);

  // const account = accounts.find((account) => account.userId === userId);
});

// Din kod här. Skriv dina routes:

// Starta servern
app.listen(port, () => {
  console.log(`Bankens backend körs på http://localhost:${port}`);
});

// app.delete("/todos", (req, res) => {
//   todos = []; // Reset the array
//   res.send("All todos have been deleted!");
// });

///////
