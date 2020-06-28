import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import './styles.css'
import '../../global.css'
import api from '../../services/api';
import logoImg from '../../assets/LogoRSITecnologia.png';
import rsi from '../../assets/rsi.png';

export default function Login(){
    const [userName, setUserName]=useState('');
    const [userPassword, setUserPassword]=useState('');
const history = useHistory();
async function handleLogin(e){
    e.preventDefault();
    try{
        console.log(userPassword);
        const response = await api.post('login',{userName, userPassword});
        history.push('/product');

    }catch(error){
        alert('Falha no login, tente novamente');
    }
}
    return (
        <div className="logon-container">
            <section className="form">
                
            <img src={logoImg} alt="RSI logo"/>
                <form onSubmit={handleLogin}>
                  <h1>Faça seu login</h1>
                  <input value={userName} onChange={e => setUserName(e.target.value)} placeholder="Seu usuário"/>
                  <input value={userPassword} onChange={e => setUserPassword(e.target.value)} type="password" placeholder="Sua senha"/>
                  <button type="submit" className="button">Login</button>
                  <Link className="back-link" to="/registeruser"><FiLogIn size={16} color="#FF6310"/>Não tenho cadastro</Link>
                </form>
            </section>
            <img src ={rsi} alt="Rsi background"/>
        </div>
    );
}