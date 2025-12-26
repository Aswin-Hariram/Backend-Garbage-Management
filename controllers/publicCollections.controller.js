import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import prisma from "../db/index.js";

export const listPublicCollections = asyncHandler(async (req, res) => {
  const items = await prisma.publicCollection.findMany();
  res.json(new ApiResponse(200, items, "Public collections retrieved"));
});

export const getPublicCollection = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.publicCollection.findUnique({ where: { id } });
  if (!item) throw new ApiError(404, "Public collection not found");
  res.json(new ApiResponse(200, item, "Public collection retrieved"));
});

export const createPublicCollection = asyncHandler(async (req, res) => {
  const { dustbinId, quantity, collectionDate, collected } = req.body;
  const data = { dustbinId, quantity: quantity?.toString?.() ?? String(quantity), collectionDate, collected };
  const item = await prisma.publicCollection.create({ data });
  res.status(201).json(new ApiResponse(201, item, "Public collection created"));
});

export const updatePublicCollection = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = { ...req.body };
  delete data.id;
  if (data.quantity) data.quantity = data.quantity.toString();
  const item = await prisma.publicCollection.update({ where: { id }, data });
  res.json(new ApiResponse(200, item, "Public collection updated"));
});

export const deletePublicCollection = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await prisma.publicCollection.delete({ where: { id } });
  res.json(new ApiResponse(200, null, "Public collection deleted"));
});
