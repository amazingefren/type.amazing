import * as winston from "winston";

const wc = winston.format.colorize();
// silly, debug, verbose, info, warn, error
const getLogger = (CATEGORY: string) =>
  winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: "silly",
        format: winston.format.combine(
          winston.format.timestamp({ format: "MM-DD-hh:mm:ss" }),
          /* winston.format.label({
          label: CATEGORY,
          message:true
        }), */
          winston.format.simple(),
          winston.format.printf(
            (msg) =>
              "\n" +
              "[" +
              wc.colorize(msg.level, msg.level) +
              "] [" +
              wc.colorize("verbose", CATEGORY) +
              "] " +
              msg.timestamp +
              "\n -- " +
              msg.message
          )
        ),
      }),
    ],
  });

export default getLogger;
