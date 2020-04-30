// this class is modified from Andrea Arcuri's repository https://github.com/arcuri82/web_development_and_api_design


import React from "react";
import HeaderBar from "./headerbar";
import {Link, withRouter} from 'react-router-dom';

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sendTo: "",
            amountToSend: "",
            balance: null,
            pokemon: null,
            errorMsg: null
        };
    }

    componentDidMount() {
        this.fetchPokemon();
        this.updateBalance();
    }

    async fetchPokemon() {

        let url = '/api/myPokemons';

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            this.setState({
                error: "ERROR when retrieving list of Pokèmon's: " + err,
                pokemon: null
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                pokemon: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                pokemon: null
            });
        }
    }

    salePokemon = async (id) => {

        const url = "/api/poke/" + id;

        let response;

        try {
            response = await fetch(url, {method: "delete"});
        } catch (err) {
            alert("Delete operation failed: " + err);
            return false;
        }

        if (response.status !== 204) {
            alert("Delete operation failed: status code " + response.status);
            return false;
        }

        this.fetchPokemon();

        return true;
    };

    async updateBalance() {
        const url = "/api/user";

        let response;

        try {
            response = await fetch(url);
        } catch (err) {
            this.setState({
                errorMsg: "ERROR when retrieving balance: " + err,
                balance: null,
                id: null
            });
            return;
        }

        if (response.status === 401) {
            //we are not logged in, or session did timeout
            // this.props.updateLoggedInUserId(null);
            return;
        }

        if (response.status === 200) {
            const payload = await response.json();

            this.setState({
                errorMsg: null,
                balance: payload.balance,
            });

            this.props.updateLoggedInUserId(payload.userId);
        } else {
            this.setState({
                errorMsg: "Issue with HTTP connection: status code " + response.status,
                balance: null
            });
        }
    };

    deleteUser = async (id) => {

        const url = "/api/userDel/" + id;

        let response;

        try {
            response = await fetch(url, {method: "delete"});
        } catch (err) {
            alert("Delete operation failed: " + err);
            return false;
        }

        if (response.status !== 204) {
            alert("Delete operation failed: status code " + response.status);
            return false;
        }


        return true;
    };




    dontShowLootBox() {
        return(
            <div>
          <p> you need 200$ to open a new loot Box</p>
            </div>
        );
    }

    showLootBox() {
        return(
            <div>
                <Link to={"/lootBox"}>
                    <button className="btn btnM" id="lootBoxBtn">
                        <i className="fas fa-box"></i>
                    </button>
                </Link>
            </div>
        );
    }

    render() {
        let table;
        let content;

        if (this.state.error !== null) {
            table = <p>{this.state.error}</p>;
        } else if (this.state.pokemon === null || this.state.pokemon.length === 0) {
            table = <p>There is no Pokèmon registered in your database</p>;
        } else {

            table = <div>
                <table className="allPokemons">
                    <thead>
                    <tr>
                        <th>Pokèmon's</th>
                        <th>Price</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.pokemon.map(m =>
                        <tr key={"key_" + m.id} className="onePokemon">
                            <td>{m.name}</td>
                            <td>{m.price}</td>
                            <td>{m.type}</td>
                            <td>
                                <button className="btn btnM" onClick={_ => this.salePokemon(m.id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>

                    )}
                    </tbody>
                </table>

            </div>; // end table
        }

        if (this.state.balance < 200) {
            content = this.dontShowLootBox();
        } else {
            content = this.showLootBox();
        }

        return (


            <div>
                <HeaderBar
                    userId={this.props.userId}
                />
                <p>Your balance is currently: {this.state.balance}</p>
                <div>

                </div>
                <h2>Your Pokèmon's</h2>
                {content}
                {table}
            </div>

        );// end return
    }// end render
}
export default withRouter(Home);
