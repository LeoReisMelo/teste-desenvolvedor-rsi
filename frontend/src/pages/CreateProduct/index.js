import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/LogoRSITecnologia.png';
import api from '../../services/api';

export default function CreateProduct() {
    const [selectedFile, setSelectedFile] = useState();
    const [nameProduct, setNameProduct] = useState('');
    const [valueProduct, setValueProduct] = useState('');
    const history = useHistory();

    async function handleRegisterProduct(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('nameProduct', nameProduct);
        data.append('valueProduct', valueProduct);
        data.append('file', selectedFile);
        try {
            await api.post('product', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Produto cadastrado com sucesso');
            history.push('/create-product');
        } catch (error) {
            alert('Erro no cadastro, tente novamente');
        }
    }


    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo produto</h1>
                    <p>Insira os dados do novo produto.</p>
                    <Link className="back-link" to="/product"><FiArrowLeft size={16} color="#FF6310" />Voltar para listagem</Link>
                </section>
                <form onSubmit={handleRegisterProduct}>
                    <input onChange={(e) => setNameProduct(e.target.value)} defaultValue={nameProduct} placeholder="Nome do produto" />
                    <input onChange={(e) => setValueProduct(e.target.value)} defaultValue={valueProduct} type="number" placeholder="Valor do produto R$:" />
                    <input onChange={(e) => setSelectedFile(e.target.files[0])} type="file" />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}