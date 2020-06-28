import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/LogoRSITecnologia.png';
import api from '../../services/api';

export default function ListProduct() {
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pagesTotal, setPagesTotal] = useState(0);
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([]);
    const history = useHistory();
    async function loadProducts() {

        if (loading) {
            return;
        }

        if (total > 0 && products.length === total) {
            return;
        }

        setLoading(true);
        const response = await api.get('product', { params: { page } });

        setProducts([...response.data.products]);

        setTotal(response.data.total);
        setTotalPagesToAlter(response.data.total);

        setLoading(false);
    }

    function setTotalPagesToAlter(total) {
        let calc = 0;
        if (total > 0) {
            calc = Math.ceil(total / 10);
        }
        setPagesTotal(calc);
    }

    function setNextPage() {
        if (page >= pagesTotal) return;
        setPage(page + 1)
    }

    function setPreviusPage() {
        if (page <= 1) return;
        setPage(page - 1)
    }

    useEffect(() => {
        loadProducts()
    }, [page, products]);

    async function handleDeleteProduct(id) {
        try {
            await api.delete(`product/${id}`);
            setProducts([])
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente')
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');

    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem Vindo</span>
                <Link className="button" to="/create-product">Cadastrar novo produto</Link>
                <button onClick={handleLogout} type="button"><FiPower size={18} color="#FF6310" /></button>
            </header>
            <h1>Produtos cadastrados: {total}</h1>

            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <img className="imgProduct" src={product.url} alt={product.nameFile} />
                        <br /><br />
                        <strong>Produto:</strong>
                        <p>{product.nameProduct}</p>
                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.valueProduct)}</p>
                        <button onClick={() => handleDeleteProduct(product._id)} type="button"><FiTrash2 size={20} color="#FF6310" /></button>

                    </li>
                ))}
            </ul>
            <div class="buttons-page">
                <button className="button back" onClick={setPreviusPage}> BACK </button>
                <button className="button next" onClick={setNextPage}> NEXT </button>
                <div className="pagination">{`Página ${page} de ${pagesTotal}`}</div>
            </div>
        </div>
    );

}
