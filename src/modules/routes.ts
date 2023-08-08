import { app } from "../connections";
import authRoute from "./auth/route";
import emailRoute from "./email/route";

app.use("/auth", authRoute);
app.use("/email", emailRoute);
