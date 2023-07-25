import { app } from "./connections";
import "./middlewares";
import "./routes";

import { ApiResponse } from "./middlewares/response";

app.use(ApiResponse);