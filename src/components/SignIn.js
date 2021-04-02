import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Banner from '../components/container'

import { Auth } from 'aws-amplify';

import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignIn, SignUp, VerifyContact, withAuthenticator } from 'aws-amplify-react';
import Container from '../components/container'

import { helpMeShopContext } from '../components/context'

class MySignIn extends SignIn  {

    state={
        userName: "",
        password: ""
    }

    static contextType = helpMeShopContext
    

    
    handleSubmit = async event => {
        event.preventDefault()
        try {
            const user = await Auth.signIn(this.state.userName, this.state.password);
            console.log('Signed in', user)
            this.context.userName = this.state.userName;
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    handleInput = event => {
        const target = event.target
        const value = target.value
        const name = target.name
        
        this.setState({[name]: value})
    }

    render() {
        console.log(this.context.isLogged)
        this.context.isLogged = true;
        return (
            <Layout>
                <Helmet
                    title="Login - SignIn"
                    meta={[
                        { name: 'description', content: 'SignIn' },
                        { name: 'keywords', content: 'SignIn' },
                    ]}
                >
                </Helmet>
                
                <Container>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        User Name
                        <input type="text" name="userName" value={this.state.userName} onChange={this.handleInput}/>
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" value={this.state.password} onChange={this.handleInput}/>
                    </label>
                    <center>
                    <button type="submit">Sign in</button>
                    &nbsp;&nbsp;&nbsp;
                    
                    </center>
                </form>
                <center>
                <Link to="/register">Register</Link>
                </center>
                </Container>

            </Layout>
        )
    }
}

export default MySignIn;