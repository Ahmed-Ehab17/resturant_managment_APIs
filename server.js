require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsoptions = require("./config/corsOptions");

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/admin/auth", require("./routes/authRoutes"));
app.use("/admin/branch", require("./routes/branchRoutes"));
app.use("/admin/table", require("./routes/tableRoutes"));
app.use("/admin/employees", require("./routes/employeesRoutes"));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
