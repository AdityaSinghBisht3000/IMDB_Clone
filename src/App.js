// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Banner  from './components/Banner';
import Movies from './components/Movies';
// import Pagination from './components/pagination';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Favourites from './components/Favourites'

function App() {
  return (
    <BrowserRouter >
    
    <NavBar/> 

    <Routes>

      <Route path="/" element={<><Banner></Banner>
      <Movies></Movies>
      {/* <Pagination></Pagination> */}
      </>} />

      <Route path="/favourites" element={<><Favourites/>
      </>} />

    </Routes>

    {/* // <Banner />
    // <Movies />
    // <Pagination/> */}
    
    </BrowserRouter>
  );
}

export default App;
