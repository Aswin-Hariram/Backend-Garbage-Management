import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import prisma from "../db/index.js";

export const listUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(new ApiResponse(200, users, "Users retrieved successfully"));
});

export const getUser = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new ApiError(404, "User not found");
  res.json(new ApiResponse(200, user, "User retrieved"));
});

export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role = "USER", phone } = req.body;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new ApiError(400, "Email already in use");
  const user = await prisma.user.create({ data: { username, email, password, role, phone } });
  res.status(201).json(new ApiResponse(201, user, "User created"));
});

export const updateUser = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const data = { ...req.body };
  delete data.id;
  const user = await prisma.user.update({ where: { id }, data });
  res.json(new ApiResponse(200, user, "User updated"));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  await prisma.user.delete({ where: { id } });
  res.json(new ApiResponse(200, null, "User deleted"));
});
