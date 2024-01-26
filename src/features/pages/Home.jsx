import React from 'react'
import Navbar from '../navbar/navbar'
import ProductList from '../product-list/Product-list'

const Home = () => {
  return (
   <>
    <Navbar>
        <ProductList></ProductList>
    </Navbar>
   </>
  )
}

export default Home