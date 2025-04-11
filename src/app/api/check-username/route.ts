import { ProfileInfoModel } from "@/models/ProfileInfo";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await mongoose.connect(process.env.MONGODB_URI as string);
  
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username parameter is required' },
      { status: 400 }
    );
  }

  if (!/^[a-z0-9_]{3,20}$/.test(username)) {
    return NextResponse.json({ available: false });
  }

  const existingUser = await ProfileInfoModel.findOne({ username });
  return NextResponse.json({ available: !existingUser });
}