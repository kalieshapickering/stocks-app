import React, { Component } from "react";
import "./NavbarPage.css";
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem, Fa, MDBBtn } from "mdbreact";


class NavbarPage extends Component {

  // state = {
  //   isOpen: false
  // };

  // toggleCollapse = this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (

      <Navbar color="indigo" dark expand="md">
          <NavbarBrand href="/">
            <strong className="white-text">Stock Predictor</strong>
          </NavbarBrand>
          <NavbarToggler
            // onClick={this.toggleCollapse}
          />
          <Collapse
            id="navbarCollapse3"
            // isOpen={this.state.isOpen}
            navbar
          >
        
            <NavbarNav right>
              <NavItem>
                <form onSubmit={this.props.handleSearch}>
                  <div className="md-form my-0">
                    <input
                      className="form-control mr-sm-4"
                      type="text"
                      placeholder="Search"
                      value={this.props.search}
                      onChange={this.props.handleInputChange}
                      name="search"
                    />
                    <MDBBtn type="submit">Search</MDBBtn>
                  </div>
                </form>
              </NavItem>
            </NavbarNav>
            <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret>
                    <Fa icon="user" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-default" right>
                    <DropdownItem href="/login">Login</DropdownItem>
                    <DropdownItem href="/register">Register</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
          </Collapse>
      </Navbar>
    );
  }
}

export default NavbarPage;