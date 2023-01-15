const { createLogger, format, transports } = require('winston');

const rootLogger = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
    transports: [
      new transports.File({ filename: './logs/student.log' }),
      new transports.Console(),
    ],
});

module.exports = {rootLogger}