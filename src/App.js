import React, { Component } from 'react';
import $ from 'jquery';
import Pokedex from './components/Pokedex';
import Detail from './components/Detail';
import Navbar from './components/Navbar';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      pokemon: {count: 0, previous: "", results: [], next: ""},
      pokeDetail: {},
      show: false,
      offset: 0,
      count: 0,
      loading: false
    }
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  getPokemonData(apiUrl){
    if(apiUrl === undefined){
      apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0";
    }
    $.ajax({
      url: apiUrl,
      dataType: "json",
      cache: true,
      success: function(data){
        if(apiUrl.includes("limit")){
          let offsetUpdater = this.state.offset;
          offsetUpdater += 20;
          if(this.state.pokemon.next !== ""){
            let pokemonUpdater = this.state.pokemon;
            //need a seperate function to handle accidental multiple calls,
            //remove dupes
            pokemonUpdater.results = pokemonUpdater.results.concat(data.results);
            pokemonUpdater.next = data.next;
            pokemonUpdater.count = data.count;
            pokemonUpdater.previous = data.previous;
            this.setState({pokemon: pokemonUpdater})
            this.setState({offset: offsetUpdater})
          }
          else{
          this.setState({pokemon: data});
          }
        }
        else{
          this.setState({pokeDetail: data})
        }
      }.bind(this),
      error: (xhr, status, err)=>{
        console.log("We got an error here: ", xhr);
      }
    })
  }


  detailGetter(pokeApi){
    this.setState({pokeDetail: {}})
    this.getPokemonData(pokeApi);
    this.setState({show: true});
  }

  detailHider(){
    this.setState({show: false});
  }

  counter(){
    let update = this.state.count;
    update++;
    this.setState({count: update});
    console.log(this.state.count);
  }


  componentWillMount(){
    this.getPokemonData();

  }

  componentDidMount(){
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.scrollHandler());
  }

  scrollHandler(e){
    var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    var body = document.body;
    var html = document.documentElement;
    var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    var windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.getPokemonData(this.state.pokemon.next);
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Detail pokeDetail={this.state.pokeDetail} show={this.state.show} hideDetail={this.detailHider.bind(this)}/>
        <Pokedex pokemon={this.state.pokemon.results} showDetail={this.detailGetter.bind(this)}  increaseCount={this.counter.bind(this)}/>
      </div>
    );
  }
}

export default App;
