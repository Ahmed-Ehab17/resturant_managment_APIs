require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/admin/auth", require("./routes/authRoutes"));
app.use("/admin/branch", require("./routes/branchRoutes"));
app.use("/admin/table", require("./routes/tableRoutes"));
app.use("/admin/employees", require("./routes/employeesRoutes"));
app.use("/admin/customers", require("./routes/customerRoutes"));
app.use("/admin/items", require("./routes/itemRoutes"));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

