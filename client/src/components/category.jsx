import React from "react";
import anniversary from "../assets/anniversary.jpg";
  import birthday from "../assets/birthday.jpeg";
  import giftsForHim from "../assets/gifts-for-him.jpeg";
  import giftsForHer from "../assets/gifts-for-her.jpeg";
  import giftsForKids from "../assets/gifts-for-kids.jpeg";
 



const RingsCategory = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-4 gap-6 ">
        {/* SHOP BY STYLE */}
        <div>
          <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Style</h3>
          {["Engagement", "Solitaire", "Casual", "Classic", "Navratna", "Mangalsutra Ring", "Couple Bands", "Eternity", "Three Stone"]
            .map((style, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{style}</p>
            ))}
        </div>

        {/* SHOP BY MATERIAL */}
        <div>
          <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Material</h3>
          {["Diamond", "Platinum", "Gemstone", "Gold"].map((material, i) => (
            <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{material}</p>
          ))}
        </div>

        {/* SHOP FOR */}
        <div>
          <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop For</h3>
          {["Under ₹10K", "₹10K - ₹20K", "₹20K - ₹30K", "₹30K - ₹50K", "₹50K - ₹75K", "Above ₹75K", "Women", "Men", "Kids"]
            .map((filter, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{filter}</p>
            ))}
        </div>

        {/* SHOP BY OCCASION */}
        <div>
          <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Occasion</h3>
          {["Daily Wear", "Casual Outings", "Festive", "Anniversary", "Wedding"]
            .map((occasion, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{occasion}</p>
            ))}
        </div>
      </div>
</div>
  );
};




export const EarringsCategory = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-4 gap-6">
        {/* SHOP BY STYLE */}
        <div>
          <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Style</h3>
          {["Studs", "Jhumka", "Dangles", "Hoops", "Sui Dhaga", "Solitaire", "Navratna"]
            .map((style, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{style}</p>
            ))}
        </div>

        {/* SHOP BY MATERIAL */}
        <div>
          <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Material</h3>
          {["Diamond", "Platinum", "Gemstone", "Gold"].map((material, i) => (
            <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{material}</p>
          ))}
        </div>

        {/* SHOP FOR */}
        <div>
          <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop For</h3>
          {["Under ₹10K", "₹10K - ₹20K", "₹20K - ₹30K", "₹30K - ₹50K", "₹50K - ₹75K", "Above ₹75K", "Women", "Men", "Kids"]
            .map((filter, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{filter}</p>
            ))}
        </div>

        {/* SHOP BY OCCASION */}
        <div>
          <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Occasion</h3>
          {["Daily Wear", "Casual Outings", "Festive", "Anniversary", "Wedding"]
            .map((occasion, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-1000 cursor-pointer transition">{occasion}</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export const NecklaceCategory = () => {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-4 gap-6">
          {/* SHOP BY STYLE */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Style</h3>
            {[
              "Collar", "Charm", "Layered", "Delicate", 
              "Pendant Necklace", "Lariat"
            ].map((style, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{style}</p>
            ))}
          </div>
  
          {/* SHOP BY MATERIAL */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Material</h3>
            {["Diamond", "Platinum", "Gemstone", "Gold"].map((material, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{material}</p>
            ))}
          </div>
  
          {/* SHOP FOR */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop For</h3>
            {[
              "Under ₹20K", "₹20K - ₹30K", "₹30K - ₹50K", 
              "₹50K - ₹75K", "₹75K - ₹100K", "Above ₹100K"
            ].map((filter, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{filter}</p>
            ))}
          </div>
  
          {/* SHOP BY OCCASION */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Occasion</h3>
            {[
              "Daily Wear", "Casual Outings", "Festive", 
              "Anniversary", "Wedding"
            ].map((occasion, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{occasion}</p>
            ))}
          </div>
        </div>
      </div>
    );
  };



  export const BanglesAndBraceletsCategory = () => {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-4 gap-6">
          {/* SHOP BY STYLE */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Style</h3>
            {[
              "Kada", "Chain Bracelets", "Delicate Bangles", 
              "Flexi Bracelets", "Oval Bracelets", 
              "Eternity Bangles", "Tennis Bracelets"
            ].map((style, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{style}</p>
            ))}
          </div>
  
          {/* SHOP BY MATERIAL */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Material</h3>
            {["Diamond", "Platinum", "Gemstone", "Gold"].map((material, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{material}</p>
            ))}
          </div>
  
          {/* SHOP FOR */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop For</h3>
            {[
              "Under ₹10K", "₹10K - ₹20K", "₹20K - ₹30K", 
              "₹30K - ₹50K", "₹50K - ₹75K", "Above ₹75K", 
              "Women", "Men", "Kids"
            ].map((filter, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{filter}</p>
            ))}
          </div>
  
          {/* SHOP BY OCCASION */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Occasion</h3>
            {[
              "Daily Wear", "Casual Outings", "Festive", 
              "Anniversary", "Wedding"
            ].map((occasion, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{occasion}</p>
            ))}
          </div>
        </div>
      </div>
    );
  };
  



  export const SolitairesCategory = () => {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* SHOP BY STYLE */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Style</h3>
            {[
              "Rings", "Earrings", "Pendants", 
              "Necklace", "Nosepins"
            ].map((style, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{style}</p>
            ))}
          </div>
  
          {/* LOOSE DIAMONDS */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Loose Diamonds</h3>
            {[
              "Round", "Princess", "Heart", 
              "Pear", "Marquise", "Emerald"
            ].map((cut, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{cut}</p>
            ))}
          </div>
  
          {/* SHOP FOR */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop For</h3>
            {[
              "Under ₹20K", "₹20K - ₹30K", "₹30K - ₹50K", 
              "₹50K - ₹75K", "Above ₹75K", "Women", "Men"
            ].map((filter, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{filter}</p>
            ))}
          </div>
        </div>
      </div>
    );
  };



  export const MangalsutrasAndPendantsCategory = () => {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-4 gap-6">
          {/* SHOP BY STYLE */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Style</h3>
            {[
              "Mangalsutra Ring", "Mangalsutra with Chain", "Mangalsutra Bracelets", 
              "Mangalsutra Chains", "Solitaire Mangalsutra", "Initial Pendants",
              "Solitaire Pendants", "Pendants with Chain", "Casual Pendants"
            ].map((style, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{style}</p>
            ))}
          </div>
  
          {/* SHOP BY MATERIAL */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Material</h3>
            {[
              "Diamond", "Platinum", "Gemstone", "Gold"
            ].map((material, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{material}</p>
            ))}
          </div>
  
          {/* SHOP FOR */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop For</h3>
            {[
              "Under ₹20K", "₹20K - ₹30K", "₹30K - ₹50K", 
              "₹50K - ₹75K", "₹75K - ₹100K", "Above ₹100K", "Women", "Men", "Kids"
            ].map((filter, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{filter}</p>
            ))}
          </div>
  
          {/* SHOP BY OCCASION */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Shop by Occasion</h3>
            {[
              "Daily Wear", "Casual Outings", "Festive", "Anniversary", "Wedding"
            ].map((occasion, i) => (
              <p key={i} className="text-gray-700 hover:text-gray-900 cursor-pointer transition">{occasion}</p>
            ))}
          </div>
        </div>
      </div>
    );
  };
  

  export const OtherJewelleriesCategory = () => {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* FEATURED COLLECTION */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Featured Collection</h3>
            {[
              { name: "Peacock", img: "/images/peacock.jpg" },
              { name: "Chafa", img: "/images/chafa.jpg" },
              { name: "Butterfly", img: "/images/butterfly.jpg" },
              { name: "Evil Eye", img: "/images/evil-eye.jpg" },
              { name: "Miracle Plate", img: "/images/miracle-plate.jpg" },
              { name: "Kyra", img: "/images/kyra.jpg" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 cursor-pointer hover:text-gray-900 transition">
                {/* <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg" /> */}
                <p className="text-gray-700">{item.name}</p>
              </div>
            ))}
          </div>
  
          {/* ACCESSORIES */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Accessories</h3>
            {[
              { name: "Nose Pin", img: "/images/nose-pin.jpg" },
              { name: "For Watch", img: "/images/for-watch.jpg" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 cursor-pointer hover:text-gray-900 transition">
                {/* <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg" /> */}
                <p className="text-gray-700">{item.name}</p>
              </div>
            ))}
          </div>
  
          {/* CHAINS */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-3 text-gray-800">Chains</h3>
            {[
              { name: "Dailywear Chains", img: "/images/dailywear-chains.jpg" },
              { name: "Fancy Chains", img: "/images/fancy-chains.jpg" },
              { name: "Festive Chains", img: "/images/festive-chains.jpg" },
              { name: "Platinum Chains", img: "/images/platinum-chains.jpg" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 cursor-pointer hover:text-gray-900 transition">
                {/* <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg" /> */}
                <p className="text-gray-700">{item.name}</p>
              </div>
            ))}
            <p className="mt-3 text-blue-500 cursor-pointer hover:underline">View All</p>
          </div>
        </div>
      </div>
    );
  };



 
  const giftItems = [
    { name: "Anniversary Gifts", price: "₹10K", img: anniversary },
    { name: "Birthday Gifts", price: "₹5K", img: birthday },
    { name: "Gifts for Him", price: "₹9K", img: giftsForHim },
    { name: "Gifts for Her", price: "₹6K", img: giftsForHer },
    { name: "Gifts for Kids", price: "₹5K", img: giftsForKids },
  ];
  
 export const GiftCategories = () => {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-5 gap-6">
          {giftItems.map((item, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <img src={item.img} alt={item.name} className="w-full h-60 object-cover" />
              <div className="p-3 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">Starting at {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

  export default RingsCategory;
