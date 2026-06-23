import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate
} from 'react-router-dom'

import Structure from './Layout/Structure'
import Homepage from './pages/Hompage'
import ProductDetails from './pages/ProductDetails.jsx'
import NotFound from './pages/NotFound'
import Wishlist from './pages/Wishlist'
import Product from './pages/Product'
import Cart from './pages/Cart.jsx'
import { CategoriesProvider } from './Context/CategoriesContext.jsx'
import ScrollToTop from './Components/ScrollToTop.jsx'

function App() {


  return (
    <>
      <CategoriesProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Structure />}>
              <Route index element={<Navigate to='/homepage' replace />} />
              <Route path='/homepage' element={<Homepage />} />
              <Route path='/products' element={<Product />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/products/:slug' element={<ProductDetails />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CategoriesProvider>
    </>
  )
}

export default App

