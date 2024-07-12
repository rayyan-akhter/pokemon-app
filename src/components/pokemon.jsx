import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./style.css"

const Pokemon = () => {
    const [pokemons,setPokemons] =  useState([]);
    const [search , setSearch] = useState("");

    useEffect(() => {
        const fetchPokemons = async () => {
          try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100'); 
            console.log('Fetched Pokémon list:', response.data.results);
            
            const pokemonData = await Promise.all(
              response.data.results.map(async (pokemon) => {
                const pokemondetail = await axios.get(pokemon.url);
                return pokemondetail.data;
              })
            );
            
            setPokemons(pokemonData);
          } catch (error) {
            console.error('Error fetching Pokémon data:', error);
          }
        };
    
        fetchPokemons();
      }, []);
    const handleSearch = (e) =>{
        setSearch(e.target.value.toLowerCase());
    };

    const filteredPokemon = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search))
  return (
    <div>
        <input type="text" placeholder='Search pokemon' value={search} onChange={handleSearch} className='search-input' />
        <div className='pokemon-list'>
            {filteredPokemon.map(pokemon=>(
                <div key={pokemon.id}>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <h3>{pokemon.name.toUpperCase()}</h3>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Pokemon;