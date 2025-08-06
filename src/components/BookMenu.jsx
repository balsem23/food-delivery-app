import { useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { useCart } from "../context/CartContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import BookCover from "./BookCover";
import BookPage from "./BookPage";

const menu = [
  {
    title: "🍕 Pizzas",
    items: [
      { name: "Pizza Margherita", price: 10.99, img: "/images/margherita.jpg" },
      { name: "Pizza Chawarma", price: 12.5, img: "/images/chawarma_pizza.jpg" },
      { name: "Pizza Escalope", price: 13.5, img: "/images/escalope_pizza.jpg" },
      { name: "Pizza Special", price: 14.99, img: "/images/special_pizza.jpg" },
    ],
  },
  {
    title: "🥖 Baguette Farcie",
    items: [
      { name: "Baguette Escalope", price: 9.99, img: "/images/baguette_escalope.jpg" },
      { name: "Baguette Kebab", price: 10.5, img: "/images/baguette_kebab.jpg" },
      { name: "Baguette Chawarma", price: 10.99, img: "/images/baguette_chawarma.jpg" },
    ],
  },
  {
    title: "🥪 Sandwich",
    items: [
      { name: "Sandwich Escalope", price: 7.99, img: "/images/sandwich_escalope.jpg" },
      { name: "Sandwich Chawarma", price: 8.5, img: "/images/sandwich_chawarma.jpg" },
      { name: "Sandwich Special", price: 9.99, img: "/images/sandwich_special.jpg" },
    ],
  },
  {
    title: "🌯 Malfouf",
    items: [
      { name: "Malfouf Escalope", price: 6.99, img: "/images/malfouf_escalope.jpg" },
      { name: "Malfouf Chawarma", price: 7.5, img: "/images/malfouf_chawarma.jpg" },
      { name: "Malfouf Special", price: 8.5, img: "/images/malfouf_special.jpg" },
    ],
  },
];


export default function BookMenu() {
  const { addToCart } = useCart();
  const bookRef = useRef();
  const [pageIndex, setPageIndex] = useState(0);

  const totalPages = menu.length + 2; // cover + content + back

  const handleFlip = (e) => {
    setPageIndex(e.data);
  };

  return (
<div className="relative min-h-screen flex items-center justify-center bg-[#111] text-white">
      {/* Arrows */}
      {pageIndex > 0 && (
        <button
          onClick={() => bookRef.current.pageFlip().flipPrev()}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl text-gray-500 hover:text-black animate-pulse z-10"
        >
          <FaArrowLeft />
        </button>
      )}
      {pageIndex < totalPages - 1 && (
        <button
          onClick={() => bookRef.current.pageFlip().flipNext()}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl text-gray-500 hover:text-black animate-pulse z-10"
        >
          <FaArrowRight />
        </button>
      )}

      {/* FlipBook */}
     
      <HTMLFlipBook
        width={window.innerWidth}
        height={window.innerHeight}
        size="fixed"
        minWidth={320}
        minHeight={500}
        maxWidth={1920}
        maxHeight={1080}
        showCover={true}
        className="book-shadow"
        onFlip={handleFlip}
        ref={bookRef}
      >
        {/* Cover */}
        <div className="bg-yellow-200">
          <BookCover />
        </div>

        {/* Pages */}
        {menu.map((section, index) => (
          <div key={index} className="bg-white">
            <BookPage title={section.title} items={section.items} addToCart={addToCart} />
          </div>
        ))}

        {/* Back Cover */}
        <div className="bg-[#1a1a1a] flex items-center justify-center text-center p-6 font-serif text-gray-400">
  <p>Thanks for checking our menu. We’re ready when you are! 🍽️</p>
</div>

      </HTMLFlipBook>
    </div>
  );
}
