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
import AdminDashBord from './pages/AdminDashBord';


function App() {
  const [authState, setAuthState] = useState({id:0,userPseudo:"", role:"", status:false}); 

  useEffect(()=>{
    
    Axios.get("http://localhost:3006/api/users/checkToken" , {
      headers:{
        accesToken: localStorage.getItem("accesToken")
      }
    }).then((response)=>{
      if(response.data.error){
        setAuthState({...authState, status: false})       
      }else{
        setAuthState({ id:response.data.id, userPseudo:response.data.userPseudo, role:response.data.role, status:true})

      }
    })
  },[])

  const logout = () =>{ 
    localStorage.removeItem("accesToken");
    setAuthState({id:0, userPseudo:"", role:"", status:false});
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{authState,setAuthState}}>
        <Router>
          <div className="nav-bar">
            <div className="nav-left">
              {!authState.status ? (
                <>
               
                <Link to="/login">Se connecter</Link>
                <Link to="/register">S'inscrire</Link>
                </>
              ) : (
                <>
                <Link to="/createpost">Nouvelle publication</Link>
                <Link to="/home">Accueil</Link>
                <Link to={`/myPage/${authState.id}`}>Mon compte</Link>
                </>
              )}
            </div>
            <div className="nav-rigth">
              <h1>{authState.userPseudo}</h1>
              {authState.status && <button onClick={logout}><Link to="/login">Se Déconnecter</Link> </button>}
            </div>
           
         </div>
          <Switch>
            <Route path="/home" exact component={Home}/>
            <Route path="/createpost" exact component={CreatePost}/>
            <Route path="/post/:id" exact component={Post}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/profile/:id" exact component={Profile}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/dashbord" exact component={AdminDashBord}/>
            <Route path="/myPage/:id" exact component={PersonnelPage}/>
            <Route path="*" exact component={PageNotFound}/>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>     
  );
}

export default App;