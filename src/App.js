import React,{useEffect, useState} from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [login, setLogin] = useState(false)
  const [store, setStore] = useState('')
  const [post, setPost] = useState(null)

  useEffect(() => {
    let store = JSON.parse(localStorage.getItem('login'));
    if(store && store.login){
      setLogin(true);
      setStore(store)
    }
  },[])


  const loginApi = () => {
    const data = new FormData();
    data.append('username', name);
    data.append('password', password);
    fetch('https://api.di2ver.my.id/app/login',{
      method:"POST",
      body:data
    }).then((response) => {
      response.json().then((result) => {
        console.log('result', result);
        localStorage.setItem('login', JSON.stringify({
          login:true,
          token:result.token
        }))
        
      })
    })
  }

  const postApi = () => {
    let token = "Bearer "+store.token
    const data = new FormData();
    data.append('nama', post);
    fetch('https://api.di2ver.my.id/produk/create',{
      method:"POST",
      headers:{
        Authorization:token
      },
      body:data
    }).then((response) => {
      response.json().then((result) => {
        console.log('result', result);
        
      })
    })
  }
  return (
    <div className="App">
      <h1>JWT Token With React</h1>
      {login ?
      <div> 
        <textarea onChange={(e) => setPost(e.target.value)}></textarea><br/>
        <button onClick={() => postApi()}>Post</button>
        </div>
      :<div>
      <input type='text' onChange={(e) => setName(e.target.value)}/><br/>
      <input type='text' onChange={(e) => setPassword(e.target.value)}/><br/>
      <button onClick={() => {loginApi()}}>Login</button>
    </div>}
      
    </div>
  );
}

export default App;
