import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import auth0Client from '../Auth'

require('dotenv')

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut()
    props.history.replace('/')
  }
	return (
		<nav className="navbar navbar-dark bg-primary fixed-top">
			<Link className="navbar-brand" to="/">
				Dave's Q &amp; A App
			</Link>
		</nav>
	);
}

export default NavBar;