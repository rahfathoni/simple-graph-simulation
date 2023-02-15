if (process.env.NODE_ENV === "development") {
  require(`dotenv`).config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const router = require("./routes/index");
const errHandler = require("./middlewares/errHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`simple simulation, working port:`, PORT);
});
