import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home/Home";
import RequireAuth from "./hooks/RequireAuth";
import Login from "./Login/Login";

function App() {
  
  return (
   <div>
     <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Home/>
            </RequireAuth>
        } />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
