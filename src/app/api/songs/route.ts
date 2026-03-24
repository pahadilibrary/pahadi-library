import { NextResponse } from "next/server";
import { getAllSongs, getRegions, getOccasions } from "@/lib/songs";

export async function GET() {
  const songs = getAllSongs();
  const regions = getRegions();
  const occasions = getOccasions();
  return NextResponse.json({ songs, regions, occasions });
}
