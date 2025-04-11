'use server';
import { authOptions } from "@/lib/authOptions";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function saveProfile(formData: FormData) {
  await mongoose.connect(process.env.MONGODB_URI as string);

  const session = await getServerSession(authOptions);
  if (!session) throw new Error('You need to be logged in');
  const email = session.user?.email;

  const {
    username, displayName, bio, coverUrl, avatarUrl,
  } = Object.fromEntries(formData);

  if (typeof username !== 'string' || !/^[a-z0-9_]{3,20}$/.test(username)) {
    throw new Error('Username must be 3-20 characters, lowercase alphanumeric with underscores only');
  }

  const existingUser = await ProfileInfoModel.findOne({
    username,
    email: { $ne: email }
  });

  if (existingUser) {
    throw new Error('Username is already taken');
  }

  const profileInfoDoc = await ProfileInfoModel.findOne({ email });
  if (profileInfoDoc) {
    profileInfoDoc.set({ username, displayName, bio, coverUrl, avatarUrl });
    await profileInfoDoc.save();
  } else {
    await ProfileInfoModel.create({ username, displayName, bio, email, coverUrl, avatarUrl });
  }

  return { success: true };
}