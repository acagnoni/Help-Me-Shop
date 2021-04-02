import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { helpMeShopContext } from '../components/context'

class Header extends React.Component {

    static contextType = helpMeShopContext

    constructor(props) {
        super(props)
    }


    render() {

        return (

            <header id="header" className="alt">
                <Link to="/" className="logo"><strong>Help Me Shop</strong> <span>by San Rocco</span></Link>
                <nav>
                    <a className="menu-link" onClick={this.props.onToggleMenu} href="javascript:;">Menu</a>
                </nav>
            </header>
        )


    }
}

Header.propTypes = {
    onToggleMenu: PropTypes.func,
    onHandleLogout: PropTypes.func,
    onCheckLogged: PropTypes.func
}

export default Header
