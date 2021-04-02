import React from 'react'
import ReactModal from 'react-modal'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import BannerLanding from '../components/BannerLanding'

import pic08 from '../assets/images/pic08.jpg'
import pic09 from '../assets/images/pic09.jpg'
import pic10 from '../assets/images/pic10.jpg'

import Container from '../components/container'

import { helpMeShopContext } from '../components/context'

import { Auth } from 'aws-amplify';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class Register extends React.Component {


    state = {
        fullname: "",
        email: "",
        password: "",
        confirmationCode: "",
        isConfirmOpen: false
    }

    static contextType = helpMeShopContext

    handleSubmit = async event => {
        event.preventDefault()
        console.log(this.state)
        try {
            const { user } = await Auth.signUp(
                this.state.email,
                this.state.password);
            console.log('Signed in', user)
            this.setState({ isConfirmOpen: true})
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    handleConfirmCode = async event => {
        event.preventDefault()
        console.log(this.state)
        try {
            const { user } = await Auth.confirmSignUp(
                this.state.email,
                this.state.confirmationCode);
            console.log('Signed in', user)
            this.setState({ isConfirmOpen: true})
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    handleInput = event => {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({ [name]: value })
    }


    render() {
        return (
            <Layout>
                <Helmet
                    title="Register - SignUp"
                    meta={[
                        { name: 'description', content: 'SignUp' },
                        { name: 'keywords', content: 'SignUp' },
                    ]}
                >
                </Helmet>

                <Container>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Full Name
                        <input type="text" name="fullname" value={this.state.fullname} onChange={this.handleInput} />
                        </label>
                        <label>
                            E-Mail
                        <input type="text" name="email" value={this.state.email} onChange={this.handleInput} />
                        </label>
                        <label>
                            Password
                        <input type="password" name="password" value={this.state.password} onChange={this.handleInput} />
                        </label>
                        <center>
                            <button type="submit">Sign Up</button>
                    &nbsp;&nbsp;&nbsp;

                    </center>
                    </form>
                    <center>
                        <Link to="/Layout">Login</Link>
                    </center>
                </Container>
                <ReactModal
                    isOpen={this.state.isConfirmOpen}
                    onRequestClose={this.handleConfirmCode}
                    contentLabel="Confirmation Code"
                    style={customStyles}
                >
                    <h2>Donate</h2>
                    <input type="password" name="confirmationCode" value={this.state.confirmationCode} onChange={this.handleInput} />
                    <button onClick={this.handleConfirmCode}>Confirm</button>
                </ReactModal>

            </Layout>
        )
    }
}

export default Register