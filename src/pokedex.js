import React, { Component } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import "semantic-ui-css/semantic.min.css";
import "./styles.css";

class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summari: {},
      pokemonList: this.props.pokemonList ? this.props.pokemonList : [],
    };
  }

  componentDidMount = () => {};

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      pokemonList: nextProps.pokemonList,
    });
  };

  handleClick = (value) => {
    let newObj = {};
    newObj.name = value.data.name;
    newObj.img = value.data.sprites.front_default;
    newObj.abilities = value.data.abilities;
    newObj.base_experience = value.data.base_experience;
    newObj.moves = value.data.moves;
    newObj.types = value.data.types;
    this.setState({ summari: newObj });
  };

  render() {
    let { pokemonList, summari } = this.state;
    return (
      <div class="col-12">
        <Row>
          <div class="col-2"></div>
          <div class="col-8 center">
            <Col xs={12} md={12} lg={12}>
              <Card className="myCard_Pokedex">
                <CardBody>
                  <div className="col-12 center">
                    <img
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/640px-International_Pok%C3%A9mon_logo.svg.png"
                      }
                      height="100"
                      alt="grid"
                    />
                  </div>
                  <div className="space"></div>
                  <Row>
                    <div className="col-6 center listScroll">
                      <Row>
                        {pokemonList.map((e, index) => {
                          return (
                            <Col
                              onClick={() => this.handleClick(e)}
                              xs={12}
                              md={12}
                              lg={6}
                            >
                              {
                                <Card className="myCardList">
                                  <CardBody>
                                    <h4>{e.data.name}</h4>

                                    <img
                                      src={e.data.sprites.front_default}
                                      alt="grid"
                                    />
                                  </CardBody>
                                </Card>
                              }
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                    <div className="col-5 center">
                      {Object.entries(summari).length > 0 ? (
                        <Card className="myCard colorpath ">
                          <CardBody>
                            <Row>
                              <div className="col-3 center">
                                <spam className="title">ABILITIES</spam>
                                <br />
                                {summari.abilities.map((e, index) => {
                                  return (
                                    <>
                                      {" "}
                                      <spam className="title">
                                        *{e.ability.name}
                                      </spam>
                                      <br />
                                    </>
                                  );
                                })}
                              </div>
                              <div className="col-6 center">
                                <h4>{summari.name}</h4>
                                <img src={summari.img} alt="grid" />
                              </div>
                              <div className="col-3 center">
                                <spam className="title">TYPES</spam>
                                <br />
                                {summari.types.map((e, index) => {
                                  return (
                                    <>
                                      {" "}
                                      <spam className="title">
                                        *{e.type.name}
                                      </spam>
                                      <br />
                                    </>
                                  );
                                })}
                              </div>
                            </Row>
                            <Row>
                              <div className="col-6 center">
                                <spam className="title">Base Experience</spam>
                                <br />
                                <h4>{summari.base_experience}</h4>
                              </div>
                              <div className="col-6 center">
                                <spam className="title">Movement Number</spam>
                                <br />
                                <h4>{summari.moves.length}</h4>
                              </div>
                            </Row>
                          </CardBody>
                        </Card>
                      ) : (
                        <Card className="myCard colorpath ">
                          <CardBody>
                            <div className="col-m-1 center">NO DATA</div>
                          </CardBody>
                        </Card>
                      )}
                      <div className="space"></div>
                      <div className="space"></div>
                      <Col>
                        <div className="col-xs-12 center">
                          <img
                            height="150"
                            src={
                              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1026px-Pok%C3%A9_Ball_icon.svg.png"
                            }
                            alt="grid"
                          />
                          <div className="space"></div>

                          <img
                            height="150"
                            src={
                              "https://seeklogo.com/images/P/pikachu-logo-619ACB690E-seeklogo.com.png"
                            }
                            alt="grid"
                          />
                        </div>
                      </Col>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </div>
          <div class="col-2"></div>
        </Row>
      </div>
    );
  }
}

export default Pokedex;
