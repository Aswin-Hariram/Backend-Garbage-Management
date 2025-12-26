import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import prisma from "../db/index.js";

export const listLocations = asyncHandler(async (req, res) => {
  const items = await prisma.location.findMany();
  res.json(new ApiResponse(200, items, "Locations retrieved"));
});

export const getLocation = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.location.findUnique({ where: { id } });
  if (!item) throw new ApiError(404, "Location not found");
  res.json(new ApiResponse(200, item, "Location retrieved"));
});

export const createLocation = asyncHandler(async (req, res) => {
  const { latitude, longitude, address, city, state, zipcode, userId, householdId, dustbinId } = req.body;
  const data = { latitude: Number(latitude), longitude: Number(longitude), address, city, state, zipcode };
  if (userId) data.userId = Number(userId);
  if (householdId) data.householdId = Number(householdId);
  if (dustbinId) data.dustbinId = Number(dustbinId);

  const item = await prisma.location.create({ data });
  res.status(201).json(new ApiResponse(201, item, "Location created"));
});

export const updateLocation = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const body = { ...req.body };
  const data = {};
  if (body.latitude !== undefined) data.latitude = Number(body.latitude);
  if (body.longitude !== undefined) data.longitude = Number(body.longitude);
  if (body.address !== undefined) data.address = body.address;
  if (body.city !== undefined) data.city = body.city;
  if (body.state !== undefined) data.state = body.state;
  if (body.zipcode !== undefined) data.zipcode = body.zipcode;
  if (body.userId !== undefined) data.userId = body.userId === null ? null : Number(body.userId);
  if (body.householdId !== undefined) data.householdId = body.householdId === null ? null : Number(body.householdId);
  if (body.dustbinId !== undefined) data.dustbinId = body.dustbinId === null ? null : Number(body.dustbinId);

  const item = await prisma.location.update({ where: { id }, data });
  res.json(new ApiResponse(200, item, "Location updated"));
});

export const deleteLocation = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await prisma.location.delete({ where: { id } });
  res.json(new ApiResponse(200, null, "Location deleted"));
});
