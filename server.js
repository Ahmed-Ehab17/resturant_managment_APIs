require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const rateLimit = require('express-rate-limit');

const PORT = process.env.PORT || 4000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

app.use(express.json({ limit: '20kb' }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message:
        'Too many accounts created from this IP, please try again after an hour',
    });

app.use('/admin', limiter);
app.use('/user', limiter);

app.use("/admin/auth", require("./routes/authRoutes"));
app.use("/admin/branch", require("./routes/branchRoutes"));
app.use("/admin/table", require("./routes/tableRoutes"));
app.use("/admin/employees", require("./routes/employeesRoutes"));
app.use("/admin/customers", require("./routes/customerRoutes"));
app.use("/admin/menu", require("./routes/menuRoutes"));
app.use("/admin/social", require("./routes/socialRoutes"));
app.use("/admin/supply", require("./routes/supplyRoutes"));
app.use("/user/order", require("./routes/orderRoutes"));
app.use("/user/delivery", require("./routes/deliveryRoutes"))

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
