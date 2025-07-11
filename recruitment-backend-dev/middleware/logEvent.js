import { format } from "date-fns";
import fsPromises from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const logEvent = async (message, logName) => {
  const date = format(new Date(), "yyyy MMM dd\tHH:mm:ss");
  const logItem = `${uuid()}\t${date}\t${message}\n`;
  try {
    await fsPromises.appendFile(path.join(__dirname, logName), logItem);
  } catch (err) {
    console.error("Failed to write log:", err);
  }
};

export const logger = (req, res, next) => {
  console.log(`${req.method} ${req.path}`);

  next();
};
