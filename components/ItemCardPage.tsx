"use client";

export const ItemCardPage = () => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      {/* 画像 */}
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
      />

      {/* 本文 */}
      <div className="p-6 flex flex-col space-y-3">
        <h2 className="text-xl font-semibold">Living room Sofa</h2>
        <p className="text-gray-700">
          This sofa is perfect for modern tropical spaces, baroque inspired
          spaces, earthy toned spaces and for people who love a chic design with
          a sprinkle of vintage design.
        </p>
        <p className="text-2xl font-bold text-blue-600">$450</p>
      </div>

      {/* 区切り線 */}
      <hr className="border-gray-200" />

      {/* フッター */}
      <div className="p-4 flex space-x-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Buy now
        </button>
        <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
          Add to cart
        </button>
      </div>
    </div>
  );
};
