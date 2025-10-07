const express = require("express");
const app = express();
const port = 3000;

const easyRoutes = require("./routes/easy");
const phraseRoutes = require("./routes/phrases");

app.use(express.json());

app.use("/api/easy", easyRoutes);
app.use("/api/phrases", phraseRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});