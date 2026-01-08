import express from "express"; // needed for web server
import cors from "cors"; // connects frontend to backend
import dotenv from "dotenv"; // needed to get CLIENT_ID
import { OAuth2Client } from "google-auth-library"; // needed to use google library

// loads environment variables
dotenv.config();

const app = express();

// allows requests to access this server
app.use(cors());

// makes data from json available
app.use(express.json());

// creates instance of Google login
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// see if its an authorized user, and respond to frontend as such
app.post("/api/auth/google", async (req, res) => {
  try {
    const token = req.body.token;
    console.log("\n token = " + token);
    // see if this is a valid Google Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // info about user logging in
    const payload = ticket.getPayload();

    // get the user's email
    const email = payload.email;

    const validEmails = [
      "rossitermackenzie@gmail.com",
      "alicemilea04@gmail.com",
      "jmuaoesecretary@gmail.com",
      "aoegammaalpha@gmail.com",
    ];

    //todo: go back and coordinate this with alice's code
    // if email is not an authorized email
    if (!validEmails.includes(email)) {
      // adding something to check if its lowercase would be nice but not 100% necessary
      // tell browser it’s forbidden
      res.status(403);

      // send JSON response
      res.json({ authorized: false });

      console.log("login not authorized");
      return;
    }

    // email is an authorized email
    console.log("login authorized");
    res.json({ authorized: true });
  } catch (err) {
    console.error(err);

    // tell browser it’s unauthorizes
    res.status(401);

    // send JSON response
    res.json({ authorized: false });
  }
});

// start backend
app.listen(4000, () => {
  console.log("Auth server running on port 4000");
});
