import React, { Component } from 'react';


class Detail extends Component {

    hideClick(){
        this.props.hideDetail();
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
        pokeInfo = <p>{this.props.pokeDetail.name} weighs {this.props.pokeDetail.weight} kg.</p>
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