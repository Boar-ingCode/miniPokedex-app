import axios from 'axios';
import type { Pokemon, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = {
  async getPokemons(limit: number = 50, offset: number = 0) {
    try {
      const response = await axios.get<PokemonListResponse>(
        `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
      );
      console.log('Pokemon List Response:', {
        count: response.data.count,
        results: response.data.results,
        next: response.data.next,
        previous: response.data.previous
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw error;
    }
  },

  async getPokemonByName(name: string) {
    try {
      const response = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${name}`);
      console.log('Pokemon Details by Name:', {
        id: response.data.id,
        name: response.data.name,
        types: response.data.types,
        sprites: response.data.sprites,
        stats: response.data.stats,
        abilities: response.data.abilities
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon ${name}:`, error);
      throw error;
    }
  },

  async getPokemonById(id: number) {
    try {
      const response = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${id}`);
      console.log('Pokemon Details by ID:', {
        id: response.data.id,
        name: response.data.name,
        types: response.data.types,
        sprites: response.data.sprites,
        stats: response.data.stats,
        abilities: response.data.abilities
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon ID ${id}:`, error);
      throw error;
    }
  }
};
