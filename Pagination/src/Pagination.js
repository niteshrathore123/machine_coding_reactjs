import { useEffect, useState } from "react";

const Pagination = () => {
  const [productList, setProductList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pagePerItem = 10;
  const totalPages = Math.ceil(productList.length / pagePerItem);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const API_URL = "https://dummyjson.com/products?limit=100";
      const response = await fetch(API_URL);
      const data = await response.json();

      setProductList(data.products);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handlePageChange = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== pageNumber
    )
      setPageNumber(selectedPage);
  };

  return (
    <div className="main-container">
      <div className="product-list">
        {productList
          .slice(
            pageNumber * pagePerItem - pagePerItem,
            pageNumber * pagePerItem
          )
          .map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.images[0]} alt="Product Image" />
              <h4>Name: {product.title}</h4>
              <p>Brand: {product.brand}</p>
            </div>
          ))}
      </div>
      {productList.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(pageNumber - 1)}
            className={pageNumber <= 1 ? "disable-button" : ""}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={pageNumber === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(pageNumber + 1)}
            className={pageNumber >= totalPages ? "disable-button" : ""}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
