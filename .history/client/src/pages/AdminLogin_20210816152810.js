import React, {useState , useContext}from 'react';
import Axios from 'axios';
import {useHistory} from'react-router-dom';
import {AuthContext} from '../utils/helpers/AuthContext';

function Login() {

    const [adminPseudo, setAdminPseudo] = useState("")
    const [adminPassword, setAdminPassword] = useState("")
    const { setAuthState } = useContext(AuthContext)

    let history =useHistory();

    const login =() => {
        const data = {adminPseudo:adminPseudo, adminPassword:adminPassword}
        Axios.post("http://localhost:3006/api/admin/loginAdmin", data).then((response)=>{
            if(response.data.error) {
                alert(response.data.error)
            }else{
                localStorage.setItem("accesToken", response.data.token);
                setAuthState({adminPseudo:response.data.adminPseudo, id:response.data.id, status:true})
                history.push("/")
            };
            
        })
        
    }

    return (
        <div>
            <label id="adminPseudo">Nom d'utilisateur</label>
            <input type="text" name="adminPseudo" onChange={(e)=>{setAdminPseudo(e.target.value)}}/>
            <label id="adminPassword">Mot de passe </label>
            <input type="password" name="adminPassword" onChange={(e)=>{setAdminPassword(e.target.value)}}/>

            <button onClick={login}>Se connecter</button>
        </div>
    )
}

export default Login
