import { useState ,useEffect} from 'react'
import './App.css'
import {Routes,Route, Navigate} from "react-router-dom" 
import Home from './components/HomePage/Home'
import EntryPage from './components/EntryPage/EntryPage'



function App() {



  return (
    <>
    
     <Routes>
      
      {/* if the target is / */}
      <Route path='/' Component={
       ()=>{
        const item = localStorage.getItem('is_present');
        return item  ? Navigate({to:"/Home"}) : <EntryPage/>;
       }
      }></Route>
      
      <Route path ='/Home' Component={
        Home
      }/>
      <Route path = "*" Component={EntryPage}/>
     </Routes>
    </>
  )
}

export default App
