import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import prisma from "../db/index.js";

export const listAssignments = asyncHandler(async (req, res) => {
  const items = await prisma.collectionAssignment.findMany();
  res.json(new ApiResponse(200, items, "Assignments retrieved"));
});

export const getAssignment = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.collectionAssignment.findUnique({ where: { id } });
  if (!item) throw new ApiError(404, "Assignment not found");
  res.json(new ApiResponse(200, item, "Assignment retrieved"));
});

export const createAssignment = asyncHandler(async (req, res) => {
  const { collectionType, collectorId, assignedAt, completedAt, homeCollectionId, publicCollectionId } = req.body;
  const data = { collectionType, collectorId, assignedAt, completedAt };
  if (collectionType === "HOME") data.homeCollectionId = homeCollectionId;
  else if (collectionType === "PUBLIC") data.publicCollectionId = publicCollectionId;
  const item = await prisma.collectionAssignment.create({ data });
  res.status(201).json(new ApiResponse(201, item, "Assignment created"));
});

export const updateAssignment = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const body = { ...req.body };
  const data = {};
  if (body.collectionType) data.collectionType = body.collectionType;
  if (body.collectorId) data.collectorId = body.collectorId;
  if (body.assignedAt) data.assignedAt = body.assignedAt;
  if (body.completedAt) data.completedAt = body.completedAt;
  if (body.collectionType === "HOME" && body.homeCollectionId) data.homeCollectionId = body.homeCollectionId;
  if (body.collectionType === "PUBLIC" && body.publicCollectionId) data.publicCollectionId = body.publicCollectionId;
  const item = await prisma.collectionAssignment.update({ where: { id }, data });
  res.json(new ApiResponse(200, item, "Assignment updated"));
});

export const deleteAssignment = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await prisma.collectionAssignment.delete({ where: { id } });
  res.json(new ApiResponse(200, null, "Assignment deleted"));
});
