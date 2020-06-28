import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';
import logoImg from '../../assets/LogoRSITecnologia.png';

export default function Register(){
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        const data = {
            userName,
            userPassword,
        };
        try{
            const response = await api.post('user',data);
            alert(`Usuário cadastrado com sucesso, Bem-vindo: ${response.data.userName}`);
        history.push('/');
    }catch(error){
        alert('Erro no cadastro, tente novamente');
     }
    }
    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro e tenha acesso ao painel administrativo.</p>
                    <Link className="back-link" to="/"><FiArrowLeft size={16} color="#FF6310"/>Já possuo cadastro</Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input value={userName} onChange={e => setUserName(e.target.value)} placeholder="Nome de usuário"/>
                    <input  value={userPassword} onChange={e => setUserPassword(e.target.value)} type="password" placeholder="Senha de acesso"/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}