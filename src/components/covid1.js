import React from 'react'
import NumberFormat from 'react-number-format';
import { Card, Header } from 'semantic-ui-react'
import { FlexboxGrid, Avatar } from 'rsuite'; 
import TestTubeIcon from 'mdi-react/TestTubeIcon';
import GraveStoneIcon from 'mdi-react/GraveStoneIcon';
import ThumbUpIcon from 'mdi-react/ThumbUpIcon'
import HospitalIcon from 'mdi-react/HospitalIcon'
import _ from 'lodash'


class Covid1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countryData: undefined
        }
    }



    componentDidMount() {

    }


    componentWillReceiveProps(newProp) {

        this.setState({ countryData : _.find(newProp.statistics, function(o) { return o.country === newProp.selectedCountry }) });

    }

    render() {
        return (
            <>
            {/* <Grid.Column>
                <strong>LAST CHANGE: </strong>{this.state.countryData ? this.state.countryData[0].lastChange : ''}
                <strong>LAST UPDATE: </strong>{this.state.countryData ? this.state.countryData[0].lastUpdate : ''}
            </Grid.Column> */}
            {this.state.countryData !== undefined ? (
                <FlexboxGrid style={{width: '100%'}}>
                    <FlexboxGrid.Item colspan={6} style={{padding: '0 1em'}}>
                        <Card fluid>
                            <Card.Content>
                                <Header as='h2'>
                                    <Avatar circle size="lg" style={{backgroundColor: '#7cb7c5', marginRight: '0.5em'}}><TestTubeIcon color="#fff" size={32} style={{marginTop: '0.2em'}}/></Avatar>
                                    <Header.Content>
                                        <NumberFormat value={this.state.countryData.cases.total} displayType={'text'} thousandSeparator={true} />
                                        <Header.Subheader>Confirmed</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Card.Content>
                        </Card>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={6} style={{padding: '0 1em'}}>
                        <Card fluid>
                            <Card.Content>
                                <Header as='h2'>
                                    <Avatar circle size="lg" style={{backgroundColor: '#79d2b0', marginRight: '0.5em'}}><ThumbUpIcon color="#fff" size={32} style={{marginTop: '0.2em'}}/></Avatar>
                                    <Header.Content>
                                        <NumberFormat value={this.state.countryData.cases.recovered} displayType={'text'} thousandSeparator={true} />
                                        <Header.Subheader>Recovered</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Card.Content>
                        </Card>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={6} style={{padding: '0 1em'}}>
                        <Card fluid>
                            <Card.Content>
                                <Header as='h2'>
                                    <Avatar circle size="lg" style={{backgroundColor: '#f79480', marginRight: '0.5em'}}><HospitalIcon color="#fff" size={32} style={{marginTop: '0.2em'}}/></Avatar>
                                    <Header.Content>
                                        <NumberFormat value={this.state.countryData.cases.critical} displayType={'text'} thousandSeparator={true} />
                                        <Header.Subheader>Critical</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Card.Content>
                        </Card>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={6} style={{padding: '0 1em'}}>
                        <Card fluid>
                            <Card.Content>
                                <Header as='h2'>
                                    <Avatar circle size="lg" style={{backgroundColor: '#444', marginRight: '0.5em'}}><GraveStoneIcon color="#fff" size={32} style={{marginTop: '0.2em'}}/></Avatar>
                                    <Header.Content>
                                        <NumberFormat value={this.state.countryData.deaths.total} displayType={'text'} thousandSeparator={true} />
                                        <Header.Subheader>Deaths</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Card.Content>
                        </Card>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            ) : ''}
            </>
        )
    }


};

export default Covid1