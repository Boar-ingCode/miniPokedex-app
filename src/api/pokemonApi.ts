import axios from 'axios';
import type { Pokemon, PokemonListResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = {
  async getPokemons(limit: number = 50, offset: number = 0) {
    try {
      const response = await axios.get<PokemonListResponse>(
        `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw error;
    }
  },

  async getPokemonByName(name: string) {
    try {
      const response = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${name}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon ${name}:`, error);
      throw error;
    }
  },

  async getPokemonById(id: number) {
    try {
      const response = await axios.get<Pokemon>(`${BASE_URL}/pokemon/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon ID ${id}:`, error);
      throw error;
    }
  }
};
