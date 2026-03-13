import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpovoteSchema = z.object({
  streamId: z.string(),
  userId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  const user = await prismaClient.user.findfirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 403,
      },
    );
  }


  try {
    const data = UpovoteSchema.parse(await req.json());
    await prismaClient.stream.update({
      data: {
        userId:user.id,
        streamId:data.streamId,
      },
    });
  } catch (error) {
     return NextResponse.json(
      {
        message: "Error while upvoting the stream",
      },
      {
        status: 403,
      },
    );
  }

}
