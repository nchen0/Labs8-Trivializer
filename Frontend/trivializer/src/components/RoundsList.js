import React, { Component } from "react";
import { Link } from "react-router-dom";
import Rounds from "./Rounds";
import { connect } from "react-redux";
import { fetchRoundsReq } from "../actions";
import "./Rounds.css";

/**
 * RoundsList Component
 * - renders a list of rounds for the selected game
 */
class RoundsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRounds: []
    };
  }

  componentDidMount() {
    const id = Number(this.props.id);
    console.log(id);

    this.props.fetchRoundsReq(id);
  }

  newRound = () => {
    console.log("New Round!!");
    let round = {
      roundId: null,
      roundName: "Default Value",
      numQs: 0,
      category: "any",
      difficulty: "all",
      type: "multiple"
    };
    this.setState({ newRounds: [...this.state.newRounds, round] });
  };

  render() {
    return (
      <div>
        {this.props.fetchingRounds === true ? (
          "Loading...."
        ) : (
          <div>
            <div className="roundsList">
              {this.props.rounds.map((round, i) => (
                <div>
                  <Rounds key={round.roundId} index={i} round={round} />
                </div>
              ))}

              {/* Loops throught the new rounds the user has created, not yet saved and thus not in Redux store */}
              {this.state.newRounds.map((round, i) => (
                <div>
                  {/* New rounds should come after existing rounds */}
                  <Rounds
                    new
                    key={this.props.rounds.length + i + 1}
                    index={this.props.rounds.length + i + 1}
                    round={round}
                  />
                </div>
              ))}
              <div>
                <div>New Round</div>
                <button onClick={this.newRound}>+</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ gamesList }) => {
  return {
    fetchingRounds: gamesList.fetching_rounds,
    fetchedRounds: gamesList.fetched_rounds,
    error: gamesList.error,
    rounds: gamesList.rounds
  };
};

export default connect(
  mapStateToProps,
  { fetchRoundsReq }
)(RoundsList);
