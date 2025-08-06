import toast from 'react-hot-toast';

export default function BookPage({ title, items, addToCart }) {
  return (
    <div
      className="w-full h-full text-white font-serif bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/1adfa1ad2534165c221b1a0c7d352206.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-70 p-8 rounded-xl max-w-[800px] w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400 border-b border-gray-600 pb-2">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-[#1f1f1f] hover:bg-[#2a2a2a] transition duration-300 p-4 rounded-xl w-[220px] h-[260px] flex flex-col items-center justify-between shadow-md border border-gray-700 hover:border-yellow-400"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-full border-2 border-yellow-500 shadow"
              />
              <div className="mt-3 text-center">
                <p className="font-semibold text-base">{item.name}</p>
                <p className="text-sm text-gray-400">{item.price.toFixed(2)}TND</p>
              </div>
              <button
                onClick={() => {
                  addToCart(item);
                  toast.success(`✅ ${item.name} added to cart!`);
                }}
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold mt-3"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
