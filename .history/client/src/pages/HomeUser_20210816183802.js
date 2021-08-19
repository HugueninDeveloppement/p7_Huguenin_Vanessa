import React from 'react'

function HomeUser() {

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
            <AuthContext.Provider value={{authState,setAuthState}}>
        <Router>
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
            
         </Router>
      </AuthContext.Provider>
    </div>  
    )
}

export default HomeUser
