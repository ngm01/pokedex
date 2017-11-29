import React, { Component } from 'react';
import $ from 'jquery';



class PokeCard extends Component {

    constructor(){
        super();
        this.state = {
            imgUrl: ""
        }
    }
    
    getImg(){
        $.ajax({
            url: this.props.pokemon.url,
            dataType: 'json',
            cache: true,
            success: function(data){
                this.setState({imgUrl: data.sprites.front_default}),
                this.countIncrease()
            }.bind(this),
                
            error: function(xhr, status, err){
                console.log(err);
            }
        })
    }

    detailClick(pokeUrl){
        this.props.showDetail(pokeUrl);
    }

    countIncrease(){
        this.props.increaseCount();
    }

    componentDidMount(){
        this.getImg();
    }

    render() {

    return (
      <div className="PokeCard">
        {/* <legend>{this.props.pokemon.name}</legend> */}
        <img onClick={this.detailClick.bind(this, this.props.pokemon.url)} src={this.state.imgUrl} alt={this.props.pokemon.name}/>
      </div>
    );
  }
}

export default PokeCard;
