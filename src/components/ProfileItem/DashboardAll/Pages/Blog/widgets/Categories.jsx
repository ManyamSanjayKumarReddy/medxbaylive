import React from "react";

const Categories = () => {
  const categoriesData = [
    { name: "Hydration or Moisturization", count: 10 },
    { name: "Ophthalmology", count: 50 },
    { name: "Blood Pressure", count: 24 },
    { name: "Corona Virus", count: 32 },
    { name: "Dental", count: 15 },
  ];
  return (
    <div className="tags-widget-cnt">
      <div className="related-post-head">
        <h4>Categories</h4>
      </div>
      <div className="category-flex">
        {categoriesData.map((category, index) => (
          <div className="widget-category-cnt" key={index}>
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M3.47532 13.2491L7.25032 17.0241C8.80032 18.5741 11.317 18.5741 12.8753 17.0241L16.5337 13.3658C18.0837 11.8158 18.0837 9.29918 16.5337 7.74085L12.7503 3.97418C11.9587 3.18251 10.867 2.75751 9.75032 2.81585L5.58365 3.01585C3.91699 3.09085 2.59199 4.41585 2.50865 6.07418L2.30865 10.2409C2.25865 11.3658 2.68365 12.4575 3.47532 13.2491Z"
                fill="#333448"
              />
              <path
                d="M7.91563 10.8137C9.24111 10.8137 10.3156 9.73916 10.3156 8.41368C10.3156 7.08819 9.24111 6.01367 7.91563 6.01367C6.59015 6.01367 5.51562 7.08819 5.51562 8.41368C5.51562 9.73916 6.59015 10.8137 7.91563 10.8137Z"
                fill="#333448"
              />
            </svg>
            <p>{category.name} ({category.count})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
