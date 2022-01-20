import React, { Component } from "react";
import { Pagination } from "semantic-ui-react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Modal } from "antd";
import PokeDetail from "./pokeDetail";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";

class CardData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlPokemon: this.props.urlPokemon ? this.props.urlPokemon : "",
      visibleComp: false,
      pagination: this.props.pagination ? this.props.pagination : false,
      activePage: 1,
      offset: 0,
      totalPage: 15,
      pokemonList: this.props.pokemonList ? this.props.pokemonList : [],
      pokemonEvos: [],
      dataModal: [],
    };
  }

  componentDidMount = () => {};

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      pokemonList: nextProps.pokemonList,
      pagination: nextProps.pagination,
    });
  };

  changePage = (page) => {
    let offset = 0;

    if (page === 1) {
      offset = 0;
    } else {
      offset = `${page - 1}` + 0;
    }

    this.setState(
      {
        activePage: page,
        offset,
      },
      () => {
        this.props.getPokemon(offset);
      }
    );
  };

  getEvoChain = (url) => {
    this.setState({ pokemonEvos: [] });
    axios
      .get(url)
      .then((resp) => {
        this.getPokeEvo(resp.data.evolution_chain.url);
      })
      .catch((err) => {
      });
  };

  findEvo = (pokeEvoArr) => {
    pokeEvoArr.forEach((element) => {
      if (element.evolves_to.length > 0) {
        this.findEvo(element.evolves_to);
      }
      let pokeAux = this.state.pokemonEvos;
      pokeAux.push(element.species);
      this.setState({ pokemonEvos: pokeAux });
    });
  };

  activeModal = async (pokemones) => {
    let { urlPokemon } = this.state;
    let _pokemonData = await Promise.all(
      pokemones.map(async (e) => {
        let url = `${urlPokemon}/` + e;
        let pokemonRecord = await axios.get(url);
        return pokemonRecord;
      })
    );
    this.setState({
      dataModal: _pokemonData,
      visibleComp: true,
    });
  };

  getPokeEvo = (url) => {
    axios
      .get(url)
      .then((resp) => {
        let pokeAux = this.state.pokemonEvos;
        pokeAux.push(resp.data.chain.species);
        this.setState({ pokemonEvos: pokeAux });
        if (resp.data.chain.evolves_to.length > 0) {
          this.findEvo(resp.data.chain.evolves_to);
        }
        let arrayId = [];
        for (let i = 0; i < this.state.pokemonEvos.length; i++) {
          const e = this.state.pokemonEvos[i];
          arrayId.push(e.name);
        }
        this.activeModal(arrayId);
      })
      .catch((err) => {
      });
  };

  render() {
    let {
      pokemonList,
      activePage,
      totalPage,
      pagination,
      visibleComp,
      dataModal,
    } = this.state;
    return (
      <div class="col-12">
        <Row>
          {pokemonList.map((e, index) => {
            return (
              <Col xs={4} md={2} lg={2}>
                <Card
                  onClick={() => {
                    if (this.props.modal) {
                      this.getEvoChain(e.data.species.url);
                    }
                  }}
                  className="myCard"
                >
                  <CardBody>
                    <div className="col-m-1 center">
                      <h4>{e.data.name}</h4>
                      <h4>#{e.data.id}</h4>
                      <img src={e.data.sprites.front_default} alt="grid" />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
          {pagination === true ? (
            <Col xs={12} md={12} lg={12}>
              <center>
                <Pagination
                  activePage={activePage}
                  ellipsisItem={null}
                  totalPages={totalPage}
                  onPageChange={(e, { activePage }) =>
                    this.changePage(activePage, 1)
                  }
                />
              </center>
            </Col>
          ) : (
            ""
          )}
        </Row>

        <Modal
          title="Evolution Pokemon"
          centered
          visible={visibleComp}
          onCancel={() => this.setState({ visibleComp: false })}
          width={1000}
          footer={null}
        >
          <Row>
            {dataModal.map((e, index) => {
              return (
                <Col xs={12} md={12} lg={6}>
                  {
                    <Card className="myCardList">
                      <CardBody>
                        <Row>
                          <Col xs={12} md={12} lg={6}>
                            <h4>{e.data.name}</h4>

                            <img
                              src={e.data.sprites.front_default}
                              alt="grid"
                            />
                          </Col>
                          <Col xs={12} md={12} lg={6}>
                            <h4>{"Abilities "}</h4>
                            {e.data.abilities.map((e, index) => {
                              return (
                                <>
                                  <spam className="title">
                                    *{e.ability.name}
                                  </spam>
                                  <br />
                                </>
                              );
                            })}
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  }
                </Col>
              );
            })}
          </Row>
        </Modal>
      </div>
    );
  }
}

export default CardData;
