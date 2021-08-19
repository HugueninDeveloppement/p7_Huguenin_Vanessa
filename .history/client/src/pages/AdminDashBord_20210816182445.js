import React ,{useContext}  from 'react';
import {AuthContext} from '../utils/helpers/AuthContext';
import {useState , useEffect} from 'react';
import Axios from 'axios';

function AdminDashBord() {

    const {authStatus} = useContext(AuthContext);

    const [authState, setAuthState] = useState({adminPseudo:"", id:0, status:false}); 

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


    return (
        <div>
                {console.log(authStatus)}
        </div>
    )
}

export default AdminDashBord
