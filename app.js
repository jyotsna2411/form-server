const express = require("express");
const cors = require("cors");
const handlePuppeteerTask = require("./puppeteer");
const sendEmail = require("./email");
const path = require("path");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname) + "/views/index.html");
});
app.post("/", async (req, res) => {
  try {
    const result = await handlePuppeteerTask(req.body);
    if (result.success) {
      res.status(200).json({ message: "Form Submitted Successfully" });
      sendEmail(req.body);
    } else {
      console.error("Error Response:", result.error);
      res
        .status(422)
        .json({ message: "Form submission failed", error: result.error });
    }
  } catch (err) {
    console.error("Server Error:", err);
    res
      .status(500)
      .json({ message: "Error triggering Puppeteer", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
