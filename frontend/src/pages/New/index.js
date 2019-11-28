import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [spaServices, setSpaServices] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('spaServices', spaServices);
    data.append('price', price);

    await api.post('/spas', data, {
      headers: { user_id }
    })

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label 
        id="thumbnail" 
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="company">PROFISSIONAL/ EMPRESA *</label>
      <input 
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="spaServices">SERVIÇOS * <span>(separadas por vírgula)</span></label>
      <input 
        id="spaServices"
        placeholder="Qual serviço gostaria de oferecer?"
        value={spaServices}
        onChange={event => setSpaServices(event.target.value)}
      />

      <label htmlFor="price">VALOR DO SERVIÇO * <span>(em branco para GRATUITO)</span></label>
      <input 
        id="price"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button type="submit" className="btn">Cadastrar</button>
    </form>
  )
}