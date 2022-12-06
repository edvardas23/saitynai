import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom"
import MainPage from './components/MainPage.js';

function App() {
  return (
      <Routes>
        <Route path='/location' element={<MainPage/>}/>
      </Routes>
  );
}

export default App;
