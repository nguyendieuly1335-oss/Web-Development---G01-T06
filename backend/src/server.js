require("module-alias/register");
const app = require("@src/app.js");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
