import { useState ,useEffect} from 'react'
import './App.css'
import {Routes,Route} from "react-router-dom" 
import Home from './components/HomePage/Home'



function App() {



  return (
    <>
    
     <Routes>
      <Route path ="/Home" Component={Home}/>
       
     </Routes>
    </>
  )
}

export default App
