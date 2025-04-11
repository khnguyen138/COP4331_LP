module.exports = {
  apps: [
    {
      name: "travelgenie",
      script: "server.js",
      env: {
        MONGODB_URI: "mongodb+srv://travelGenie:COP4331@cluster0.34abd.mongodb.net/",
        API_KEY: "AIzaSyDZvVZbufuKFhsFzILe7m9GmLcHgBIlK-M"
      }
    }
  ]
};
