import { FastifyInstance } from "fastify";
import userControllers from "@/controllers/user-controllers";

export default async function userRoutes(app: FastifyInstance) {
  app.post('create/', userControllers.createUser)
  app.post('login/', userControllers.loginUser)
}