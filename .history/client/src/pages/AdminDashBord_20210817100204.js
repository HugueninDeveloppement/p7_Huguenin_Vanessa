import React ,{useContext} from 'react';
import Axios from "axios";
import { useEffect, useState} from "react";
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from '../utils/helpers/AuthContext';

function AdminDashBord() {




    return (
        <div>
                {console.log(authState)}
        </div>
    )
}

export default AdminDashBord
