import React, { Component } from 'react';
import $ from 'jquery';



class PokeCard extends Component {

    constructor(){
        super();
        this.state = {
            imgUrl: "",
            name: "",
            loadingDiv: "loadingImg"
        }
    }
    
    getImg(){
        this.setState({loading: "loadingImg"});
        $.ajax({
            url: this.props.pokemon.url,
            dataType: 'json',
            cache: true,
            success: function(data){
                this.setState({imgUrl: data.sprites.front_default}),
                this.setState({loading: "loaded"}),
                this.setState({name: data.name})
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

    capitalizeFirst(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        let cardDiv;
        if(this.state.loadingDiv="loaded"){
            cardDiv =
            <div>         
            <div className={this.state.loading}>
                <img src={this.state.imgUrl} alt={this.state.name}/>
            </div>
            <p>{this.capitalizeFirst(this.state.name)}</p>
            </div>
        }
        else{
            cardDiv =  
            <div>
            <div className={this.state.loading}></div>
            <p>Loading...</p>
            </div>
        }
    return (
      <div className="PokeCard" onClick={this.detailClick.bind(this, this.props.pokemon.url)}>
        {cardDiv}
      </div>
    );
  }
}

export default PokeCard;
