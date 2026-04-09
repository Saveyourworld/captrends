import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser'; 

// --- Global Constants ---
const BUSINESS_PHONE = "+2349064543927"; 
const DISPLAY_PHONE = "0906 454 3927";   

// --- Mock Data ---
const PRODUCTS = [
  {
    id: 1,
    name: "Jinja Herbal Extract (750ml)",
    price: 22000,
    originalPrice: 30000,
    image: "/750ml.JPG", 
  },
  {
    id: 2,
    name: "Jinja Herbal Extract (350ml)",
    price: 10000,
    originalPrice: 15000,
    image: "/350ml.JPG",
  },
  {
    id: 3,
    name: "Four Jinja Herbal Extracts (750ml) + One (350ml) Free",
    price: 87999,
    originalPrice: 98000,
    image: "/four.JPG",
  },
  {
    id: 4,
    name: "Three Jinja Herbal Extracts (750ml) + One (350ml)",
    price: 69999,
    originalPrice: 76000,
    image: "/three.JPG",
  },
  {
    id: 5,
    name: "One Jinja Herbal Extract (750ml) + Two (350ml)",
    price: 39999,
    originalPrice: 44000,
    image: "/two.AVIF", 
  }
];

const JINJA_FUNCTIONS = [
  "Has anti-tumour & anti-cancer effects",
  "Repairs damaged cells",
  "Energizes and boosts body metabolism",
  "Helps reduce pain and inflammation",
  "Boosts blood levels",
  "Treats pile",
  "For the treatment of Arthritis and toothache",
  "Supports joint & bone health",
  "Lowers blood sugar levels in diabetics",
  "Protects the liver against toxins",
  "Has antimalarial & antimicrobial effects",
  "Helps treat skin infections",
  "Helps in respiratory and stomach disorders",
  "Improves blood flow & blood lipid profile",
  "May reduce muscle spasms in epilepsy",
  "Improves cognitive function",
  "Supports the body in self-healing process",
  "Helps in weight Loss",
  "Eases Asthma and Allergies",
  "Helps in the treatment of Stroke",
  "Shrink Fibroids and Ovarian cyst",
  "Fights Bacteria, Fungi, Viral Parasite, Diseases and Infection",
  "Promote Kidney and Liver Health",
  "Deals with ulcer",
  "Treat Cataracts, Glaucoma and Improves vision",
  "Regulate ceased and irregular menstruation",
  "Treats Low/No Sperm Count, Weak Erection, Poor Ejaculation and Boost Sperm Count",
  "Treat Hormonal imbalance",
  "Boost Ovulation & Treat Endometriosis",
  "And Lots More.........."
];

const REVIEWS = [
  { id: 1, name: "Bayo M.", text: "I was always weak, dealing with constant infections and low energy. After using Jinja Herbal Extract, my strength came back, my body feels clean, and even my digestion improved. It truly works from inside out!", rating: 5 },
  { id: 2, name: "Osinachi K.", text: "I suffered from joint pain and inflammation for months. Within a short time of taking this, the pain reduced drastically and I can move freely again. It feels like my body is healing itself!.", rating: 5 },
  { id: 3, name: "Miriam B.", text: "I was honestly surprised! Not only is the product effective, but the delivery was super fast. I got mine quicker than expected, started using it immediately, and I’m already seeing results. 100% reliable!", rating: 4 }
];

const TESTIMONY_IMAGES = [
  "/testi1.jpg", "/testi2.jpg", "/testi3.jpg", "/test4.jpg",
  "/test5.JPG", "/test6.JPG", "/test7.JPG", "/test8.JPG"
];

const FEED_POSTS = [
  { id: 1, type: "video", src: "/feed.mp4" },
  { id: 2, type: "video", src: "/feed1.mp4" }, 
  { id: 3, type: "video", src: "/feed2.mp4" },
  { id: 4, type: "video", src: "/feed3.mp4" },
];

// --- Sub-Component: Lazy Video Loader for Performance ---
const LazyVideo = ({ src }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px" });

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={placeholderRef} className="w-full h-full relative bg-gray-800">
      {shouldLoad ? (
        <video 
          src={src} 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="metadata"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 animate-fade-in-up" 
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product, index, onAddToCart }) => {
  const [qty, setQty] = useState(1);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
      <div className="relative h-48 w-full mb-6 overflow-hidden flex items-center justify-center bg-gray-50 rounded-xl">
        <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-bl-xl z-10 shadow-md">SALE</div>
        <img src={product.image} alt={product.name} className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500 p-2" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center group-hover:text-green-700 transition-colors leading-tight">
        {product.name}
      </h3>
      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="flex justify-between items-end mb-6">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 line-through font-medium">₦{product.originalPrice.toLocaleString('en-NG')}</span>
            <span className="text-2xl font-extrabold text-green-700 leading-none">₦{product.price.toLocaleString('en-NG')}</span>
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded bg-white shadow-sm text-gray-600 hover:text-green-700 hover:bg-green-50 font-bold transition-colors">-</button>
            <span className="w-8 text-center font-semibold text-gray-800">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded bg-white shadow-sm text-gray-600 hover:text-green-700 hover:bg-green-50 font-bold transition-colors">+</button>
          </div>
        </div>
        <button onClick={() => onAddToCart(product, qty)} className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex justify-center items-center gap-2 group-hover:bg-orange-500">
          <span>Add to Cart</span>
          <span className="text-xl leading-none transform group-hover:translate-x-2 transition-transform">→</span>
        </button>
      </div>
    </div>
  );
};

const HerbalLandingPage = () => {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('landing');
  const [isFunctionsExpanded, setIsFunctionsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '', additional: '' });
  
  const [newsletterStatus, setNewsletterStatus] = useState({ loading: false, message: '', type: '' });

  const handleAddToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prevCart, { ...product, quantity }];
    });
    setView('checkout'); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0)); 
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    
    const cartItems = cart.map(item => `- ${item.quantity}x ${item.name} (₦${(item.price * item.quantity).toLocaleString('en-NG')})`).join('\n');
    const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const originalTotal = cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
    const totalSaved = originalTotal - orderTotal;
    
    const templateParams = {
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_email: formData.email,
      customer_address: formData.address,
      customer_note: formData.additional || 'None',
      order_summary: cartItems,
      order_total: orderTotal.toLocaleString('en-NG'),
      total_saved: totalSaved.toLocaleString('en-NG')
    };

    emailjs.send(
      'service_en2f61w',         
      'template_4kax278',  
      templateParams,
      'ZxgXzfvmWUdRBFtBs'        
    ).catch(err => console.error("Email backup failed, but WhatsApp continuing:", err));

    const message = `*NEW HERBAL ORDER* 🌿\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.address}\nNote: ${formData.additional || 'None'}\n\n*Order Summary:*\n${cartItems}\n\n*Total:* ₦${orderTotal.toLocaleString('en-NG')}\n*Total Saved:* ₦${totalSaved.toLocaleString('en-NG')} 🎉\n\nPlease confirm my order!`;
    
    const whatsappUrl = `https://wa.me/${BUSINESS_PHONE.replace('+', '')}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setView('success');
    setCart([]); 
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterStatus({ loading: true, message: 'Subscribing...', type: 'info' });

    emailjs.sendForm(
      'service_en2f61w',   
      'template_ryunwli',  
      e.target,
      'ZxgXzfvmWUdRBFtBs'  
    )
    .then((result) => {
        setNewsletterStatus({ loading: false, message: 'Welcome to the Jinja family! Check your inbox.', type: 'success' });
        e.target.reset();
        setTimeout(() => setNewsletterStatus({ loading: false, message: '', type: '' }), 5000);
    }, (error) => {
        setNewsletterStatus({ loading: false, message: 'Oops! Something went wrong. Try again.', type: 'error' });
        setTimeout(() => setNewsletterStatus({ loading: false, message: '', type: '' }), 5000);
    });
  };

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    if (view !== 'landing') {
      setView('landing');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (view === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <div className="max-w-lg w-full bg-white p-10 rounded-2xl shadow-2xl text-center">
          <div className="text-6xl mb-4 animate-bounce">✨🌿✨</div>
          <h2 className="text-3xl font-extrabold text-green-900 mb-2">Thank You, {formData.name}!</h2>
          <p className="text-gray-600 mb-6">Your order has been submitted. We are processing it and will reach out to you on WhatsApp shortly.</p>
          <button onClick={() => setView('landing')} className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 w-full shadow-lg">
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  if (view === 'checkout') {
    const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all">
          <div className="bg-green-800 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Express Checkout</h2>
            <button onClick={() => scrollToSection('products')} className="text-green-200 hover:text-white transition-colors text-sm font-medium">← Continue Shopping</button>
          </div>
          
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
            <div className="md:w-[45%] bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Your Cart</h3>
              {cart.length === 0 ? (
                <p className="text-sm text-gray-500 italic text-center py-8">Your cart is currently empty.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group">
                      <div className="w-16 h-16 bg-gray-50 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-bold text-gray-800 leading-tight mb-1 pr-4">{item.name}</h4>
                        <p className="text-xs text-green-700 font-semibold mb-2">₦{item.price.toLocaleString('en-NG')} each</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-gray-100 rounded-md p-1">
                            <button type="button" onClick={() => updateCartQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center rounded bg-white shadow-sm text-gray-600 hover:text-red-500 font-bold transition-colors">-</button>
                            <span className="w-6 text-center text-sm font-semibold text-gray-800">{item.quantity}</span>
                            <button type="button" onClick={() => updateCartQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center rounded bg-white shadow-sm text-gray-600 hover:text-green-700 font-bold transition-colors">+</button>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col justify-between h-full">
                        <button type="button" onClick={() => updateCartQuantity(item.id, -item.quantity)} className="text-gray-300 hover:text-red-500 absolute top-2 right-2 transition-colors">✕</button>
                        <span className="text-md font-bold text-gray-900 mt-auto pt-8">₦{(item.price * item.quantity).toLocaleString('en-NG')}</span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-gray-200 flex justify-between items-end mt-4">
                    <span className="font-bold text-gray-600">Subtotal</span>
                    <span className="font-extrabold text-2xl text-green-800">₦{orderTotal.toLocaleString('en-NG')}</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleCheckoutSubmit} className="md:w-[55%] space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Delivery Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700">Full Name *</label><input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border transition-all hover:border-green-400" /></div>
                <div><label className="block text-sm font-medium text-gray-700">Phone *</label><input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border transition-all hover:border-green-400" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700">Email *</label><input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border transition-all hover:border-green-400" /></div>
              <div><label className="block text-sm font-medium text-gray-700">Address *</label><textarea required name="address" rows="2" value={formData.address} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border transition-all hover:border-green-400"></textarea></div>
              <div><label className="block text-sm font-medium text-gray-700">Additional Info (optional)</label><textarea name="additional" rows="1" value={formData.additional} onChange={handleInputChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 p-2 border transition-all hover:border-green-400"></textarea></div>
              
              <button disabled={cart.length === 0} type="submit" className={`w-full py-4 px-4 mt-6 rounded-lg text-white font-bold text-lg transition-all shadow-lg ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 hover:scale-[1.02] hover:shadow-xl active:scale-95'}`}>
                {cart.length === 0 ? 'Add Items to Cart' : `Pay ₦${orderTotal.toLocaleString('en-NG')} via WhatsApp`}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-900 bg-white smooth-scroll">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { opacity: 0; animation: fadeInUp 0.8s ease-out forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      <header className="fixed w-full z-50 shadow-sm">
        <div className="bg-green-950 text-green-50 py-2 px-4 flex justify-between md:justify-center items-center text-sm md:gap-10">
          <span className="font-bold tracking-wide flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            {DISPLAY_PHONE}
          </span>
          <div className="flex gap-4">
            <a href="https://www.tiktok.com/@captrends_?_r=1&_t=ZS-95I5hmlscnS" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z"/></svg>
            </a>
            <a href="https://www.instagram.com/_captrends?igsh=aWk2Y214MXdxNG1s&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>

        <nav className="bg-white/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              
              {/* UPDATED LOGO SECTION */}
              <div className="flex-shrink-0 flex flex-col justify-center cursor-pointer pt-1" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl leading-none">🌿</span>
                  <span className="font-extrabold text-green-900 text-2xl tracking-tight leading-none">JINJA<span className="text-orange-500">.</span></span>
                </div>
                <span className="text-[0.65rem] font-bold text-gray-500 tracking-widest uppercase mt-1 pl-8">
                  Distributed by <span className="text-orange-500">Captrends</span>
                </span>
              </div>

              <div className="hidden md:flex space-x-8">
                <button onClick={() => scrollToSection('discover')} className="text-gray-600 hover:text-green-700 font-semibold transition-colors">Discover</button>
                <button onClick={() => scrollToSection('products')} className="text-gray-600 hover:text-green-700 font-semibold transition-colors">Products</button>
                <button onClick={() => scrollToSection('reviews')} className="text-gray-600 hover:text-green-700 font-semibold transition-colors">Reviews</button>
                <button onClick={() => scrollToSection('community')} className="text-gray-600 hover:text-green-700 font-semibold transition-colors">Community</button>
              </div>
              <div className="md:hidden flex items-center">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 focus:outline-none">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                <button onClick={() => scrollToSection('discover')} className="text-left block px-3 py-4 text-base font-semibold text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md">Discover</button>
                <button onClick={() => scrollToSection('products')} className="text-left block px-3 py-4 text-base font-semibold text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md">Products</button>
                <button onClick={() => scrollToSection('reviews')} className="text-left block px-3 py-4 text-base font-semibold text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md">Reviews</button>
                <button onClick={() => scrollToSection('community')} className="text-left block px-3 py-4 text-base font-semibold text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md">Community</button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <section className="relative bg-green-900 text-white overflow-hidden pt-32 pb-32 md:pt-40 md:pb-40">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 text-center md:text-left mt-8 md:mt-0">
            <span className="text-orange-400 font-bold tracking-wider uppercase text-sm mb-4 block animate-fade-in-up">100% Organic • Clinically Proven</span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight animate-fade-in-up delay-100">
              Reclaim Your Vitality. <br/><span className="text-green-300">Naturally.</span>
            </h1>
            <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl animate-fade-in-up delay-200">
              Do you know that with JINJA HERBAL EXTRACT you will get 100% Solution to any Health Challenges you are Suffering From?
            </p>
            <button onClick={() => scrollToSection('products')} className="animate-fade-in-up delay-300 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all transform hover:-translate-y-2 text-lg">
              Shop Now
            </button>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 w-full animate-fade-in-up delay-200">
            <div className="aspect-w-16 aspect-h-9 bg-black rounded-2xl shadow-2xl overflow-hidden border-4 border-green-700 relative flex items-center justify-center h-64 md:h-96 transform transition-transform duration-700 hover:scale-[1.03]">
              <video src="/test.mp4" controls muted autoPlay loop playsInline preload="metadata" className="w-full h-full object-cover absolute inset-0"></video>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up delay-300">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-t-4 border-orange-500">
          <div className="bg-green-50 px-6 py-4 border-b border-green-100 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-green-900">Why Wait? Start Healing Today.</h2>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-2xl mb-4">⏳</div>
              <h3 className="font-bold text-gray-900 mb-2">Fast Results</h3>
              <p className="text-gray-600 text-sm">Feel the difference in just <strong>2 weeks</strong> of consistent use. Don't let your pain linger.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-4">🚚</div>
              <h3 className="font-bold text-gray-900 mb-2">Nationwide Delivery</h3>
              <p className="text-gray-600 text-sm">We deliver straight to your doorstep anywhere in Nigeria within <strong>2-3 days</strong>.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-2xl mb-4">🛡️</div>
              <h3 className="font-bold text-gray-900 mb-2">Money-Back Guarantee</h3>
              <p className="text-gray-600 text-sm">If you don't see results within 2 weeks, request a refund. <strong>No questions asked.</strong></p>
            </div>
          </div>
          <div className="bg-red-50 p-6 border-t border-red-100">
            <p className="text-center text-red-800 font-medium">
              ⚠️ <span className="font-bold">The Cost of Waiting:</span> Health is wealth. Carrying severe pains and diseases you can't talk about will keep you trapped in a low-quality life. Don't wait until it is too late—take action today.
            </p>
          </div>
        </div>
      </section>

      <section id="discover" className="py-20 bg-green-50 border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-8">Discover the Power of Jinja Herbal Extracts</h2>
          
          <div className="max-w-3xl mx-auto mb-10 text-left md:text-justify text-lg text-gray-700 leading-relaxed space-y-4">
            <p><span className="font-bold text-green-800">Your Key to Health & Wealth!</span> Introducing Jinja Herbal Extracts, a powerful Nigerian-made herbal supplement crafted from over 70 African roots and herbs.</p>
            <p>This all-in-one formula is designed to help combat viral, bacterial, fungal infections, and much more. No matter your race or gender, Jinja works with your body to promote overall wellness.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden text-left relative">
            <div className="bg-green-800 px-6 py-5 border-b border-green-900">
              <h3 className="text-white font-bold text-xl text-center">See what JINJA HERBAL EXTRACT is capable of doing 👇</h3>
            </div>
            <div className="p-6 md:p-10 relative">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {(isFunctionsExpanded ? JINJA_FUNCTIONS : JINJA_FUNCTIONS.slice(0, 8)).map((func, idx) => (
                  <li key={idx} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${(idx % 8) * 50}ms` }}>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm mt-0.5">✓</div>
                    <span className="text-gray-700 font-medium leading-tight">{func}</span>
                  </li>
                ))}
              </ul>
              {!isFunctionsExpanded && (
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              )}
            </div>
            <div className="bg-gray-50 p-4 flex justify-center border-t border-gray-100">
              <button onClick={() => setIsFunctionsExpanded(!isFunctionsExpanded)} className="text-green-800 font-bold hover:text-orange-500 transition-colors flex items-center gap-2">
                {isFunctionsExpanded ? "See Less" : `See All ${JINJA_FUNCTIONS.length} Benefits`}
                <span className={`transform transition-transform duration-300 ${isFunctionsExpanded ? 'rotate-180' : ''}`}>▼</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-extrabold text-green-900 mb-4">Choose Your Package</h2>
            <p className="text-gray-600 text-lg">Select the size that best fits your wellness journey.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {PRODUCTS.map((product, index) => (
              <div key={product.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] flex justify-center">
                <div className="w-full max-w-sm">
                  <ProductCard product={product} index={index} onAddToCart={handleAddToCart} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-green-900 mb-4">Real People. Real Results.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map(review => (
              <div key={review.id} className="bg-green-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100 flex flex-col h-full">
                <div className="flex text-orange-400 mb-4 text-xl">
                  {Array.from({length: review.rating}).map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-gray-700 italic mb-6 flex-grow leading-relaxed">"{review.text}"</p>
                <p className="font-bold text-green-900 border-t border-green-200 pt-4">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonies" className="py-20 bg-green-50 border-t border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-green-900 mb-4">Seeing is Believing</h2>
            <p className="text-gray-600 text-lg">Real results from people who decided to take their health back.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {TESTIMONY_IMAGES.map((imgSrc, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-xl shadow-md group border border-gray-200 bg-white">
                <img 
                  src={imgSrc} 
                  alt={`Customer Testimony ${index + 1}`} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button onClick={() => scrollToSection('products')} className="bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-all hover:scale-105">
              Start Your Healing Journey
            </button>
          </div>
        </div>
      </section>

      <section id="community" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Join Our Community</h2>
            <p className="text-gray-400">Follow us for daily tips and success stories.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FEED_POSTS.map(post => (
              <div key={post.id} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer border border-gray-700 bg-black">
                 <LazyVideo src={post.src} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-green-950 pt-16 pb-8 border-t border-green-800 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10 border-b border-green-800/50 pb-8">
             <button onClick={() => scrollToSection('discover')} className="text-green-300 hover:text-white transition-colors">Discover</button>
             <button onClick={() => scrollToSection('products')} className="text-green-300 hover:text-white transition-colors">Shop Products</button>
             <button onClick={() => scrollToSection('reviews')} className="text-green-300 hover:text-white transition-colors">Success Stories</button>
             <button onClick={() => scrollToSection('community')} className="text-green-300 hover:text-white transition-colors">Social Feed</button>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Join the Herbal Revolution</h3>
          <p className="text-green-200 mb-6 text-sm">Get exclusive discounts, health tips, and early access to new products directly to your inbox.</p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row max-w-xl mx-auto gap-2">
            <input 
              type="text" 
              name="name" 
              required 
              placeholder="Your First Name" 
              className="sm:w-1/3 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 transition-all focus:scale-[1.02]" 
              disabled={newsletterStatus.loading}
            />
            <input 
              type="email" 
              name="user_email" 
              required 
              placeholder="Your email address" 
              className="sm:w-2/3 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 transition-all focus:scale-[1.02]" 
              disabled={newsletterStatus.loading}
            />
            <button 
              type="submit" 
              disabled={newsletterStatus.loading}
              className={`font-bold py-3 px-6 rounded-lg transition-all active:scale-95 whitespace-nowrap ${newsletterStatus.loading ? 'bg-gray-500 text-gray-200 cursor-wait' : 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-[0_0_15px_rgba(249,115,22,0.5)]'}`}
            >
              {newsletterStatus.loading ? 'Sending...' : 'Subscribe'}
            </button>
          </form>
          
          {newsletterStatus.message && (
            <div className={`mt-4 text-sm font-bold ${newsletterStatus.type === 'success' ? 'text-green-400' : newsletterStatus.type === 'error' ? 'text-red-400' : 'text-blue-400'}`}>
              {newsletterStatus.message}
            </div>
          )}

        </div>
        <p className="text-green-600 text-xs">© 2026 Jinja Herbal Extracts. All rights reserved.</p>
      </footer>

      <a 
        href={`https://wa.me/${BUSINESS_PHONE.replace('+', '')}?text=${encodeURIComponent("Hello! I need assistance with Jinja Herbal Extracts.")}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
      >
        <div className="bg-white px-4 py-2 rounded-full shadow-lg text-sm font-bold text-green-900 border border-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
          Need assistance? Chat now
        </div>
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 relative">
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </span>
          <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
      </a>
      
    </div>
  );
};

export default HerbalLandingPage;