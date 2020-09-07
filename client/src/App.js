import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import SearchResult from "./component/SearchResult";
import _ from 'lodash';

class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
    location: '',
    keyword: '',
    limit: 5
  };

  getSearchResult = async FormData => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await axios.post("/yelp/search", FormData, config);

      this.setState(() => ({
        isLoaded: true,
        items: _.get(res, ['data', 'data', 'search', 'business'], [])
      }));
    } catch (err) {
      //add the error into the state to show in the page
      this.setState(() => ({ err }));
    }
  };

  searchItem(e) {
    // Prevent button click from submitting form
    e.preventDefault();

    // Get the search critera from the state  
    const { location, keyword, limit } = this.state;

    if (location === "") {
      alert("Please enter a search location");
    } else {
      this.getSearchResult({ location, keyword, limit });
    }
  }
  
  onChange(e) {
    let id = e.target.id;
    let value = e.target.value;
    this.setState(() => ({
      [id]: value
    }));
  }
  
  //controls for the header and filter section
  renderFilterSection() {
    return (
      <div>
        <h1 id="search" className="title">
          Yelp Search
        </h1>
        <section className="section">
          <form align="center" id="searchForm">
            <input type="text" className="input" id="location" name="location" placeholder="location *" onChange={e => this.onChange(e)} />
            <input type="text" className="input" id="keyword" placeholder="keyword" onChange={e => this.onChange(e)} />
            <input type="text" className="input" id="limit" placeholder="limit - default 5" onChange={e => this.onChange(e)} />
            <button className="button" onClick={this.searchItem}>Search</button>
          </form>
        </section>
      </div>
    );
  }

  render() {
    const { error, isLoaded, items } = this.state;

    //this line will make the function searchItem understand this
    this.searchItem = this.searchItem.bind(this);

    //if the api result in error, show the error message
    if (error) {
      return <div>{error.message}</div>;
    } else if (!isLoaded) {
      //on page load, will just show the filter section
      return this.renderFilterSection();
    } else {
      return (
        <div>
          {this.renderFilterSection()}          
          <SearchResult results={items}></SearchResult>
        </div>
      );
    }
  }
}

export default App;
