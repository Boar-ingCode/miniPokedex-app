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
          src={pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name}
          className="pokemon-image"
        />
        
        <h1 className="pokemon-name">{pokemon.name}</h1>
        <div className="pokemon-info">
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

         <div className="abilities-section">
            <h3>Abilities</h3>
            <div className="abilities-grid">
                {pokemon.abilities.map((abilityData) => (
                <div key={abilityData.ability.name} className="ability-card">
                    <span className="ability-name">
                    {abilityData.ability.name.replace('-', ' ')}
                    </span>
                </div>
                ))}
            </div>
        </div>

          <div className="stats-section">
            <h3>Stats</h3>
            <div className="stats-grid">
              {pokemon.stats.map(({ stat, base_stat }) => (
                <div key={stat.name} className="stat-bar">
                  <span className="stat-name">
                    {stat.name.replace('-', ' ')}
                  </span>
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
    </div>
  );
};
