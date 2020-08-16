import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import './App.css';

function App() {

  const {register,handleSubmit} = useForm();

  const [data,setData] = useState({});
  const [songs,setSongs] = useState([]);
  const onSub = (register) =>{
    console.log(register);
    setData(register);
  }

  const addInfo = async (music) =>{
    try{
    const response = await fetch('https://audioplayer-4372e.firebaseio.com/songs.json',{
      method:"POST",
      headers:{"Content-Type":'appllication/json'},
      body: JSON.stringify({...music})
    })
    // console.log(response);
  }
    catch(err){
      console.log(err);
    }
  }
  const getInfo = async () =>{
    try{
      const response = await fetch('https://audioplayer-4372e.firebaseio.com/songs.json',{
        method:"GET",
        headers:{"Content-Type":"application/json"}
      })
      const data1 = await response.json();
      const songs1 =  Object.keys(data1).map((key)=>{
        return{...data1[key],id:key}
      })
      setSongs(songs1);
      }
    catch(err){
      console.log(err)
    }
  }
  
  useEffect( 
  ()=>{
    addInfo(data);
  },[data]) 

  useEffect(()=>{
    getInfo();
    console.log(songs)
  })

  return (
    <div className="App">
      <div className="info" >
        <form onSubmit={handleSubmit(onSub)} >
          <input placeholder='Name' type="text" name='Name' ref={register} ></input>
          <input placeholder='AutherName' type="text" name='Auther' ref={register} ></input>
          <input placeholder='ImgUri' type="text" name='ImgUri' ref={register} ></input>
          <input placeholder='MusicUri' type="text" name='MusicUri' ref={register} ></input>
          <input type="submit" ></input>
        </form>
      </div>
      <div className="data" ></div>
    </div>
  );
}

export default App;
