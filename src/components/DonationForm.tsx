'use client';
import {createDonation} from "@/actions/donationActions";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";

export default function DonationForm({email}:{email:string}) {
  const [numberInValue, setNumberInValue] = useState('');
  const [crypto, setCrypto] = useState('btc');
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if (numberInValue) {
      const intValue = parseInt(numberInValue);
      if (intValue > 5 && intValue <= 1000) {
        setAmount(intValue);
      } else if (intValue === 1 || intValue === 3 || intValue === 5) {
        setAmount(intValue);
      } else {
        setAmount(1);
      }
    }
  }, [numberInValue]);

  async function handleFormSubmit(formData: FormData) {
    formData.set('amount', amount.toString());
    formData.set('crypto', crypto);
    formData.set('email', email);
    const url = await createDonation(formData);
    if (!url) return;
    if (url && window && window.location) {
      window.location.href = url;
    }
  }

  return (
    <form action={handleFormSubmit} className="max-w-md mx-auto">
      <div className="border border-yellow-300 bg-yellow-300/10 rounded-xl p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-2">
          <FontAwesomeIcon icon={faCoffee} className="text-lg min-w-[16px]" />
          <span className="text-gray-600">×</span>
        </div>
        <div className="flex items-center gap-2">
          {[1, 3, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {setAmount(value); setNumberInValue(value.toString());}}
              className={`flex-1 py-2 rounded-lg transition-all text-center ${
                amount === value 
                  ? 'bg-yellow-300 text-black font-bold' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}>
              {value}
            </button>
          ))}
          <input
            className="w-16 h-[42px] border border-yellow-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
            type="number"
            placeholder="10"
            min="1"
            max="1000"
            onChange={ev => setNumberInValue(ev.target.value)}
            value={numberInValue}
          />
        </div>
      </div>

      <div className="mt-4">
        <input 
          name="name" 
          type="text" 
          placeholder="Your name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
      </div>

      <div className="mt-4">
        <textarea 
          name="message" 
          placeholder="Say something nice"
          className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        ></textarea>
      </div>

      <div className="mt-4">
        <h3 className="text-xs text-gray-500 mb-2">Pay with selected crypto or with cc</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            {value: 'btc', label: 'BTC', name: 'BITCOIN'},
            {value: 'eth', label: 'ETH', name: 'Ethereum'},
            {value: 'ltc', label: 'LTC', name: 'Litecoin'}
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setCrypto(item.value)}
              className={`p-2 rounded-lg border transition-all flex flex-col items-center ${
                crypto === item.value
                  ? 'bg-yellow-100 border-yellow-300'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}>
              <span className="font-bold text-sm sm:text-base">{item.label}</span>
              <p className="text-xs mt-1 hidden sm:block">{item.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button 
          type="submit"
          className="bg-yellow-300 hover:bg-yellow-400 w-full rounded-xl py-3 px-4 font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
        >
          Support ${amount * 5}
        </button>
      </div>
    </form>
  );
}