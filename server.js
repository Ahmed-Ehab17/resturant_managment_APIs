require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/admin/auth/login', express.static(path.join(__dirname, '../efood-admin.6amtech.com/public')))
app.use("/admin/auth", require("./routes/authRoutes"));
app.use("/admin/branch", require("./routes/branchRoutes"));
app.use("/admin/table", require("./routes/tableRoutes"));
app.use("/admin/employees", require("./routes/employeesRoutes"));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
