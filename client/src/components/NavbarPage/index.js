import React, { Component } from "react";
import "./NavbarPage.css";
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavbarToggler, Collapse, MDBBtn } from "mdbreact";


class NavbarPage extends Component {

  // state = {
  //   isOpen: false
  // };

  // toggleCollapse = this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (

      <Navbar color="red" dark expand="md">
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
              <div className="input-group">
                <form onSubmit={this.props.handleSearch}>
                  <div className="md-form my-0 mb-3 search">
                    <input
                      className="form-control mr-sm-4"
                      type="text"
                      placeholder="Search stock name 'TSLA'"
                      value={this.props.search}
                      onChange={this.props.handleInputChange}
                      name="search"
                    />
                     </div>
                    <MDBBtn type="submit" color="elegant" className="btn-group mr-2 input-group-append searchBtn" href="/search"><span className="searchText">Search</span></MDBBtn>
                </form>
               
                </div>
              </NavItem>
            </NavbarNav>
          </Collapse>
      </Navbar>
    );
  }
}

export default NavbarPage;