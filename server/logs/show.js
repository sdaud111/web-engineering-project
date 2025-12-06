const chalk = require("chalk");

function getTime() {
    const now = new Date();
    return now.toISOString().split("T")[1].split(".")[0]; // HH:MM:SS
}

function show(log_origin, log_type, log, color = "white") {
    const timestamp = getTime();
    const origin = log_origin.toUpperCase();
    
    let logColor;
    if (chalk[color]) {
        logColor = chalk[color]; // supports green, greenBright, etc.
    } else {
        logColor = chalk.white; // fallback if color not valid
    }

    console.log(logColor(`[${timestamp}] [${origin}] [${log_type.toUpperCase()}]: ${log}`));
}

module.exports = show;
