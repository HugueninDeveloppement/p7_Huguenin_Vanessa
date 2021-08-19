import React from 'react';
import {useHistory} from'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'; 
import Axios from "axios";

function Register() {

    let history =useHistory();

    const initailValues = {
        userPseudo:"",
        userName:"",
        userEmail:"",
        userPassword:"",
    };    

    const validationSchema = Yup.object().shape({
        userPseudo:Yup.string().min(5).max(15).required(),
        userName:Yup.string().max(20).required(),
        userEmail:Yup.string().email().required(),
        userPassword:Yup.string().min(8).max(15).required(),
    });

    const onSubmit = (data) => {
        console.log(data)
        Axios.post("http://localhost:3006/api/users/auth", data)
         .then((data)=>{
            console.log(data);
            history.push("/login")
        });
    }

    return (
        <div className="flex-row h-96 m-8 border border-gray-100 content-between;">
            <Formik initialValues={initailValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formRegisterContainer">
                    <div className="flex-col">
                       <label className="w-1/2">Nom d'utilisateur: </label>
                        <ErrorMessage name="userPseudo" component="span"/>
                        <Field className="w-1/2" autoComplete="off" id="inputCreateUser" name="userPseudo" placeholder="(ex: Ness973)"/> 
                    </div>
                    <div className="flex-col">
                      <label className="w-1/2">Nom de famille: </label>
                        <ErrorMessage name="userName" component="span"/>
                        <Field className="w-1/2" autoComplete="off" id="inputCreateUser" name="userName" placeholder="(ex: julie)"/>  
                    </div>
                    <div className="flex-col">
                        <label className="w-1/2">Mail: </label>
                        <ErrorMessage name="userEmail" component="span"/>
                        <Field autoComplete="off" id="inputCreateUser" name="userEmail" placeholder="(ex: monemail@serviceintel.fr)"/>
                    </div>                    
                    <div>
                        <label>Mot de passe: </label>
                    <ErrorMessage name="userPassword" component="span"/>
                    <Field autoComplete="off" type="password" id="inputCreateUser" name="userPassword" placeholder="(8 caracteres minimum)"/>
                    </div>
                    


                    <button type="submit">S'inscrire</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Register
