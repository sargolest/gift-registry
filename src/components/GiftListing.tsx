import React, { useState } from 'react';
import { Share, Gift } from 'lucide-react';

const GiftListing = () => {
  const [gifts, setGifts] = useState([
    { id: 1, name: 'ست قهوه خوری', price: '۲,۵۰۰,۰۰۰ تومان', reserved: false },
    { id: 2, name: 'ماشین لباسشویی', price: '۲۵,۰۰۰,۰۰۰ تومان', reserved: false },
    { id: 3, name: 'سرویس قابلمه', price: '۵,۰۰۰,۰۰۰ تومان', reserved: true }
  ]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'لیست هدایای من',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('لینک کپی شد!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">لیست هدایا</h1>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Share className="h-5 w-5" />
            اشتراک‌گذاری
          </button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gifts.map((gift) => (
            <div key={gift.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="h-6 w-6 text-blue-600" />
                <h3 className="font-bold text-lg text-gray-900">{gift.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{gift.price}</p>
              <button 
                className={`w-full py-2 px-4 rounded-md ${
                  gift.reserved 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                disabled={gift.reserved}
              >
                {gift.reserved ? 'رزرو شده' : 'رزرو هدیه'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftListing;