import React, { Component } from 'react';
import PokeCard from './PokeCard';


class Pokedex extends Component {
    
    getDetail(pokeUrl){
        this.props.showDetail(pokeUrl);
    }

    countIncrease(){
        this.props.increaseCount();
    }

    render() {
    let pokemonList;
    if(this.props.pokemon){
        pokemonList = this.props.pokemon.map(pokemon =>{
            return (
                <PokeCard increaseCount={this.countIncrease.bind(this)} showDetail={this.getDetail.bind(this)} key={pokemon.name} pokemon={pokemon} /> 
            );
        });
    }
    return(
        <div id="pokedex" className="Pokedex">
            <h1>Welcome to the Pokédex.</h1>
            <h2>For detailed information on a pokémon, click it's image.</h2>
            <div id="pokeGrid">
            {pokemonList}
            </div>
        </div>
    )
  }
}

export default Pokedex;
