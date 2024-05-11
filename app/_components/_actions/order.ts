"use server";

import { db } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  return db.order.create({ data });
};
