// import axios from "axios";
// const axios = require("axios");
import axios from "axios";

const sendMessage = async () => {
    const message = "Hello from Frontend!";
    try {
        const res = await axios.post("http://localhost:3000/send-message", {
            message,
        });
        console.log("Response from backend:", res.data);
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

const getMessage = async (req, res) => {
    try {
      const response = await axios.get("http://localhost:3000/get-message");
      console.log("Response from backend: ", response.data.tx);  
    } catch (error) {
        console.error(error);
    }
}

sendMessage();
// getMessage();
