import './App.css'
import Navbar from './components/navbarCompo/navBar'
import OpenProduct from './components/newCollectionCompo/OpenProduct';
import { Route, Routes } from 'react-router-dom';
import Homepage from "./routes/homepage";
import AllProducts from './routes/allProducts';


function App() {

  return (
    <>
      <div className="App">
          <Navbar />  
          <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/product/:productName' element={<OpenProduct/>} />
            <Route path='/allProducts' element={<AllProducts />}></Route>
          </Routes>
      </div>
    </>
  )
}

export default App
