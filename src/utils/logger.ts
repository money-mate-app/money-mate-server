import { createLogger, transports, format } from "winston";
import { __dev__ } from "../constants";

const symbolMap: any = {
  debug: "\u001b[32m\u221A",
  error: "\u001b[31m\u00D7",
  info: "\u001b[36m\u221A",
  warn: "\u001b[33m\u221A",
};

const levelMap: any = {
  debug: "debug",
  error: "error",
  info: "info",
  warn: "SQL",
};

function logData(info: any, next: any) {
  const symbol: string = symbolMap[info.level];
  console.log(`${symbol} { level: ${levelMap[info.level]} }\u001b[0m`, {
    message: info.message,
  });
  next();
}
const options = {
  transports: [
    new transports.Console({
      level: !__dev__ ? "info" : "debug",
      log: logData,
      format: format.combine(format.prettyPrint()),
    }),
    new transports.File({
      filename: "./src/logs/debug.log",
      level: __dev__ ? "debug" : "error",
      format: format.combine(format.prettyPrint()),
      maxsize: 10000000,
      maxFiles: 10,
      zippedArchive: false,
    }),
  ],
};

const logger = createLogger(options);
export default logger;
