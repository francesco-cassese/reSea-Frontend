import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate
} from 'react-router-dom'

import Structure from './layout/Structure'
import Homepage from './pages/Hompage'
import ProductDetails from './pages/ProductDetails.jsx'
import NotFound from './pages/NotFound'
import Wishlist from './pages/Wishlist'
import Product from './pages/Product'
import Cart from './pages/Cart.jsx'
import CheckOutPage from './pages/CheckOutPage.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { CategoriesProvider } from './context/CategoriesContext.jsx'
import { AppProvider } from './context/AppContext.jsx';
import AboutUs from './pages/AboutUs.jsx'
import AssistantWidget from './Components/AssistantWidget.jsx'

function App() {

  return (
    <>
      <CategoriesProvider>
        <AppProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path='/' element={<Structure />}>
                <Route index element={<Navigate to='/homepage' replace />} />
                <Route path='/homepage' element={<Homepage />} />
                <Route path='/products' element={<Product />} />
                <Route path='/aboutUs' element={<AboutUs />} />
                <Route path='/checkout' element={<CheckOutPage />} />
                <Route path='/products/:slug' element={<ProductDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <AssistantWidget/>
          </BrowserRouter>
        </AppProvider>
      </CategoriesProvider>
    </>
  )
}

export default App;