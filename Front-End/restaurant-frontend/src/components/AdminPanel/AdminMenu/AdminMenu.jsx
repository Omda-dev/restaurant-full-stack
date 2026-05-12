import { useEffect, useState } from "react";
import axiosConfig from "../../../api/axiosConfig";
import Loading from "../../Loading/Loading";
import "../../Loading/Loading.css";

const initialForm = {
  id: "",
  name: "",
  description: "",
  price: "",
  category_id: "",
  subCategory: "",
  image: null,
};

const AdminMenu = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const [catsRes, subsRes] = await Promise.all([
        axiosConfig.get("/categories"),
        axiosConfig.get("/subcategories"),
      ]);
      setCategories(catsRes.data);
      setSubcategories(subsRes.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
       setLoading(false);
    }
  };

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await axiosConfig.get("/menu-items");
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching menu:", err);
    } finally {
       setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category_id" ? { subCategory: "" } : {}),
    }));
  };

  const handleFileChange = (e) =>
    setForm((prev) => ({ ...prev, image: e.target.files[0] || null }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("id", editingItem?.id || form.id || "");
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category_id", form.category_id);
      formData.append("subCategory", form.subCategory);

      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      if (editingItem) {
        formData.append("_method", "PUT");
        await axiosConfig.post(`/menu-items/${editingItem.id}`, formData);
      } else {
        await axiosConfig.post("/menu-items", formData);
      }

      setForm(initialForm);
      setEditingItem(null);
      await Promise.all([fetchMenu(), fetchCategories()]);
    } catch (err) {
      console.error("Error saving item:", err.response?.data || err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axiosConfig.delete(`/menu-items/${id}`);
      fetchMenu();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const categorySubcategories = subcategories.filter(
    (sub) => String(sub.category_id) === String(form.category_id)
  );

  const imageSrc = (item) => {
    if (!item?.image) return "";
    if (item.image.startsWith("http")) return item.image;
    return `http://127.0.0.1:8000/storage/${item.image}`;
  };

  return (
    <div className="admin-menu min-h-screen bg-gray-100 p-4 sm:p-6">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800">
        <span className="text-indigo-600">{"\u2728"}</span> Manage Menu
      </h2>

      <form
        onSubmit={handleSubmit}
        className="menu-form mb-8 flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md sm:p-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-32"
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="subCategory"
            list="subcategory-options"
            placeholder="Select or type subcategory"
            value={form.subCategory}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
          <datalist id="subcategory-options">
            {categorySubcategories.map((sub) => (
              <option key={sub.id} value={sub.name} />
            ))}
          </datalist>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input w-full border border-gray-300 rounded-md px-3 py-2"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-6 py-2 text-white shadow transition-transform hover:-translate-y-1 hover:bg-indigo-700 sm:w-auto"
          >
            {editingItem ? "Update" : "Add"} Item
          </button>
        </div>
      </form>

<div className="relative w-full overflow-x-auto rounded-lg shadow-md min-h-[200px]">

  {loading && (
    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-10">
      <Loading variant="fire" text="Loading menu ..." />
    </div>
  )}

  <table className="w-full min-w-[800px] bg-white shadow-md rounded-lg overflow-hidden text-sm sm:text-base">
    <thead className="bg-gray-200">
      <tr>
        <th className="px-3 sm:px-4 py-2 text-left text-black whitespace-nowrap">Name</th>
        <th className="px-3 sm:px-4 py-2 text-left text-black whitespace-nowrap">Category</th>
        <th className="px-3 sm:px-4 py-2 text-left text-black whitespace-nowrap">Subcategory</th>
        <th className="px-3 sm:px-4 py-2 text-left text-black whitespace-nowrap">Price</th>
        <th className="px-3 sm:px-4 py-2 text-left text-black whitespace-nowrap">Image</th>
        <th className="px-3 sm:px-4 py-2 text-left text-black whitespace-nowrap">Actions</th>
      </tr>
    </thead>

    <tbody>
      {items.map((i) => (
        <tr key={i.id} className="border-b hover:bg-gray-50 text-black">

          <td className="px-3 sm:px-4 py-2 whitespace-nowrap">{i.name}</td>
          <td className="px-3 sm:px-4 py-2 whitespace-nowrap">{i.category?.name}</td>
          <td className="px-3 sm:px-4 py-2 whitespace-nowrap">{i.subcategory?.name}</td>
          <td className="px-3 sm:px-4 py-2 whitespace-nowrap">${i.price}</td>

          <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
            {i.image && (
              <img
                src={imageSrc(i)}
                alt={i.name}
                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md"
              />
            )}
          </td>

          <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
            <div className="flex flex-wrap sm:flex-nowrap gap-2">

              <button
                onClick={() => {
                  setEditingItem(i);
                  setForm({
                    id: i.id,
                    name: i.name,
                    description: i.description || "",
                    price: i.price,
                    category_id: String(i.category_id || ""),
                    subCategory: i.subcategory?.name || i.subCategory?.name || "",
                    image: null,
                  });
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded-md shadow text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(i.id)}
                className="bg-[#8B0000] hover:brightness-90 text-white px-2 sm:px-3 py-1 rounded-md shadow text-sm"
              >
                Delete
              </button>

            </div>
          </td>

        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default AdminMenu;
