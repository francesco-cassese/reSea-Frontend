import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate
} from 'react-router-dom'

import Structure from './Layout/Structure'
import Homepage from './pages/Hompage'
import ProductDetail from './pages/ProductDetail'
import NotFound from './pages/NotFound'
import Wishlist from './pages/Wishlist'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Structure />}>
            <Route index element={<Navigate to='/Homepage' replace />} />
            <Route path='/Homepage' element={<Homepage />} />
            <Route path='/Wishlist' element={<Wishlist />} />
            <Route path='/ProductDetail' element={<ProductDetail />} />
            <Route path='/NotFound' element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

