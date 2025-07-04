import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pokemonApi } from '../../api/pokemonApi';
import type { Pokemon } from '../../types/pokemon';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';

export const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const data = await pokemonApi.getPokemonById(Number(id));
        setPokemon(data);
      } catch (err) {
        setError('Failed to load Pokemon details');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!pokemon) return null;

  return (
    <div className="pokemon-detail">
      <button 
        onClick={() => navigate('/')}
        className="back-button"
      >
        ← Back to List
      </button>

      <div className="detail-card">
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-image"
        />
        
        <h1 className="pokemon-name">{pokemon.name}</h1>

        <div className="pokemon-info">
          <div className="stats-grid">
            <div className="stat">
              <span>Height:</span> {pokemon.height / 10}m
            </div>
            <div className="stat">
              <span>Weight:</span> {pokemon.weight / 10}kg
            </div>
          </div>

          <div className="types-section">
            <h3>Types</h3>
            <div className="types">
              {pokemon.types.map(({ type }) => (
                <span 
                  key={type.name} 
                  className={`type-badge ${type.name}`}
                >
                  {type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="stats-section">
            <h3>Stats</h3>
            {pokemon.stats.map(({ stat, base_stat }) => (
              <div key={stat.name} className="stat-bar">
                <span className="stat-name">{stat.name}</span>
                <div className="stat-bar-container">
                  <div 
                    className="stat-bar-fill"
                    style={{ width: `${(base_stat / 255) * 100}%` }}
                  />
                </div>
                <span className="stat-value">{base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
