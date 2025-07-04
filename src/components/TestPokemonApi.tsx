import { useEffect } from 'react';
import { pokemonApi } from '../api/pokemonApi';

export const TestPokemonApi = () => {
  useEffect(() => {
    const testApi = async () => {
      try {
        console.log('Fetching Pokemon list...');
        const pokemonList = await pokemonApi.getPokemons(10, 0);
        console.log('Complete Pokemon list data:', pokemonList);

        console.log('Fetching Pikachu details...');
        const pikachuDetails = await pokemonApi.getPokemonByName('pikachu');
        console.log('Complete Pikachu data:', pikachuDetails);

        console.log('Fetching Pokemon #1 details...');
        const bulbasaurDetails = await pokemonApi.getPokemonById(1);
        console.log('Complete Bulbasaur data:', bulbasaurDetails);

      } catch (error) {
        console.error('Test failed:', error);
      }
    };

    testApi();
  }, []);

  return <div>Check the console for Pokemon data!</div>;
};
