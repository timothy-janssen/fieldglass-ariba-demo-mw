module.exports = {
   FG_AUTH: "Basic " + process.env.FG_AUTH || "Your FG_AUTH",
   FG_APP_KEY_TOKEN: process.env.FG_APP_KEY_TOKEN || "Your FG_APP_KEY_TOKEN",
   FG_APP_KEY: process.env.FG_APP_KEY || "Your FG_APP_KEY",
   ARIBA_APP_KEY: process.env.ARIBA_APP_KEY || "Your ARIBA_APP_KEY"
};