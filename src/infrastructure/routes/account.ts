import { Router } from "express";
import container from "../config/ioc-container";

const accountRoutes = (asyncHandler) => {
  const router = Router();

  router.get("/clientes", asyncHandler((req, res) => container.get('account').list(req, res)));
  router.get("/cliente/:id", asyncHandler((req, res) => container.get('account').show(req, res)));
  router.post("/cliente", asyncHandler((req, res) => container.get('account').create(req, res)));
  router.put("/cliente", asyncHandler((req, res) => container.get('account').edit(req, res)));
  router.delete("/cliente/:id", asyncHandler((req, res) => container.get('account').delete(req, res)));

  return router;
};

export default accountRoutes;
