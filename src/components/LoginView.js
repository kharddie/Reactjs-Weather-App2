import React from "react";

class LoginView extends React.Component {
    render() {
        return (
            <div class="col-12 hideDiv" >

                <div class="register">
                    <h4>Register </h4>
                    <form onSubmit={this.props.registerUser}>
                        <input type="text" name="userName" placeholder="UserName..." />
                        <input type="password" name="password" placeholder="Password..." />
                        <input type="password" name="RetypePassword" placeholder="RetypePassword..." />
                        <button type='submit'>Register</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default LoginView;