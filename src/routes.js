import { randomUUID } from "node:crypto";
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();
// Capturando query params em nossa rota

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      console.log('req.query',req.query)
      const { search } = req.query
      const users = database.select("users", search ?  {
        name:search,
        email:search
      } : null);
      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body;
      const user = {
        name,
        email,
        id: randomUUID(),
      };

      database.insert("users", user);
      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
        const { id } = req.params
        database.delete("users",id);
        return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
        const { id } = req.params
        const { name, email} = req.body;
        database.update("users",id,{name,email});
        return res.writeHead(200).end();
    },
  },
];