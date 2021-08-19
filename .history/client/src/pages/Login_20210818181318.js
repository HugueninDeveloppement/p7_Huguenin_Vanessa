import React, {useState , useContext}from 'react';
import Axios from 'axios';
import {useHistory} from'react-router-dom';
import {AuthContext} from '../utils/helpers/AuthContext';

function Login() {

    const [userPseudo, setUserPseudo] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const { setAuthState } = useContext(AuthContext)

    let history =useHistory();

    const login =() => {
        const data = {userPseudo:userPseudo, userPassword:userPassword}
        Axios.post("http://localhost:3006/api/users/login", data).then((response)=>{
            if(response.data.error) {
                alert(response.data.error)
            }else{
                localStorage.setItem("accesToken", response.data.token);
                setAuthState({id:response.data.id, userPseudo:response.data.userPseudo, role:response.data.role, status:true})
                history.push("/home")
            };            
        })        
    }

    return (
        <div className="form-login">
            <fieldset>
            <label id="userPseudo">Nom d'utilisateur</label>
            <input type="text" name="userPseudo" onChange={(e)=>{setUserPseudo(e.target.value)}}/>
            </fieldset>
            <fieldset>
            <label id="userPassword">Mot de passe </label>
            <input type="password" name="userPassword" onChange={(e)=>{setUserPassword(e.target.value)}}/>
            </fieldset>
            <button onClick={login}>Se connecter</button>
        </div>
    )
}

export default Login