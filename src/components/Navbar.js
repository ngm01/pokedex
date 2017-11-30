import React, { Component } from 'react';




class Navbar extends Component {

    render() {
    return(
        <div className="Navbar">
            <div id="header">
            <h1>Welcome to the Pokédex.</h1>
            <h2>Click a card for more information about a pokémon.</h2>
            <h3>Scroll down to view additional pokémon.</h3>
            <a href="#">Back to Top</a>
            </div>
        </div>
    )
  }
}

export default Navbar;