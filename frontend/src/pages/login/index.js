import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';
import heroes from '../../assets/heroes.png';
import { useReducer } from 'react';

export default function Login(){

    const [id, setId] = useState('');
    const histoy = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            histoy.push('/profile');
        }catch (error) {
            alert("Falha no login , tente novamente.");
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Logo Image"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size="16" color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

        <img src={heroes} alt="Front Image"/>
        </div>
    )
}
