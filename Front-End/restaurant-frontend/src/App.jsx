import { Route, Routes } from "react-router-dom";
import Footer from "./components/Fotter/Footer";
import Nav from "./components/NavBar/Nav";
import Home from "./components/Home/Home";
import AboutUs from "./components/About/AboutUs";
import ContactUs from "./components/Contact/ContactUs";
import OurMenu from "./components/Menu/OurMenu";
import BreakFast from "./components/Menu/BreakFast/BreakFast";
import Lunch from "./components/Menu/Lunch/Lunch";
import Dinner from "./components/Menu/Dinner/Dinner";
import Drinks from "./components/Menu/Drinks/Drinks";
import Desserts from "./components/Menu/Desserts/Desserts";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import AdminLayout from "./components/AdminPanel/AdminLayout";
import Dashboard from "./components/AdminPanel/Dashboard/Dashboard";
import Users from "./components/AdminPanel/Users/Users";
import AdminMenu from "./components/AdminPanel/AdminMenu/AdminMenu";
import Bookings from "./components/AdminPanel/Bookings/Bookings";
import Orders from "./components/AdminPanel/Orders/Orders";
import OrderOnline from "./components/OrderOnline/OrderOnline";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { AuthProvider } from "./components/Auth/AuthContext"; 
import { CartProvider } from "./components/Cart/CartContext";
import useAxiosInterceptor from "./api/useAxiosInterceptor";  


console.log("APP RENDERED");
function App() {
  useAxiosInterceptor();

  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Nav />
          <main className="content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/OurMenu" element={<OurMenu />} />
              <Route path="/menu/breakfast" element={<BreakFast />} />
              <Route path="/menu/lunch" element={<Lunch />} />
              <Route path="/menu/dinner" element={<Dinner />} />
              <Route path="/menu/drinks" element={<Drinks />} />
              <Route path="/menu/desserts" element={<Desserts />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/order-online" element={<OrderOnline />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/ContactUs" element={<ContactUs />} />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="admin">
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="menu" element={<AdminMenu />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="orders" element={<Orders />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
