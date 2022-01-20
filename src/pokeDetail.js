import React, { Component } from "react";
import { CardBody } from "reactstrap";
import axios from "axios";

class PokeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {},
    };
  }

  componentDidMount() {
    this.getPokeInfo(this.props.name || this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.getPokeInfo(nextProps.name || nextProps.id);
    }
  }

  getPokeInfo = (name) => {
    axios.get("https://pokeapi.co/api/v2/pokemon/" + name).then((resp) => {
      this.setState({ pokemon: resp.data });
    });
  };

  render() {
    const { pokemon } = this.state;

    if (pokemon) {
      return (
        <CardBody>
          <div className="col-m-1 center">
            <h4>{pokemon.name}</h4>
            <h4>#{pokemon.id}</h4>
            {pokemon.sprites && (
              <img src={pokemon.sprites.front_default} alt="grid" />
            )}
          </div>
        </CardBody>
      );
    }
    return null;
  }
}

export default PokeDetail;
