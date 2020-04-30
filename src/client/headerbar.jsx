// this class is modified from Andrea Arcuri's repository https://github.com/arcuri82/web_development_and_api_design


import React from "react";
import { Link, withRouter } from "react-router-dom";

export class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }
    doLogout = async () => {
        const url = "/api/logout";

        let response;

        try {
            response = await fetch(url, {method: "post"});
        } catch (err) {
            console.log("Failed to connect to server: " + err);
            return;
        }

        if (response.status !== 204) {
            console.log("Error when connecting to server: status code " + response.status);
            return;
        }
        this.props.history.push("/");
        this.props.updateLoggedInUserId(null);
    };

    renderLoggedIn(userId) {
        return (
            <React.Fragment>
                <p className="header-text">
                    Welcome Trainer {userId} !!!
                </p>

                <Link to={"/home"}>
                    <button className="btn btnM">
                        Home
                    </button>
                </Link>

                <button
                    className="header-button btn btnM"
                    onClick={this.doLogout}
                    id="logoutBtnId">
                    Logout
                </button>

                <Link to={"/"}>
                    <button className="btn btnM">
                         Pokèmon
                    </button>
                </Link>
            </React.Fragment>
        );
    }

    renderNotLoggedIn() {
        return (
            <React.Fragment>
                <p className="header-text">You are not logged in</p>
                <div className="action-buttons">

                    <Link className="header-button btn btM" to="/login" tabIndex="0">
                        LogIn
                    </Link>
                    <Link to={"/"}>
                        <button className="btn btnM">
                            Pokèmon's
                        </button>
                    </Link>
                    <Link className="header-button btn btnM" to="/signup" tabIndex="0">
                        SignUp
                    </Link>

                    <p>To catch some Pokèmon's you need to Login/SignUp and open you loot Boxes</p>
                </div>
            </React.Fragment>
        );
    }

    render() {
        const userId = this.props.userId;

        let content;
        if (!userId) {
            content = this.renderNotLoggedIn();
        } else {
            content = this.renderLoggedIn(userId);
        }

        return (
            <div className={"headerBar"}>
                {content}
            </div>
        );
    }
}

export default withRouter(HeaderBar);
