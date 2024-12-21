require("dotenv").config();
require("express-async-errors");
// express

const express = require("express");
const app = express();
// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// database
const connectDB = require("./db/connect");

//  routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const orderRouter = require("./routes/orderRoutes");
const packageRouter = require("./routes/packageRoutes");
const creditRouter = require("./routes/creditsRoutes");
const chatRouter = require("./routes/chatRoutes");
const botRouter = require("./routes/botRoutes");
const serviceRouter = require("./routes/serviceRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many request",
    handler: (req, res) => {
      res.status(429).json({
        status: "fail",
        message: "You have made too many requests.",
      });
    },
  })
);
app.use(helmet());
app.use(cors(corsOptions));
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/products", productRouter);
// app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/packages", packageRouter);
app.use("/api/v1/credits", creditRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/bot", botRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
