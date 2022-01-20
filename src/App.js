import React, { Component } from "react";
import axios from "axios";
import { Card, CardBody, Button, Col, Row } from "reactstrap";
import { Input } from "reactstrap";
import Cards from "./card";
import Pokedex from "./pokedex";
import "./styles.css";

class pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      searchforName: {},
      pokemonListAbility: [],
      pokemonList: [],
      nolocalizad: "",
      pokemonname: "",
      abilityPokemon: "",
      urlPokemon: "https://pokeapi.co/api/v2/pokemon",
      urlAbility: "https://pokeapi.co/api/v2/ability",
    };
  }

  componentDidMount = () => {
    this.getPokemon();
  };

  getPokemon = (newoffset) => {
    let { urlPokemon, limit, offset } = this.state;
    axios
      .get(
        `${urlPokemon}?limit=${limit}&offset=${newoffset ? newoffset : offset}`
      )
      .then((success) => {
        let pokemonList = success.data.results;
        this.getPokemonOne(pokemonList);
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  getPokemonOne = async (all) => {
    let _pokemonData = await Promise.all(
      all.map(async (url) => {
        let pokemonRecord = await axios.get(url.url);

        return pokemonRecord;
      })
    );
    this.setState({ pokemonList: _pokemonData });
  };

  getPokemonAbility = async (all) => {
    try {
      let _pokemonData = await Promise.all(
        all.map(async (url) => {
          let pokemonRecord = await axios.get(url.pokemon.url);
          return pokemonRecord;
        })
      );

      this.setState({
        pokemonListAbility: _pokemonData,
      });
    } catch (ex) {
      this.setState({
        pokemonListAbility: [],
      });
    }
  };

  handleChange = (name) => (event) => {
    let { pokemonname } = this.state;
    pokemonname = event.target.value;
    this.setState({ pokemonname });
  };

  handleChangeAbility = (name) => (event) => {
    let { abilityPokemon } = this.state;
    abilityPokemon = event.target.value;
    this.setState({ abilityPokemon });
  };

  searchPokemon = async (evt) => {
    let { urlPokemon, pokemonname } = this.state;
    try {
      let searchforName = await axios.get(`${urlPokemon}/${pokemonname}`);

      this.setState({
        searchforName: searchforName.data,
        pokemonname: "",
      });
    } catch (ex) {
      this.setState({
        searchforName: {},
        pokemonname: "",
        nolocalizad: "not located",
      });
    }
  };

  searchPokemonAbility = async (evt) => {
    let { urlAbility, abilityPokemon } = this.state;
    try {
      let searchforAbility = await axios.get(`${urlAbility}/${abilityPokemon}`);
      this.getPokemonAbility(searchforAbility.data.pokemon);
    } catch (ex) {
      this.setState({
        searchforAbility: {},
        abilityPokemon: "",
        pokemonListAbility: [],
        //nolocalizad: "not located"
      });
    }
  };

  componentWillReceiveProps = () => {};

  render() {
    let {
      pokemonname,
      searchforName,
      nolocalizad,
      pokemonList,
      abilityPokemon,
      pokemonListAbility,
      urlPokemon,
    } = this.state;

    return (
      <div class="col-12" xs={6} md={3} lg={3}>
        <div className="space"></div>
        <div>
          <p>
            Grid that gets the first 150 pokemon{" "}
            <a href="https://pokeapi.co/">Poke API</a>{" "}
          </p>
          <Cards
            pagination={true}
            getPokemon={this.getPokemon}
            pokemonList={pokemonList}
            urlPokemon={urlPokemon}
          />
        </div>
        <div className="space"></div>
        <p>Search by name example :"wartortle"</p>
        <Row>
          <div className="space"></div>
          <div className="col-4">
            <Input
              id="pokemonname"
              required
              type="input"
              placeholder="NAME POKEMON"
              name="search"
              value={pokemonname}
              onChange={this.handleChange()}
            />
          </div>
          <div className="col-4">
            <div className="col-md-3 col-lg-1 col-sm-6">
              <Button
                disabled={pokemonname === "" ? true : false}
                variant="contained"
                color="primary"
                className="button"
                onClick={this.searchPokemon}
                size="lg"
              >
                Search
              </Button>
            </div>
          </div>
        </Row>
        <div className="space"></div>
        {Object.entries(searchforName).length > 0 ? (
          <Col xs={12} md={3} lg={3}>
            <Card className="myCard">
              <CardBody>
                <div className="col-m-1 center">
                  <div className="col-m-1 center">
                    <h3>{searchforName.name}</h3>
                    <h3>#{searchforName.id}</h3>
                    <img src={searchforName.sprites.front_default} alt="grid" />

                    <h4>TYPES: </h4>
                    {searchforName.types.map((e, index) => {
                      return (
                        <div className="col-m-1 center">
                          <h4>* {e.type.name}</h4>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ) : (
          <Col xs={12} md={6} lg={4}>
            <Card className="myCard">
              <CardBody>
                <div className="col-m-1 center">
                  {nolocalizad !== "" ? nolocalizad : " SIN DATA"}{" "}
                </div>
              </CardBody>
            </Card>
          </Col>
        )}
        <div className="space"></div>
        <div className="space"></div>
        <p>
          Seeker by skill. example : "beast-boost",
          "flash-fire","normalize","hyper-cutter"."clear-body"
        </p>
        <Row>
          <div className="space"></div>
          <div className="col-4">
            <Input
              id="abilityPokemon"
              required
              type="input"
              placeholder="ABILITY POKEMON"
              name="search"
              value={abilityPokemon}
              onChange={this.handleChangeAbility()}
            />
          </div>
          <div className="col-4">
            <div className="col-md-3 col-lg-1 col-sm-6">
              <Button
                disabled={abilityPokemon === "" ? true : false}
                variant="contained"
                color="primary"
                className="button"
                onClick={this.searchPokemonAbility}
                size="lg"
              >
                Search
              </Button>
            </div>
          </div>
        </Row>
        <div className="space"></div>
        <div className="space"></div>
        {pokemonListAbility.length > 0 ? (
          <Cards
            getPokemon={this.getPokemonAbility}
            pokemonList={pokemonListAbility}
            urlPokemon={urlPokemon}
          />
        ) : (
          <Col xs={12} md={6} lg={4}>
            <Card className="myCard">
              <CardBody>
                <div className="col-m-1 center">"without results"</div>
              </CardBody>
            </Card>
          </Col>
        )}
        <div className="space"></div>
        <p>Pokedex:</p>
        <div className="space"></div>
        <div className="space"></div>
        <Pokedex pokemonList={pokemonList} />
        <div className="space"></div>
        <div className="space"></div>
        <p>
          List with click on the card and modal with the evolutions of each
          poquemon:
        </p>

        <div className="space"></div>
        <div className="space"></div>
        <Cards
          pagination={true}
          getPokemon={this.getPokemon}
          pokemonList={pokemonList}
          modal={true}
          urlPokemon={urlPokemon}
        />
        <div className="space"></div>
        <div className="space"></div>
        <div className="space"></div>
      </div>
    );
  }
}

export default pokemon;
