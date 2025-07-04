import { useState, useEffect } from 'react';
import { pokemonApi } from '../../api/pokemonApi';
import type { Pokemon } from '../../types/pokemon';
import { PokemonCard } from './PokemoncCard';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';
import '../../styles/pokemon.css'

export const PokemonList = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const response = await pokemonApi.getPokemons(50, 0);
        const pokemonDetails = await Promise.all(
          response.results.map(p => pokemonApi.getPokemonByName(p.name))
        );
        setPokemon(pokemonDetails);
      } catch (err) {
        setError('Failed to load Pokemon');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  const filteredPokemon = pokemon.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="pokemon-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="pokemon-grid">
        {filteredPokemon.map(p => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
};
