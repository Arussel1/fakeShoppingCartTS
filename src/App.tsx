import { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Logo from './assets/images/logoNoBackground.png';
import CartIcon from './assets/images/cart.svg';
import CircleIcon from './assets/images/circle.svg';
import Error from './components/error/Error';
import Home from './components/home/Home';
import Shop from './components/shop/Shop';
import Detail from './components/detail/Detail.tsx';
import Contact from './components/contact/Contact.tsx';
import CartComponent from './components/cart/Cart';
import './App.css';

interface Item {
  id: string; 
  title: string; 
  price: number; 
  counter: number; 
  image: string
}

const App = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);

  const addItems = (item: Item) => {
    const duplicate = items.find((element) => element.id === item.id);
    if (!duplicate) {
      setItems([...items, item]);
    } else {
      setItems(
        items.map((element) =>
          element.id === item.id
            ? { ...element, counter: element.counter + item.counter }
            : element
        )
      );
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleShopClick = () => {
    navigate('/shop');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <div>
      <div id="nav" className="nav">
        <img src={Logo} alt="logo" className="logo" />
        <button className="navButton" onClick={handleHomeClick}>
          Home
        </button>
        <button className="navButton" onClick={handleShopClick}>
          Shop
        </button>
        <button className="navButton" onClick={handleContactClick}>
          Contact Us
        </button>
        <button id="cart" className="navButton" onClick={handleCartClick}>
          <img src={CartIcon} alt="cart" className="cart" />
          <div className={`itemContainer ${items.length <= 0 ? 'hidden' : ''}`}>
            <img src={CircleIcon} alt="itemNumber" className="item" />
            <p className="itemText">{items.length}</p>
          </div>
        </button>
      </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/detail" element={<Detail addItems={addItems} />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={<CartComponent itemsList={items} setItemsList={setItems} />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
    </div>
  );
};

export default App;
