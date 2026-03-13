import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import youtubesearchapi from "youtube-search-api";

var YT_REGEX =
  /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const CreateStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());

    const isYt = data.url.match(YT_REGEX);

    if (!isYt) {
      return NextResponse.json(
        { message: "Wrong URL format" },
        { status: 400 },
      );
    }

    const extractedId = isYt[1];

    const res = await youtubesearchapi.GetVideoDetails(extractedId);

    const thumbnails = res.thumbnail.thumbnails;
    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1,
    );

    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
        title: res.title ?? "Can't find video",
        smallImg:
          thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : (thumbnails[thumbnails.length - 1].url ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWonR6gPeYtylVbOQrb6CaevHytysAPviVhRmiV7HKVl4qO8yti1AwzLo&s.jpg"),
        bigImg:
          thumbnails[thumbnails.length - 1]?.url ??
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWonR6gPeYtylVbOQrb6CaevHytysAPviVhRmiV7HKVl4qO8yti1AwzLo&s.jpg",
      },
    });

    return NextResponse.json({
      message: "Stream added successfully",
      id: stream.id,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Error while adding a stream" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");

  const streams = await prismaClient.stream.findMany({
    where: {
      userId: creatorId ?? "",
    },
  });

  return NextResponse.json(streams);
}
