const express = require("express");
const cors = require("cors");
const handlePuppeteerTask = require("./puppeteer");

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.post("/api/form", async (req, res) => {
  try {
    await handlePuppeteerTask(req.body);
    res.status(200).json({ message: "Form Submitted Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error triggering Puppeteer" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
