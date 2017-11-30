import React, { Component } from 'react';


class Detail extends Component {

    hideClick(){
        this.props.hideDetail();
    }

    capitalizeFirst(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
    let pokeInfo;
    let divWidth;
    if(this.props.show){
        divWidth = 250;
    }
    else{
        divWidth = 0;
    }
    if(this.props.pokeDetail.name !== undefined){
        pokeInfo = <div id="pokeInfo">
        <p>{this.capitalizeFirst(this.props.pokeDetail.name)}</p>
        <p>
            <div class="loaded"><img src={this.props.pokeDetail.sprites.front_default} alt={this.props.pokeDetail.name}/></div></p>
        <p>Weight: {this.props.pokeDetail.weight} kg</p>
        <p>Ability: {this.capitalizeFirst(this.props.pokeDetail.abilities[0].ability.name)}</p>
        </div>
    }
    else
    {
        pokeInfo = <div itemID="detail-loader"><p>Fetching PokéData...</p> <div className="spinner-small"></div></div>
    }
    return(
        <div className="Detail" style={{width: divWidth}}>
            <a className="close-detail" href="javascript:void(0)" onClick={this.hideClick.bind(this)}>&times;</a>
            {pokeInfo}
        </div>
    )
  }
}

export default Detail;