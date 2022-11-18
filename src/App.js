import React,{useEffect,createContext,useReducer, useContext} from 'react';
import Navbar from "./components/Navbar";
import "./App.css";
import {BrowserRouter,Route, Routes, useNavigate} from "react-router-dom"
import Home from "./components/screens/Home";
import Signup from "./components/screens/Signup";
import Profile from "./components/screens/Profile";
import SignIn from "./components/screens/SignIn";
import CreatePost from "./components/screens/CreatePost";
import {reducer,initialState} from "./reducers/useReducer";


export const UserContext=createContext();

const Routing=()=>{
  const navigate=useNavigate()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    //  console.log(user);
    // console.log(typeof user)
    if(user){
      dispatch({type:"USER",payload:user})
      navigate('/')
    }else{
      navigate('/signin')
    }
  },[])
  return (
  
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
   
   
  )
}
function App() {
  const [state,dispatch]=useReducer(reducer,initialState);
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar/>
     <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
