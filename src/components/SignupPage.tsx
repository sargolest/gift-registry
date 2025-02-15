import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Share, Gift, Plus, X } from 'lucide-react';

interface Gift {
  id: number;
  name: string;
  price: string;
  reserved: boolean;
}

const GiftListing = () => {
  const [gifts, setGifts] = useState<Gift[]>([
    { id: 1, name: 'ست قهوه خوری', price: '۲,۵۰۰,۰۰۰ تومان', reserved: false },
    { id: 2, name: 'ماشین لباسشویی', price: '۲۵,۰۰۰,۰۰۰ تومان', reserved: false },
    { id: 3, name: 'سرویس قابلمه', price: '۵,۰۰۰,۰۰۰ تومان', reserved: true }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newGift, setNewGift] = useState({
    name: '',
    price: ''
  });

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewGift({
      ...newGift,
      [e.target.name]: e.target.value
    });
  };

  const handleAddGift = (e: FormEvent) => {
    e.preventDefault();
    
    const newGiftItem: Gift = {
      id: gifts.length + 1,
      name: newGift.name,
      price: newGift.price + ' تومان',
      reserved: false
    };

    setGifts([...gifts, newGiftItem]);
    setNewGift({ name: '', price: '' });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">لیست هدایا</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              <Plus className="h-5 w-5" />
              افزودن هدیه
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <Share className="h-5 w-5" />
              اشتراک‌گذاری
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">افزودن هدیه جدید</h2>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleAddGift} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">نام هدیه</label>
                  <input
                    type="text"
                    name="name"
                    value={newGift.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">قیمت (تومان)</label>
                  <input
                    type="text"
                    name="price"
                    value={newGift.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    dir="rtl"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  افزودن
                </button>
              </form>
            </div>
          </div>
        )}
        
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