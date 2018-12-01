import React, { Component } from "react";
import "./NavbarPage.css";
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavbarToggler, Collapse, FormInline, Dropdown, DropdownToggle, DropdownMenu,  DropdownItem, Fa } from "mdbreact";

class NavbarPage extends Component {
  // state = {
  //   isOpen: false
  // };

  // toggleCollapse = this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (

      <Navbar color="indigo" dark expand="md">
          <NavbarBrand>
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
                <FormInline waves>
                  <div className="md-form my-0">
                    <input
                      className="form-control mr-sm-4"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                    />
                  </div>
                </FormInline>
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