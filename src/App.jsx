import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Blog from "./pages/Blog";
import Contact from './pages/Contact';
import JoinUs from './pages/JoinUs';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Services from './pages/Services';
import Worldwide from './pages/Worldwide';
import Loader from './components/Loader';
import BlogDetails from './pages/BlogDetails';
// import SupportWidget from './components/SupportWidget';
import FloatingSupportButton from './widgets/helpdesk/FloatingSupportButton.jsx';
import CWCAssistant from './components/CWCAssistant';
import products from './data/products.json';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/worldwide" element={<Worldwide />} />
      </Routes>
      <Footer />
         <FloatingSupportButton />
         <CWCAssistant products={products} brandName="CWC" />
      {/* <SupportWidget apiBaseUrl={import.meta.env.VITE_API_BASE_URL || ''} /> */}
    </BrowserRouter>
  );
}