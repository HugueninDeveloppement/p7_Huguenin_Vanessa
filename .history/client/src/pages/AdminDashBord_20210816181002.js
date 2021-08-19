import React ,{useContext}  from 'react';
import {AuthContext} from '../utils/helpers/AuthContext';

function AdminDashBord() {

    const {authStatus} = useContext(AuthContext);


    return (
        <div>
                {console.log(authStatus);}
        </div>
    )
}

export default AdminDashBord
