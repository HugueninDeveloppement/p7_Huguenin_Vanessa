import './App.css';
import {BrowserRouter as Router, Route , Switch, Link} from 'react-router-dom'
import Home from "./pages/Home";
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import {AuthContext} from './utils/helpers/AuthContext';
import {useState , useEffect} from 'react';
import Axios from 'axios';
import PersonnelPage from './pages/PersonnelPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashBord from './pages/AdminDashBord';

function Connexion() {

    const [authState, setAuthState] = useState({userPseudo:"", id:0, status:false}); 

  useEffect(()=>{
    
    Axios.get("http://localhost:3006/api/users/checkToken" , {
      headers:{
        accesToken: localStorage.getItem("accesToken")
      }
    }).then((response)=>{
      if(response.data.error){
        setAuthState({...authState, status: false})       
      }else{
        setAuthState({userPseudo:response.data.userPseudo, id:response.data.id, status:true})
      }
    })
  },[])

  const logout = () =>{ 
    localStorage.removeItem("accesToken");
    setAuthState({userPseudo:"", id:0, status:false});
  }
    return (
        <div>
            
        </div>
    )
}

export default Connexion
