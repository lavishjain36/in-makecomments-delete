import React, {  useContext, useEffect, useState } from 'react'
import {UserContext} from '../../App'


const Home=()=> {
  const [data,setData] = useState([])
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
     fetch('/allpost',{
         headers:{
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         }
     }).then(res=>res.json())
     .then(result=>{
        //  console.log(result)
         setData(result.posts)
     })
  },[])
const likePost=(id)=>{
  fetch("/like",{
    method:"put",
    headers:{
      "Content-Type": "application/json",
      "Authorization":"Bearer " +localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      postId:id
    })
  }).then(res=>res.json())
  .then(result=>{
    // console.log(result)
    //Logic for updating value 
    let newData=data.map(item=>{
      if(item._id===result._id){
        return result
      }else{
        return item
      }
    })
    console.log(newData)
    setData(newData)
    }).catch((error)=>{
      console.log(error)
    })
}

const unlikePost=(id)=>{
  fetch("/unlike",{
    method:"put",
    headers:{
      "Content-Type": "application/json",
      "Authorization":"Bearer " +localStorage.getItem("jwt")
    },
    body:JSON.stringify({
      postId:id
    })
  }).then(res=>res.json())
  .then(result=>{
    console.log(result)
    let newData=data.map(item=>{
      if(item._id===result._id){
        return result
      }else{
        return item
      }
    })
    setData(newData)
    console.log(newData)
    }).catch((error)=>{
      console.log(error)
    })
}
  return (
   <div className="home">
   {
    data.map(item=>{
      return(
    <div className="card home-card">
      <h5>{item.postedBy.name}</h5>
      <div className="card-image">
        <img src={item.photo} alt="image1"/>
      </div>
      <div className='card-content'>
      <i className="material-icons" style={{color:"red"}}>favorite</i>
      {item.likes.includes(state._id)
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{unlikePost(item._id)}}
                              >thumb_down</i>
                            : 
                            <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}
                            >thumb_up</i>
                            }
      {/* <i class="material-icons"
      onClick={()=>{likePost(item._id)}}>thumb_up</i>
     
      <i class="material-icons"
       onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
       */}
       <h6>{item.likes.length} likes</h6>
        <h6>{item.title}</h6>
        <p>{item.body}</p>
        <input type="text" placeholder="Add comment"/>
      </div>
    </div>
      )
    })
   }
   </div> 
  )
}

export default Home