import React ,{useContext}from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../utils/helpers/AuthContext';
import {useState , useEffect} from 'react';
import Axios from 'axios';

function HomeUser() {
    
    const {authState, setAuthState } = useContext(AuthContext)
 

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
        <AuthContext.Provider value={{authState,setAuthState}}>
          <div className="nav-bar w-full">
            <div className="nav-left p-2 flex align-between;">
              {!authState.status ? (
                <>
                <div className="w-1/2">
                  <Link to="/login">Se connecter</Link>
                </div>                
                <div className="w-1/2">
                  <Link to="/register">S'inscrire</Link>
                </div>               
                </>
              ) : (
                <>
                <Link to="/createpost">Nouvelle publication</Link>
                <Link to="/">Accueil</Link>
                <Link to={`/myPage/${authState.id}`}>Mon compte</Link>
                </>
              )}
            </div>
            <div className="nav-rigth">
              <h1>{authState.userPseudo}</h1>
              {authState.status && <button onClick={logout}><Link to="/login">Se Déconnecter</Link> </button>}
            </div>           
         </div>            
      </AuthContext.Provider>
    </div>  
    )
}

export default HomeUser
