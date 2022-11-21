 import React, { useEffect, useState } from 'react'
 import M from 'materialize-css'
import { Navigate } from 'react-router-dom';
const CreatePost=()=> {
  const [title,setTitle]=useState("");
  const [body,setBody]=useState("");
  const [image,setImage]=useState("");
  const [url,setUrl]=useState("");

  useEffect(()=>{
    if(url){
    fetch("/createpost",{
      method:"post",
      headers:{
        "Content-Type": "application/json",
        "Authorization":"Bearer " +localStorage.getItem("jwt")
       
      },
      body: JSON.stringify({
        title,
        body,
        pic:url
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error){
        M.toast({html: data.error,classes:"#ef5350 red lighten-1"})
  
      }else{
        M.toast({html: "Created post successfully",classes:"#43a047 green darken-1"})
        Navigate(`/`);
  
  
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  },[url,body,title])
  const postDetails=()=>{
    const data=new FormData();
    data.append("file",image)
    data.append("upload_preset","instaclone");
    data.append("cloud_name","rkdv");
    fetch("https://api.cloudinary.com/v1_1/rkdv/image/upload",{
      method:"post",
      body:data
    })
    .then(res=>res.json())
    .then(data=>{
      // console.log(data)
      setUrl(data.url)
    }).catch(err=>{
      console.log(err)
    })
   
    
  }

  return (
    <div className='card input-filed'
    style={{
        margin:"30px auto",
        maxWidth:"500px",
        padding:"40px",
        textAlign:"center",
    }}
    
    >
        <input 
        type='text' 
        placeholder="title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
        <input 
        type='text'
         placeholder="body"
          value={body}
          onChange={(e)=>setBody(e.target.value)}

         />
        <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-2">
                <span>Upload</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-2" type="submit" name="action"
            onClick={()=>postDetails()}
            >
         Submit Post
         </button>


    </div>
  )
}

export default CreatePost