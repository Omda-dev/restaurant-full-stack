import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../../api/axiosConfig";
import { useCart } from "../../Cart/useCart";
import Loading from "../../Loading/Loading"; 
import "../../Loading/Loading.css"; 
import "../Category.css";

export default function Desserts() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await axiosConfig.get("/menu-items");
        const categoryItems = (res.data || []).filter(
          (item) => item.category?.name === "Desserts"
        );

        setDishes(categoryItems);
        setCategories([
          "All",
          ...Array.from(
            new Set(
              categoryItems
                .map((item) => item.subcategory?.name)
                .filter((name) => !!name)
            )
          ),
        ]);
      } catch (err) {
        console.error("Error fetching desserts items:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchItems();
  }, []);

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.subcategory?.name === selectedCategory);

  const imageSrc = (dish) => {
    if (!dish?.image) return "";
    if (dish.image.startsWith("http")) return dish.image;
    return `http://127.0.0.1:8000/storage/${dish.image}`;
  };

  return (
    <div className="menu-page !bg-[#111827]">
      {loading && <Loading variant="gradient" />}
      <button className="back-btn !bg-[#8B0000] hover:!brightness-90 !shadow-black/40" onClick={() => navigate("/OurMenu")}>
        {"\u2b05"} Back to Menu
      </button>
      <div className="menu-header">
        <h1 className="!text-4xl !font-bold !text-[#F9FAFB]">Desserts {"\ud83c\udf70"}</h1>
        <p className="!text-[#9CA3AF]">
          Sweet treats to end your meal with a smile.
        </p>
      </div>

      <div className="menu-layout">
        <aside className="sidebar !bg-[#111827] !shadow-lg !shadow-black/10 !ring-1 !ring-[#D4AF37]">
          <h3 className="!text-[#D4AF37]">Categories</h3>
          <ul>
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={
                  selectedCategory === cat
                    ? "active !bg-[#D4AF37] !text-[#111827]"
                    : "!text-[#9CA3AF] hover:!bg-[rgba(212, 175, 55, 0.14)] hover:!text-[#D4AF37]"
                }
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        <div className="dishes">
          {filteredDishes.length > 0 ? (
            <div className="dishes-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDishes.map((dish) => (
                <div key={dish.id} className="dish-card group overflow-hidden rounded-xl bg-[#111827] p-4 sm:p-5 text-left shadow-lg shadow-black/10 ring-1 ring-[#D4AF37] transition-all hover:-translate-y-1 hover:shadow-xl" onClick={() => navigate(`/product/${dish.id}`)}>
                  {dish.image && <img className="w-full h-44 sm:h-52 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105" src={imageSrc(dish)} alt={dish.name} />}
                  <h3 className="mt-4 text-lg sm:text-xl font-bold text-[#F9FAFB]">{dish.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#9CA3AF] line-clamp-3">{dish.description}</p>
                  <span className="price mt-4 block text-lg sm:text-xl font-bold text-[#D4AF37]">${dish.price}</span>
                  <button
                    className="mt-4 w-full rounded-lg bg-[#8B0000] py-2 text-sm sm:text-base hover:brightness-90"
                    onClick={(e) => { e.stopPropagation(); addToCart(dish); }}
                  >
                    Order Now
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="!text-[#9CA3AF]">No dishes found for {selectedCategory}.</p>
          )}
        </div>
      </div>
    </div>
  );
}
