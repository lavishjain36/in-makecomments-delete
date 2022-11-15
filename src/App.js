import Navbar from "./components/Navbar";
import "./App.css";
import {BrowserRouter,Route, Routes} from "react-router-dom"
import Home from "./components/screens/Home";
import Signup from "./components/screens/Signup";
import Profile from "./components/screens/Profile";
import SignIn from "./components/screens/SignIn";
import CreatePost from "./components/screens/CreatePost";
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
      
      <Route exact path="/" element={<Home />} >
      </Route>
      <Route path="/signup" element={<Signup/>}>
      </Route>
      <Route path="/signin" element={<SignIn/>}>
      </Route>
      <Route path="/profile" element={<Profile/>}>
      </Route>
      <Route path="/create" element={<CreatePost/>}>
      </Route>
      </Routes>
      
    </BrowserRouter>
  
  );
}

export default App;
