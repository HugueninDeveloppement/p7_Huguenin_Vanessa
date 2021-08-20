import React, {useState , useContext}from 'react';
import Axios from 'axios';
import {useHistory} from'react-router-dom';
import {AuthContext} from '../utils/helpers/AuthContext';
import { Formik } from 'formik';

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
                history.push("/")
            };            
        })        
    }

    return (
        <div className="form-login">
            <div className="group-form-login">          
                <label className="userPseudo">Nom d'utilisateur :</label>
                <input id="group-form-login-input-text" type="text" name="userPseudo" onChange={(e)=>{setUserPseudo(e.target.value)}}/>
            </div>
            <div  className="group-form-login">
                <label id="userPassword">Mot de passe :</label>
                <input id="group-form-login-Password" type="password" name="userPassword" onChange={(e)=>{setUserPassword(e.target.value)}}/>
            </div>
            <div>
                <button type="submit">Se connecter</button>           
            </div>
          
        </div>
    )
}

export default Login