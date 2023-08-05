import { app } from "../connections";
import authRoute from "./auth/route";

app.use("/auth",authRoute);