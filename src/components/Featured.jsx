import { GiChefToque } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";
import { MdLocalGroceryStore } from "react-icons/md";

function Featured() {
  const features = [
    {
      icon: <MdLocalGroceryStore size={40} />,
      title: "Fresh Product",
      text: "We use only fresh ingredients sourced daily for quality taste.",
    },
    {
      icon: <GiChefToque size={40} />,
      title: "Skilled Chefs",
      text: "Our dishes are prepared by experienced chefs with love.",
      highlight: true,
    },
    {
      icon: <FaLeaf size={40} />,
      title: "Vegan Cuisine",
      text: "Delicious plant-based meals for a healthy lifestyle.",
    },
  ];

  return (
    <section className="bg-[#0e0e0e] text-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-yellow-400 uppercase tracking-wide mb-2">Services</p>
        <h2 className="text-4xl font-bold mb-12">Try Our Special Offer</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 text-center transition ${
                feat.highlight
                  ? "border border-yellow-400 bg-[#1a1a1a] shadow-lg"
                  : "bg-[#161616] border border-gray-800"
              }`}
            >
              <div className="mb-4 text-yellow-400 flex justify-center">
                {feat.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
              <p className="text-gray-400 text-sm">{feat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Featured;
