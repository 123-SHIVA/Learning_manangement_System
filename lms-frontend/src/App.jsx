import {Routes,Route} from 'react-router-dom';
import "./App.css";
import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';


function App() {
  return <>
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/about' element={<AboutUs/>}></Route>
          </Routes>
      


  </>
  //aaya smjh kijiye thik to  khud se hlo kya hua oye kya kr rahe hai kijiye thik 
}

 

export default App;
