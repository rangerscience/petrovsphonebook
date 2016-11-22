import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Nav, NavItem, NavDropdown, MenuItem, Navbar } from 'react-bootstrap'

import AuthService from '../utils/AuthService'

//TODO: NOT the correct way to handle this, exactly

export default class Layout extends React.Component {

  constructor(props) {
    super(props)
    this.state = { loggedIn: false }
  }

  componentDidMount() {
    this.auth = new AuthService('QM4fCvKbYvMDTwnD0zw3DzRzwcITZpBh', 'rangerscience-testing.auth0.com');
    this.setState({ loggedIn: this.auth.loggedIn() })
    // instance of Lock
    this.lock = this.auth.getLock();
    this.lock.on('authenticated', () => {
      this.setState({ loggedIn: this.auth.loggedIn() })
    });
  }

  login() {
    this.auth.login();
  }

  render () {
    const loginButton = this.state.loggedIn ? <div>Logged In</div> : <button onClick={this.login.bind(this)}>Login</button>;

    return (
      <div>
        <Head>
          <title>Petrovs Phonebook</title>

          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          <link rel="stylesheet" type="text/css" href="/static/bootstrap-3.3.7-dist/css/bootstrap.css" />
          <link rel="stylesheet" type="text/css" href="/static/bootstrap-3.3.7-dist/css/bootstrap-theme.css" />
          <link rel="stylesheet" type="text/css" href="/static/bootstrap-3.3.7-dist/js/bootstrap.js" />

        </Head>

        <Navbar inverse collapseOnSelect>
          <Navbar.Header>

            <Navbar.Brand>
              <a href="/">Petrovs Phonebook</a>
            </Navbar.Brand>

            <Navbar.Toggle />

            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1}>
                  <Link href="/list">
                    Protests
                  </Link>
                </NavItem>
                //<NavItem eventKey={1}><Link href="/submit">Submit</Link></NavItem>
                //<NavItem eventKey={1}><Link href="/about">About</Link></NavItem>
                /*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Action</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>*/
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={2} href="#">
                    <script src="https://cdn.auth0.com/js/lock/10.5/lock.min.js"></script>
                    { loginButton }
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar.Header>
        </Navbar>

      </div>
    )
  }
}