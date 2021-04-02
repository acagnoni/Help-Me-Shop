import React from 'react'
import PropTypes from 'prop-types'

import '../assets/scss/main.scss'
import Header from './Header'
import Header_nomenu from './Header_nomenu'
import Menu from './Menu'
import Contact from './Contact'
import Footer from './Footer'

import { helpMeShopContext } from '../components/context'

import { Auth } from 'aws-amplify';

class Layout extends React.Component {

    static contextType = helpMeShopContext

    constructor(props) {
        super(props)
        this.state = {
            isMenuShow: false,
            isMenuVisible: false,
            isContactVisible: false,
            loading: 'is-loading'
        }
        this.handleToggleMenu = this.handleToggleMenu.bind(this)
        this.checkLogged = this.checkLogged.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    componentDidMount() {
        this.timeoutId = setTimeout(() => {
            this.setState({ loading: '' });
        }, 100);

        this.checkLogged()
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    handleToggleMenu = event => {
        console.log('isMenuVisible: ', this.state.isMenuVisible)
        this.setState({
            isMenuVisible: !this.state.isMenuVisible
        })

    }
    
    checkLogged = async event => {
        try {
            console.debug("Checking")
            let user = await Auth.currentAuthenticatedUser()
            this.setState({
                isMenuShow: true
            })
        }catch(error) {
            console.log('error signing out', error);
            this.setState({
                isMenuShow: false
            })

        }
    }

    handleLogout = async event => {
        try {
            await Auth.signOut();
            this.setState({
                isMenuShow: this.checkLogged()
            })
        } catch (error) {
            console.log('error signing out', error);
        }
    }


    render() {
        const { children } = this.props
        console.log(this.state)

        return (

            <div className={`body ${this.state.loading} ${this.state.isMenuVisible ? 'is-menu-visible' : ''}`}>
                <div id="wrapper">
                    {this.state.isMenuShow ? 
                        <Header 
                            onToggleMenu={this.handleToggleMenu}
                            onCheckLogged={this.checkLogged} 
                            /> :
                        <Header_nomenu
                            onToggleMenu={this.handleToggleMenu}
                            onCheckLogged={this.checkLogged} 
                            />}
                    {children}
                    <Contact />
                    <Footer />
                </div>
                <Menu 
                    onToggleMenu={this.handleToggleMenu} 
                    onHandleLogout={this.handleLogout}/>
            </div>
        )
    }
}

export default Layout
