import { useState } from 'react';
import { useCart } from '../context/CartContext';

const categories = ['All', 'Sandwich', 'Baguette Farcie', 'Malfouf', 'Margherita Pizza', 'libanais'];

const allItems = [
  {
    name: 'Sandwich',
    category: 'Sandwich',
    price: 12.99 ,
    rating: 8.3,
    img: '/images/2c6ad89e49c27d4d7e8a5904ba547064.jpg'
  },
  {
    name: 'Baguette Farcie',
    category: 'Baguette Farcie',
    price: 9.99,
    rating: 8.7,
    img: '/images/18cd6c2ee0838a3facf4e172f2b0c38c.jpg'
  },
  {
    name: 'Malfouf',
    category: 'Malfouf',
    price: 10.99,
    rating: 8.1,
    img: '/images/503b9952fffc44143981d6b6a1b953cd.jpg'
  },
  {
    name: 'Margherita Pizza',
    category: 'Margherita Pizza',
    price: 11.49,
    rating: 9.0,
    img: '/images/697d4a96110f6cb0f26f55e34f28ff03.jpg'
  },
  {
    name: 'libanais',
    category: 'libanais',
    price: 13.50,
    rating: 8.5,
    img: '/images/cb008fb5ecfa0a0ff7543113cbb34990.jpg'
  }
];

function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  const filteredItems =
    selectedCategory === 'All'
      ? allItems
      : allItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="bg-[#0e0e0e] text-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-extrabold text-center mb-3">Top List</h2>
        <p className="text-center text-gray-400 mb-10">Our mainstay menu</p>

        {/* Category Tabs */}
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] rounded-3xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-gray-800"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-[#0e0e0e] shadow-lg -mt-16 mb-4"
              />
              <div className="text-center">
                <div className="text-yellow-400 text-sm mb-1">⭐ {item.rating}</div>
                <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-3">Best {item.category.toLowerCase()}</p>
              </div>
              <div className="flex justify-between items-center mt-4 px-2">
                <span className="font-bold text-white">{item.price}TND</span>
                <button
                  onClick={() => addToCart(item)}
                  aria-label={`Add ${item.name} to cart`}
                  className="bg-orange-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl hover:bg-orange-600"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuSection;
