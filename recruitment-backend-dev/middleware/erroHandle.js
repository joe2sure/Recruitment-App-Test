import { logEvent } from "./logEvent.js";


const errorHandle =  (err, req, res, next) => {

  console.error(err);
  res.status(500).send(err.message);
};

export default errorHandle;