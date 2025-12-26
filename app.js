import express from "express";
import errorHandler from "./middleware/error.middleware.js";

import usersRoutes from "./routes/users.route.js";
import householdsRoutes from "./routes/households.route.js";
import dustbinsRoutes from "./routes/dustbins.route.js";
import homeCollectionsRoutes from "./routes/homeCollections.route.js";
import publicCollectionsRoutes from "./routes/publicCollections.route.js";
import assignmentsRoutes from "./routes/collectionAssignments.route.js";
import locationsRoutes from "./routes/locations.route.js";

export const app = express();

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/households", householdsRoutes);
app.use("/api/dustbins", dustbinsRoutes);
app.use("/api/home-collections", homeCollectionsRoutes);
app.use("/api/public-collections", publicCollectionsRoutes);
app.use("/api/assignments", assignmentsRoutes);
app.use("/api/locations",locationsRoutes);

app.get("/", (req, res) => res.send("Express app is running 🚀"));

app.use(errorHandler);
