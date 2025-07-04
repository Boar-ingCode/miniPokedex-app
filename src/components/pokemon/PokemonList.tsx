import { useState, useEffect, useRef } from 'react';
import { pokemonApi } from '../../api/pokemonApi';
import type { Pokemon } from '../../types/pokemon';
import { PokemonCard } from './PokemonCard';
import { Loading } from '../common/Loading';
import { ErrorMessage } from '../common/ErrorMessage';

export const PokemonList = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMorePokemon = async () => {
    try {
      setLoading(true);
      const response = await pokemonApi.getPokemons(20, offset);
      
      const newPokemon = await Promise.all(
        response.results.map(p => pokemonApi.getPokemonByName(p.name))
      );

      setPokemon(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const uniqueNewPokemon = newPokemon.filter(p => !existingIds.has(p.id));
        return [...prev, ...uniqueNewPokemon];
      });

      setHasMore(response.next !== null);
    } catch (err) {
      setError('Failed to load Pokemon');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      loadMorePokemon();
    }
  }, [offset]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading && !searchTerm) {
          setOffset(prev => prev + 20);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, searchTerm]);

  const searchPokemon = async (term: string) => {
    if (!term) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const response = await pokemonApi.getPokemons(11000, 0); 
      
      const matchingNames = response.results
        .filter(p => p.name.toLowerCase().includes(term.toLowerCase()))
        .slice(0, 20); 

      const searchResults = await Promise.all(
        matchingNames.map(p => pokemonApi.getPokemonByName(p.name))
      );

      setSearchResults(searchResults);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      searchPokemon(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const displayedPokemon = searchTerm ? searchResults : pokemon;

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="pokemon-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="pokemon-grid">
        {displayedPokemon.map(p => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>

      {loading && (
        <div className="loading">
          <Loading />
        </div>
      )}

      {!searchTerm && <div ref={observerTarget} style={{ height: '20px' }} />}
    </div>
  );
};

export default PokemonList;
