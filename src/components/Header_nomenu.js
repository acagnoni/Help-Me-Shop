import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { helpMeShopContext } from '../components/context'

class Header_nomenu extends React.Component {

    static contextType = helpMeShopContext

    constructor(props) {
        super(props)
        this.state = {
            isMenuShown: true
        }
    }


    render() {

        return (

            <header id="header" className="alt">
                <Link to="/" className="logo"><strong>Help Me Shop</strong> <span>by San Rocco</span></Link>
            </header>
        )


    }
}

Header_nomenu.propTypes = {
    onToggleMenu: PropTypes.func,
    onHandleLogout: PropTypes.func,
    onCheckLogged: PropTypes.func
}

export default Header_nomenu
