import React from 'react';

const categories = [
  'Electronics',
  'Books',
  'Clothing',
  'Home & Kitchen',
];

const CategoryList = () => {
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
