import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { connectDB } from "./config/database";
import swaggerSpec from "./config/swaggerconfig";
import { authenticateJWT, authorizeRoles } from "./Middleware/auth";
import homeRoutes from "./routes/HomeRoutes";
import loginRoutes from "./routes/LoginRoutes";
import productRoutes from "./routes/ProductRoutes";
import registerRoutes from "./routes/RegisterRoutes";
import profileRoutes from "./routes/profileRoutes";
import checkoutRoutes from "./routes/checkoutRoutes";
import notificationRoutes from "./routes/notificationRoutes";

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files
app.use("/uploads", express.static(uploadsDir));
app.use("/public", express.static(path.join(__dirname, "public")));

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to KrishiBazar API");
});

// Routes
app.use("/api/auth", loginRoutes);
app.use("/api/auth", registerRoutes);
app.use("/api/products", productRoutes); // Corrected route path
app.use("/api/product", productRoutes); // Fixed route path
app.use("/api/home", homeRoutes);
app.use("/api", profileRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/notifications", notificationRoutes);

// Admin and User routes
app.get("/admin", authenticateJWT, authorizeRoles("ADMIN"), (req, res) => {
  res.send("Admin content");
});

app.get("/user", authenticateJWT, (req, res) => {
  res.send("User content");
});

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);

// Connect to the database
connectDB()
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });