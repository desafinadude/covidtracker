import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import 'antd/dist/antd.css';
import '../node_modules/rsuite/dist/styles/rsuite-default.css';
import './index.css';
import { Header, Menu, Segment, Sidebar, Container } from 'semantic-ui-react'
import * as countriesJSON from './assets/CountryCodes.json'

import VirusOutlineIcon from 'mdi-react/VirusOutlineIcon';
import MenuIcon from 'mdi-react/MenuIcon';

import Covid1 from "./components/covid1"
import CovidTable from "./components/covidTable"


class CovidTracker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          countries: [],
          countriesHelper: [],
          selectedCountry: 'All',
          countryData: [],
          statistics: []
        }
    }

    componentDidMount() {

      // STATISTICS
      fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "b4fd3bfb15msh73e8b47c43ac8edp14789fjsn2c9fa87761ea",
            "x-rapidapi-host": "covid-193.p.rapidapi.com"
        }
      })
      .then(res => res.json())
      .then((data) => {
        this.setState({statistics: data.response});
      })
      .catch(console.log)

      // COUNTRIES HELPER
      this.setState({ countriesHelper: countriesJSON.default });     

    }    

    render() {

      return (
        <Router>

          <Sidebar
            as={Segment}
            animation='push'
            direction='left'
            visible={false}
          >
          </Sidebar>

          <Menu fixed='top'>
            <Menu.Item>
              <MenuIcon color="#000" size={24}/>
            </Menu.Item>
            <Menu.Item>
              <Header as='h3' style={{padding:0,margin:0}}>
                <VirusOutlineIcon color="#fc5808" size={24} style={{marginRight: '0.5em', position: 'relative', top: '0.2em'}}/>  
                <Link to="/" style={{color: '#000'}}>COVIDTRACKER</Link>
              </Header>
            </Menu.Item>
          </Menu>

          <div style={{margin: '5em 0 2em'}}><Covid1 statistics={this.state.statistics} selectedCountry={this.state.selectedCountry}/></div>
          <CovidTable statistics={this.state.statistics} />

          <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '0.5em' }}>
            <Container textAlign='center'>
              COVIDTRACKER
            </Container>
          </Segment>

        </Router>
      );
    }

}

// ========================================


ReactDOM.render(
  <CovidTracker />,
  document.getElementById('root')
);
