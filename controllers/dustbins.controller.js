import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import prisma from "../db/index.js";

export const listDustbins = asyncHandler(async (req, res) => {
  const items = await prisma.dustbin.findMany();
  res.json(new ApiResponse(200, items, "Dustbins retrieved"));
});

export const getDustbin = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.dustbin.findUnique({ where: { id } });
  if (!item) throw new ApiError(404, "Dustbin not found");
  res.json(new ApiResponse(200, item, "Dustbin retrieved"));
});

export const createDustbin = asyncHandler(async (req, res) => {
  const { adminId, location, status, lastCleaned } = req.body;
  const dustbin = await prisma.dustbin.create({ data: { adminId, location, status, lastCleaned } });
  res.status(201).json(new ApiResponse(201, dustbin, "Dustbin created"));
});

export const updateDustbin = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = { ...req.body };
  delete data.id;
  const dustbin = await prisma.dustbin.update({ where: { id }, data });
  res.json(new ApiResponse(200, dustbin, "Dustbin updated"));
});

export const deleteDustbin = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await prisma.dustbin.delete({ where: { id } });
  res.json(new ApiResponse(200, null, "Dustbin deleted"));
});
