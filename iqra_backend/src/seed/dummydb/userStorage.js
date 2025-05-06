const dataset = {
  users: [
    {
      username: "admin",
      email: "admin@example.com",
      password: "admin123", // Consider hashing later
      isAdmin: true,
      createdAt: new Date(),
    },
    {
      username: "nafi",
      email: "nafi@example.com",
      password: "nafi1234", // Consider hashing later
      isAdmin: false,
      createdAt: new Date(),
    },
    {
      username: "guest",
      email: "guest@example.com",
      password: "guestpass", // Consider hashing later
      isAdmin: false,
      createdAt: new Date(),
    },
  ],
};

module.exports = dataset;
