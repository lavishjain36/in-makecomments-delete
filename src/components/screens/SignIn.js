import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'
const SignIn=()=> {
  const navigate = useNavigate();
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  //make a network request 
const PostData=()=>{
  console.log(email,password)
  //eslint-disable-next-line
  if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
    return
}
  fetch("/signin",{
    method:"post",
    headers:{
      "Content-Type": "application/json",
     
    },
    body: JSON.stringify({
      
      password,
      email,
    })
  }).then(res=>res.json())
  .then(data=>{
    console.log(data)
    if(data.error){
      M.toast({html: data.error,classes:"#ef5350 red lighten-1"})

    }else{
      localStorage.setItem("jwt",data.token)
      localStorage.setItem("user",JSON.stringify(data.user))
      M.toast({html: "Signedin success",classes:"#43a047 green darken-1"})
      navigate(`/`);


    }
  }).catch(err=>{
    console.log(err)
  })
}
 
  return (
    <div className='mycard'>
      <div className="card auth-card input-field">
      <h2>Instagram</h2>
      
      <input
       type="text"
       placeholder='email'
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       />
       <input
       type="text"
       placeholder='password'
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       />
         <button className="btn waves-effect waves-light #1976d2 blue darken-2" type="submit" name="action"
         onClick={()=>PostData()}>
          Submit
         </button>
         <h5>
            <Link to="/signin">Don't Have an account?</Link>
          </h5>
      </div>
    </div>
  )
}

export default SignIn