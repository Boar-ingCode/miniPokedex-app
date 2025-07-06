import type { Pokemon } from '../../types/pokemon';
import { Link } from 'react-router-dom';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const hasOneType = pokemon.types.length === 1;
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card">
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
          alt={pokemon.name}
          className="pokemon-image"
        />
        <h3 className="pokemon-name">{pokemon.name}</h3>
        <div className={`pokemon-types ${hasOneType ? 'single-type' : ''}`}>
        <div className="pokemon-types">
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
    </Link>
  );
};
