import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import prisma from "../db/index.js";

export const listHomeCollections = asyncHandler(async (req, res) => {
  const items = await prisma.homeCollection.findMany();
  res.json(new ApiResponse(200, items, "Home collections retrieved"));
});

export const getHomeCollection = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.homeCollection.findUnique({ where: { id } });
  if (!item) throw new ApiError(404, "Home collection not found");
  res.json(new ApiResponse(200, item, "Home collection retrieved"));
});

export const createHomeCollection = asyncHandler(async (req, res) => {
  const { householdId, userId, quantity, collectionDate, collected } = req.body;
  const data = { householdId, userId, quantity: quantity?.toString?.() ?? String(quantity), collectionDate, collected };
  const item = await prisma.homeCollection.create({ data });
  res.status(201).json(new ApiResponse(201, item, "Home collection created"));
});

export const updateHomeCollection = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = { ...req.body };
  delete data.id;
  if (data.quantity) data.quantity = data.quantity.toString();
  const item = await prisma.homeCollection.update({ where: { id }, data });
  res.json(new ApiResponse(200, item, "Home collection updated"));
});

export const deleteHomeCollection = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await prisma.homeCollection.delete({ where: { id } });
  res.json(new ApiResponse(200, null, "Home collection deleted"));
});
