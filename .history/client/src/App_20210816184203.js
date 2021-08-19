import './App.css';
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import Home from "./pages/Home";
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import PersonnelPage from './pages/PersonnelPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashBord from './pages/AdminDashBord';


function App() {
  

  return (
    <div className="App">
       <Router>     
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/loginAdmin" exact component={AdminLogin}/>
            <Route path="/adminDashboard" exact component={AdminDashBord}/>
            <Route path="/createpost" exact component={CreatePost}/>
            <Route path="/post/:id" exact component={Post}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/profile/:id" exact component={Profile}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/myPage/:id" exact component={PersonnelPage}/>
            <Route path="*" exact component={PageNotFound}/>
          </Switch>
      </Router>   
    </div>     
  );
}

export default App;
