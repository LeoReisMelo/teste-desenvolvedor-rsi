import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import ListProduct from './pages/ListProduct';
import CreateProduct from './pages/CreateProduct';
import RegisterUser from './pages/RegisterUser';

const Routes = () =>{
    return (
        <BrowserRouter>
            <Route component={Login} path="/" exact/>
            <Route component={ListProduct} path="/product"/>
            <Route component={CreateProduct} path="/create-product"/>
            <Route component={RegisterUser} path="/registeruser"/>
        </BrowserRouter>
    );
}

export default Routes;