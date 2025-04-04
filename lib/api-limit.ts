import prismadb from "./prismadb";
import { currentUser } from "@clerk/nextjs/server";
import { MAX_API_LIMITS } from "@/constants";

export const increaseApiLimit = async () => {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    throw new Error("User is not authenticated");
  }
  const userApiLimit = await prismadb.userAPILimit.findUnique({
    where: {
      userId,
    },
  });
  if (userApiLimit) {
    await prismadb.userAPILimit.update({
      where: {
        userId: userId,
      },
      data: {
        count: userApiLimit.count + 1,
      },
    });
  } else {
    await prismadb.userAPILimit.create({
      data: { userId: userId, count: 1 },
    });
  }
};
export const checkApiLimit = async () => {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  const userApiLimit = await prismadb.userAPILimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!userApiLimit || userApiLimit.count < MAX_API_LIMITS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  const userApiLimit = await prismadb.userAPILimit.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!userApiLimit) {
    return 0;
  }
  return userApiLimit.count;
};
