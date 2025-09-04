const express = require("express");
const testRoutes = require("./testRoutes.js");

const app = express();
const PORT = 3000;

app.use("/test", testRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
