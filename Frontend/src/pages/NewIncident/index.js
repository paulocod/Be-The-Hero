import React, { useState } from 'react'
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';


import { Container, Section, Form } from './styles.js';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = { title, description, value };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente');
    }
  }

  return(
    <Container>
      <div>
        <Section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um heroí para resolver isso</p>

          <Link to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home</Link>
        </Section>

        <Form onSubmit={handleNewIncident}>
          <input 
            placeholder="Titulo do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input 
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </Form>
      </div>
    </Container>
  );
}