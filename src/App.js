import { Route, Routes} from 'react-router-dom';
import Home from './Pages/Home/Home';
import './App.css';
import Trade from './Pages/Trade/Trade';
import Wallet from './Pages/Wallet/Wallet'
import Analytics from './Pages/Analytics/Analytics'
import Settings from './Pages/Settings/Settings'
import Login from './Pages/LoginRegister/Login'
import Register from './Pages/LoginRegister/Register';


function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/trade" element ={<Trade/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/wallet' element={<Wallet/>}/>
        <Route path='/data' element={<Analytics/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
