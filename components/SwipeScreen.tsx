

import React, { useState, useEffect } from 'react';
import { X, Heart, MapPin, Filter, Info, Check, RefreshCw, ChevronRight, ArrowRightLeft, Plus, Flame } from 'lucide-react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo, AnimatePresence } from 'framer-motion';

interface SwipeScreenProps {
  onBack: () => void;
}

// FIX: Define explicit types for barter and marketplace items to create a union type.
interface Owner {
    name: string;
    image: string;
    location: string;
    distance: string;
}

interface BarterItem {
    id: number;
    type: 'barter';
    title: string;
    condition: string;
    image: string;
    description: string;
    lookingFor: string;
    owner: Owner;
}

interface MarketplaceItem {
    id: number;
    type: 'marketplace';
    title: string;
    price: string;
    image: string;
    description: string;
    owner: Owner;
}

type SwipeItem = BarterItem | MarketplaceItem;


// MOCK DATA
const MOCK_BARTER_ITEMS: BarterItem[] = [
  { id: 1, type: 'barter', title: "Vintage Camera", condition: "Antique", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800", description: "Fully functional film camera from the 80s.", lookingFor: "Smart Watch ⌚", owner: { name: "David", image: "https://i.pravatar.cc/150?img=3", location: "Abuja", distance: "5km" } },
  { id: 2, type: 'barter', title: "Sony Headphones", condition: "Used", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800", description: "Premium noise cancelling headphones. Battery life is great.", lookingFor: "Mechanical Keyboard ⌨️", owner: { name: "Sarah", image: "https://i.pravatar.cc/150?img=5", location: "Lagos", distance: "2km" } },
];
const MOCK_MARKETPLACE_ITEMS: MarketplaceItem[] = [
  { id: 3, type: 'marketplace', title: "Phone holder", price: "15,000", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800", description: "Phone holder against flat wall or surface area.", owner: { name: "Ebuka", image: "https://i.pravatar.cc/150?img=11", location: "Abuja", distance: "30m" } },
  { id: 4, type: 'marketplace', title: "Macbook Stand", price: "25,000", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800", description: "Aluminum alloy laptop stand. Ergonomic design.", owner: { name: "Miriam", image: "https://i.pravatar.cc/150?img=9", location: "Port Harcourt", distance: "12km" } }
];

const MOCK_USER_ITEMS = [
    { id: 101, title: "AirPod Pro", subtitle: "AirPod pro 2", badge: "Used", category: "Electronics", image: "https://images.unsplash.com/photo-1603351154351-5cf233081e35?auto=format&fit=crop&w=150&q=80" },
    { id: 102, title: "Camera", subtitle: "Canon DSLR camera...", badge: "Used", category: "Electronics", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=150&q=80" },
];

const CATEGORY_OPTIONS = ["All Categories", "Electronics", "Fashion", "Home", "Books"];
const LOCATION_OPTIONS = ["Abuja", "Lagos", "Port Harcourt", "London"];


export const SwipeScreen: React.FC<SwipeScreenProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'exchange' | 'marketplace'>('exchange');
  // FIX: Explicitly type the state with the union type to allow both barter and marketplace items.
  const [items, setItems] = useState<SwipeItem[]>(MOCK_BARTER_ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('Abuja');

  useEffect(() => {
    if (activeTab === 'exchange') {
      setItems(MOCK_BARTER_ITEMS);
    } else {
      setItems(MOCK_MARKETPLACE_ITEMS);
    }
    setCurrentIndex(0); // Reset index when tab changes
  }, [activeTab]);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0.5, 1, 1, 1, 0.5]); 
  const controls = useAnimation();

  const currentItem = items[currentIndex];
  const nextItem = items[currentIndex + 1];

  const handleDragEnd = async (event: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      if (activeTab === 'exchange') {
          setShowOfferModal(true);
          controls.start({ x: 0, rotate: 0 });
      } else {
           await swipe('right', true);
      }
    } else if (info.offset.x < -100) {
      await swipe('left');
    } else {
      controls.start({ x: 0, rotate: 0 });
    }
  };

  const swipe = async (direction: 'left' | 'right', skipModal = false) => {
    if (direction === 'right' && activeTab === 'exchange' && !skipModal) {
      setShowOfferModal(true);
      return;
    }
    await controls.start({ x: direction === 'left' ? -500 : 500, opacity: 0 });
    setCurrentIndex(prev => prev + 1);
    x.set(0);
    controls.set({ x: 0, opacity: 1 });
  };

  const resetStack = () => setCurrentIndex(0);
  const handleOfferSelection = () => {
    setShowOfferModal(false);
    swipe('right', true);
  };
  
  const handleCategorySelect = (category: string) => {
      setSelectedCategory(category);
      setShowCategoryDropdown(false);
  }
  const handleLocationSelect = (location: string) => {
      setSelectedLocation(location);
      setShowLocationDropdown(false);
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      
      <div className="px-6 pt-4 pb-1 bg-white z-20 shrink-0">
        <div className="flex justify-center items-center mb-2">
             <h1 className="text-lg font-extrabold text-gray-900 tracking-wide">Discover</h1>
        </div>
        <div className="bg-gray-100 p-1 rounded-full flex items-center mb-3 w-full">
            <button 
                className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all text-center ${activeTab === 'exchange' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                onClick={() => setActiveTab('exchange')}
            >
                Exchange
            </button>
            <button 
                className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all text-center ${activeTab === 'marketplace' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                onClick={() => setActiveTab('marketplace')}
            >
                Marketplace
            </button>
        </div>
        
        <div className="flex justify-between items-center w-full pb-1 relative">
            <div className="relative">
                <button onClick={() => setShowCategoryDropdown(!showCategoryDropdown)} className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-bold text-gray-700 shadow-sm active:bg-gray-50">
                    <Filter size={12} />
                    <span>{selectedCategory}</span>
                </button>
                <AnimatePresence>
                    {showCategoryDropdown && (
                        <motion.div initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-30">
                            {CATEGORY_OPTIONS.map(cat => (
                                <button key={cat} onClick={() => handleCategorySelect(cat)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg">{cat}</button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
             <div className="relative">
                 <button onClick={() => setShowLocationDropdown(!showLocationDropdown)} className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-bold text-gray-700 shadow-sm active:bg-gray-50">
                    <MapPin size={12} className="text-brand" />
                    <span>{selectedLocation}</span>
                </button>
                 <AnimatePresence>
                    {showLocationDropdown && (
                        <motion.div initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}} className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-30">
                            {LOCATION_OPTIONS.map(loc => (
                                <button key={loc} onClick={() => handleLocationSelect(loc)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg">{loc}</button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>

      <div className="flex-1 relative flex flex-col items-center pt-1 px-4 overflow-hidden w-full">
        <div className="relative w-full h-[65vh] md:h-[68vh]">
            {!currentItem && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-0">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4"><Flame size={40} className="text-gray-300" /></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">You're all caught up!</h3>
                    <p className="text-gray-500 mb-6">Check back later for more items.</p>
                    <button onClick={resetStack} className="flex items-center space-x-2 px-6 py-3 bg-brand text-white rounded-full font-bold shadow-lg active:scale-95 transition-transform"><RefreshCw size={20} /><span>Start Over</span></button>
                </div>
            )}
            {nextItem && (<div className="absolute inset-0 w-full h-full bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden flex flex-col scale-[0.96] translate-y-3 opacity-60 z-0 pointer-events-none"><CardContent item={nextItem} /></div>)}
            {currentItem && (
                <motion.div key={currentItem.id} className="absolute inset-0 w-full h-full bg-white rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] z-10 overflow-hidden border border-gray-100 flex flex-col cursor-grab active:cursor-grabbing origin-bottom" style={{ x, rotate, opacity }} animate={controls} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.7} onDragEnd={handleDragEnd} whileTap={{ scale: 1.005 }}>
                    <CardContent item={currentItem} />
                </motion.div>
            )}
        </div>
        <div className="absolute bottom-2 flex justify-center space-x-8 z-30 w-full pointer-events-none">
             <button onClick={() => currentItem && swipe('left')} disabled={!currentItem} className="pointer-events-auto w-14 h-14 rounded-full bg-white border border-red-100 shadow-[0_8px_20px_rgba(239,68,68,0.15)] flex items-center justify-center text-red-500 active:scale-95 transition-transform hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:scale-100"><X size={28} strokeWidth={2.5} /></button>
             <button onClick={() => currentItem && swipe('right')} disabled={!currentItem} className="pointer-events-auto w-14 h-14 rounded-full bg-white border border-green-100 shadow-[0_8px_20px_rgba(34,197,94,0.15)] flex items-center justify-center text-green-500 active:scale-95 transition-transform hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:scale-100"><Check size={28} strokeWidth={3} /></button>
        </div>
      </div>

      <AnimatePresence>
        {showOfferModal && (
            <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowOfferModal(false)} className="absolute inset-0 bg-black/40 z-50 backdrop-blur-sm" />
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="absolute bottom-0 left-0 right-0 bg-white z-50 rounded-t-[32px] overflow-hidden flex flex-col h-[75%] shadow-2xl">
                    <div className="p-6 pb-2 shrink-0">
                         <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-extrabold text-gray-900">Select Item to Offer</h2>
                            <button onClick={() => setShowOfferModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} className="text-gray-500" /></button>
                         </div>
                         <div className="bg-brand/5 border-l-4 border-brand p-4 rounded-r-xl mb-4">
                             <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">You want:</p>
                             <p className="text-lg font-bold text-gray-900">{currentItem?.title}</p>
                         </div>
                         <p className="text-gray-500 text-sm font-medium ml-1">Which item do you want to offer in exchange?</p>
                    </div>
                    <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3">
                        {MOCK_USER_ITEMS.map((item) => (
                            <button key={item.id} onClick={handleOfferSelection} className="w-full bg-white border border-gray-100 rounded-2xl p-3 flex items-center shadow-sm hover:shadow-md hover:border-brand/30 active:scale-[0.98] transition-all group">
                                <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0 mr-4"><img src={item.image} alt={item.title} className="w-full h-full object-cover" /></div>
                                <div className="flex-1 text-left">
                                    <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                                    <p className="text-xs text-gray-500 mb-1">{item.subtitle}</p>
                                    <div className="flex items-center space-x-2"><span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span><span className="text-[10px] text-gray-400">{item.category}</span></div>
                                </div>
                                <ChevronRight className="text-gray-300 group-hover:text-brand" size={20} />
                            </button>
                        ))}
                         <button className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-4 flex items-center justify-center text-gray-400 font-bold hover:border-brand hover:text-brand hover:bg-brand/5 transition-colors"><Plus size={20} className="mr-2" />Add New Item</button>
                    </div>
                </motion.div>
            </>
        )}
      </AnimatePresence>
    </div>
  );
};

// FIX: Type the 'item' prop with the SwipeItem union type.
const CardContent: React.FC<{ item: SwipeItem }> = ({ item }) => {
    const isMarketplace = item.type === 'marketplace';
    
    return (
        <>
            <div className="h-[60%] bg-gray-100 relative shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg active:scale-90 border border-white/30"><Info size={18} /></button>
                <div className="absolute bottom-3 left-4 right-4">
                    <div className="flex items-start justify-between">
                         <h2 className="text-2xl font-extrabold text-white leading-tight drop-shadow-md pr-2 line-clamp-2">{item.title}</h2>
                         {isMarketplace ? (
                            <span className="bg-yellow-400 text-black border border-yellow-300/50 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ml-2 mt-1 whitespace-nowrap shrink-0">₦{item.price}</span>
                         ) : (
                            <span className="bg-green-500 text-white border border-green-400/50 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm ml-2 mt-1 whitespace-nowrap shrink-0">{item.condition}</span>
                         )}
                    </div>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-1 bg-white relative overflow-y-auto pb-20">
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-snug font-medium select-none">{item.description}</p>
                {isMarketplace ? (
                    <div className="bg-green-50 rounded-lg px-3 py-2 mb-3 flex items-center border border-green-100 select-none">
                        <span className="text-green-700 text-xs truncate font-bold">Available for Purchase</span>
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-lg px-3 py-2 mb-3 flex items-center border border-gray-100 select-none">
                        <ArrowRightLeft className="text-brand w-3.5 h-3.5 mr-2 shrink-0" />
                        <span className="text-gray-500 text-xs truncate">Looking for: <span className="font-bold text-gray-900 ml-1">{item.lookingFor}</span></span>
                    </div>
                )}
                <div className="flex-grow"></div>
                <div className="h-px bg-gray-50 w-full my-1.5"></div>
                <div className="flex items-center pt-1.5">
                    <div className="w-9 h-9 rounded-full bg-gray-200 mr-3 overflow-hidden shrink-0 border"><img src={item.owner.image} alt={item.owner.name} className="w-full h-full object-cover" /></div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-sm">{item.owner.name}</h3>
                        <div className="flex items-center text-gray-400 text-xs font-medium mt-0.5"><MapPin size={10} className="mr-1" /><span>{item.owner.location}</span><span className="mx-1.5 text-gray-300">•</span><span className="text-brand font-bold">{item.owner.distance}</span></div>
                    </div>
                </div>
            </div>
        </>
    );
};