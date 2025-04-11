'use server';
import DonationForm from "@/components/DonationForm";
import DonationStatus from "@/components/DonationStatus";
import {Donation, DonationModel} from "@/models/Donation";
import {ProfileInfo, ProfileInfoModel} from "@/models/ProfileInfo";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";

type Props = {
  params: {
    username: string;
  };
}

export default async function SingleProfilePage({params}:Props) {
  const username = params.username;
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc:ProfileInfo|null = await ProfileInfoModel.findOne({username});

  if (!profileInfoDoc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold">404 - Profile not found</h1>
          <p className="mt-2">The requested profile doesn&apos;t exist</p>
        </div>
      </div>
    );
  }

  const donations:Donation[] = await DonationModel.find({paid:true, email: profileInfoDoc.email});

  return (
    <div className="min-h-screen bg-gray-50">
      <DonationStatus />
      
      <div className="w-full h-48 md:h-64">
        <Image
          src={profileInfoDoc.coverUrl || 'https://res.cloudinary.com/deellz8mv/image/upload/v1743098674/c437dc65-3916-4361-a7f6-46b7e64cd8e5_kpqlv6.jpg'}
          width={2048}
          height={2048}
          alt="cover image"
          className="object-cover object-center h-48 md:h-64 w-full"
          priority
        />
      </div>
      
      {/* Main Content Container */}
      <div className="max-w-6xl px-4 mx-auto relative -mt-16 md:-mt-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 md:gap-6">
          <div className="size-24 sm:size-32 md:size-36 overflow-hidden rounded-xl border-2 border-white shadow-md">
            <Image
              src={profileInfoDoc.avatarUrl}
              width={256}
              height={256}
              alt="profile image"
              className="size-full object-cover object-center"
              priority
            />
          </div>
          
          <div className="mb-1 sm:mb-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              {profileInfoDoc.displayName}
            </h1>
            <h2 className="flex gap-1 items-center text-sm sm:text-base">
              <FontAwesomeIcon icon={faCoffee} className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>/</span>
              <span>{profileInfoDoc.username}</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-8">
          {/* About Section */}
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
            <h3 className="font-semibold text-lg md:text-xl">
              About {profileInfoDoc.username}
            </h3>
            <p className="mt-2 text-gray-700">
              {profileInfoDoc.bio || "No bio provided yet."}
            </p>
            
            <hr className="my-4 md:my-6 border-gray-200" />
            
            <h3 className="font-semibold text-lg md:text-xl">Recent supporters:</h3>
            {donations.length === 0 ? (
              <p className="text-gray-500 mt-2">No recent donations yet</p>
            ) : (
              <div className="mt-2 space-y-3 md:space-y-4">
                {donations.map((donation, index) => (
                  <div key={index} className="py-2">
                    <h3 className="text-sm md:text-base">
                      <span className="font-semibold">{donation.name}</span>
                      {' '}
                      <span className="text-gray-500">
                        bought you {donation.amount > 1 ? `${donation.amount} coffees` : 'a coffee'}
                      </span>
                    </h3>
                    {donation.message && (
                      <p className="bg-gray-100 p-2 rounded-md text-sm md:text-base mt-1">
                        {donation.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm sticky top-4">
            <DonationForm email={profileInfoDoc.email} />
          </div>
        </div>
      </div>
    </div>
  );
}