import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import prisma from "../db/index.js";

export const listHouseholds = asyncHandler(async (req, res) => {
  const items = await prisma.household.findMany();
  res.json(new ApiResponse(200, items, "Households retrieved"));
});

export const getHousehold = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.household.findUnique({ where: { id } });
  if (!item) throw new ApiError(404, "Household not found");
  res.json(new ApiResponse(200, item, "Household retrieved"));
});

export const createHousehold = asyncHandler(async (req, res) => {
  const { userId, address, location } = req.body;
  const household = await prisma.household.create({ data: { userId, address, location } });
  res.status(201).json(new ApiResponse(201, household, "Household created"));
});

export const updateHousehold = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = { ...req.body };
  delete data.id;
  const household = await prisma.household.update({ where: { id }, data });
  res.json(new ApiResponse(200, household, "Household updated"));
});

export const deleteHousehold = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await prisma.household.delete({ where: { id } });
  res.json(new ApiResponse(200, null, "Household deleted"));
});
