import {BrowserRouter as Router , Routes , Route   } from "react-router-dom";

import Login from './pages/Login';
import Register from "./pages/Register";
import { Home } from './pages/Home';
import { SurveyForm } from "./pages/SurveyForm";
import './App.css'

var token = localStorage.getItem("TOKEN");



function App() {



  return (
    <>
      <div>
    

       <Router>
        <Routes>
        
         
       
          <Route element={<Login/>} path="/login"/>
          <Route element={<Register/>} path="/register"/>
    
          <Route element={<SurveyForm/>} path="/"/>
         
          {token ? (
              <>
                <Route element={<Home />} path="/home" />
              </>
            ) : (
           
              <Route element={<Login/>} path="/login"/>
            )}
        
  
        </Routes>
      </Router>




       </div>
    </>
  )
}

export default App
