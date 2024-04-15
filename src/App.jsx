import './App.css'
import { useState,useEffect } from 'react'

function App() {

  const [products,setProducts] = useState([])
  const [page,setPage] = useState(1)

  const slicedProducts = products.slice(page*10-10,page*10)

  const fetchProducts = async() => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if(data && data.products){
      setProducts(data.products)
    }
  }

  const selectedPageHandler = (selectedPage) => {
    if(selectedPage >= 1 && 
      selectedPage <= products.length/10 && 
      page !== selectedPage){
      setPage(selectedPage);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    }
    
  }

  useEffect(() => {
    fetchProducts();
  },[])
  return (
    <div className='app'>
      <h1>Products List</h1>
      <div className='container'>
      {
        slicedProducts.length > 0 && <div className='products'>
          {
            slicedProducts.map((prod) => {
              return (
                <span className='product'>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span>{prod.title}</span>
                </span>
              )
            })
          }
        </div>
      }
      {
        products.length > 0 && <div className='pagination'>
          <span className={page > 1 ? "" : "pagination-disable"} onClick={() => selectedPageHandler(page - 1)}>◀️</span>
          {
            [...Array(products.length/10)].map((_,i) => (
              <span onClick={() => selectedPageHandler(i+1)} className={page === i+1 ? "activepage" : ""}>{i + 1}</span>
            ))
          }
          <span className={page < products.length/10 ? "" : "pagination-disable"} onClick={() => selectedPageHandler(page + 1)}>▶️</span>
        </div>
      }
    </div>
    </div>
    
  )
}

export default App
