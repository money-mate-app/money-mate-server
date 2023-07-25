import { app } from "../connections";
import AuthRoute from "./auth"

app.get("/", (req, res, next) => {
  try {
    const pkgJson = require("../../package.json");
    const status = "active";
    const version = pkgJson.version;
    res.status(200).json({
      server: status,
      version,
    });
  } catch (err: any) {
    res.status(500).json({
      server: "inactive",
    });
  }
});

app.use("/auth", AuthRoute)
