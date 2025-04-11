'use server';
import {DonationModel} from "@/models/Donation";
import {ProfileInfoModel} from "@/models/ProfileInfo";
import axios from "axios";
import mongoose from "mongoose";

export async function createDonation(formData: FormData): Promise<string|false> {
  // 1. Save to our database
  const {amount, name, message, crypto, email} = Object.fromEntries(formData);
  await mongoose.connect(process.env.MONGODB_URI as string);
  
  
  const donationDoc = await DonationModel.create({
    amount,
    name,
    message,
    crypto,
    email,
    status: 'pending' // Adding status field for better tracking
  });

  const profileInfoDoc = await ProfileInfoModel.findOne({email});
  if (!profileInfoDoc) {
    return false;
  }

  // 2. Create NowPayments invoice
  const endpoint = 'https://api.nowpayments.io/v1/invoice';
  const apiKey = process.env.NOWPAYMENTS_API_KEY as string;
  
  const data = {
    price_amount: parseInt(amount as string) * 5,
    price_currency: 'usd',
    pay_currency: (crypto as string).toLowerCase(),
    ipn_callback_url: `${process.env.NEXTAUTH_URL}/api/nowpayments/callback?id=${donationDoc._id}`,
    order_id: donationDoc._id.toString(),
    order_description: `Donation from ${name}`,
    customer_email: email as string,
    success_url: `${process.env.NEXTAUTH_URL}/${profileInfoDoc.username}?donation_success=1`,
    cancel_url: `${process.env.NEXTAUTH_URL}/${profileInfoDoc.username}?donation_canceled=1`,
    is_fixed_rate: true,       // Lock the exchange rate
    is_fee_paid_by_user: false  // User pays the transaction fees
  };

  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    // Update donation with payment URL
    await DonationModel.findByIdAndUpdate(donationDoc._id, {
      paymentUrl: response.data.invoice_url
    });

    return response.data.invoice_url;
  } catch (e) {
    console.error('NowPayments API Error:');
    if (axios.isAxiosError(e)) {
      console.error('Status:', e.response?.status);
      console.error('Data:', e.response?.data);
      // Update donation with error status
      await DonationModel.findByIdAndUpdate(donationDoc._id, {
        status: 'failed',
        error: e.response?.data?.message || 'Payment creation failed'
      });
    } else {
      console.error('Error:', e);
    }
    return false;
  }
}