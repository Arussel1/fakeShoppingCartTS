import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import classes from './shop.module.css';
import arrowDown from './../../assets/images/arrowDown.svg';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<Product[]>([]);
  const [sortList, setSortList] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleSort = () => {
    setSortList(prev => !prev);
  };

  const handleCardClick = (item: Product) => {
    navigate('/shop/detail', { state: { ...item } });
  };

  // Data fetching from REST API
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://fakestoreapi.com/products?limit=20');
      const data: Product[] = await res.json();
      setResult(data);
    };
    fetchData();
  }, []);

  // Sort the results
  useEffect(() => {
    if (sortOrder) {
      const sortedResult = [...result].sort((a, b) => {
        switch (sortOrder) {
          case 'A-Z':
            return a.title.localeCompare(b.title);
          case 'Z-A':
            return b.title.localeCompare(a.title);
          case 'High-Low':
            return b.price - a.price;
          case 'Low-High':
            return a.price - b.price;
          default:
            return 0;
        }
      });
      setResult(sortedResult);
    }
  }, [sortOrder, result]);

  const filteredResult = result.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Create cards based on fetch data
  const cards = filteredResult.map(item => (
    <button
      className={classes.card}
      key={item.id}
      onClick={() => handleCardClick(item)}
    >
      <img src={item.image} alt={`Image of ${item.title}`} className={classes.displayImage} />
      <p>{item.title}</p>
      <p>${item.price}</p>
    </button>
  ));

  return (
    <>
      <div className={classes.menu}>
        <label htmlFor="search" className={classes.label}>
          <input
            id="search"
            className={classes.input}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button className={classes.sortButton} onClick={toggleSort}>
          Sort
          <img src={arrowDown} alt="Sort options" />
        </button>
        <div className={`${classes.sortLists} ${!sortList ? 'hidden' : ''}`}>
          <button onClick={() => setSortOrder('A-Z')}>From A-Z</button>
          <button onClick={() => setSortOrder('Z-A')}>From Z-A</button>
          <button onClick={() => setSortOrder('High-Low')}>From High to Low</button>
          <button onClick={() => setSortOrder('Low-High')}>From Low to High</button>
        </div>
      </div>
      <div className={classes.cards}>
        {cards}
      </div>
    </>
  );
};

export default Shop;
