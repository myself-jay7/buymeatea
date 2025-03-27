'use server';
import ProfileInfoForm from "@/components/ProfileInfoForm";
import {authOptions} from "@/lib/authOptions";
import {Donation, DonationModel} from "@/models/Donation";
import {ProfileInfoModel} from "@/models/ProfileInfo";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import { redirect } from "next/navigation";


export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect("/");
  }

  const email = session.user.email;
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc = JSON.parse(JSON.stringify(
    await ProfileInfoModel.findOne({email})
  ));

  const donations:Donation[] = await DonationModel.find({paid:true, email});
  const total = donations.reduce((current, d) => current + d.amount * 5, 0);

  return (
    <div className="max-w-2xl mx-auto px-4 mt-14">
      <ProfileInfoForm profileInfo={profileInfoDoc}/>
      <div className="bg-yellow-300/20 border-2 border-yellow-300 p-4 rounded-xl flex items-center gap-2 my-4 justify-between">
        <div className="flex items-center gap-2">
          Total money received: <span className="text-2xl">${total}</span>
        </div>
        <a
          className="bg-yellow-300 px-4 py-2 rounded-lg flex items-center gap-2"
          href="mailto:jayaramjr07@gmail.com">
          Request a payout
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
    </div>
  );
}