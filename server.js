import { createServer, Model, Response } from "miragejs";

createServer({
  models: {
    vans: Model,
    users: Model,
  },

  seeds(server) {
    server.create("user", {
      id: "123",
      email: "m@m.com",
      password: "123",
      name: "moo",
    });
  },

  routes() {
    this.namespace = "api";
    this.logging = false;
    this.timing = 1000;
    this.passthrough("https://firestore.googleapis.com/**");

    this.post("/login", (schema, request) => {
      const { email, password } = JSON.parse(request.requestBody);
      // This is an extremely naive version of authentication. Please don't
      // do this in the real world, and never save raw text passwords
      // in your database 😇
      const foundUser = schema.users.findBy({ email, password });
      if (!foundUser) {
        return new Response(
          401,
          {},
          { message: "No user with those credentials found!" },
        );
      }

      // At the very least, don't send the password back to the client 😅
      foundUser.password = undefined;
      return {
        user: foundUser,
        token: "Enjoy your pizza, here's your tokens.",
      };
    });
  },
});
