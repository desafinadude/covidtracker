import React from 'react'
// import NumberFormat from 'react-number-format';
import { FlexboxGrid } from 'rsuite'; 
import { Line } from 'react-chartjs-2'
// import _ from 'lodash'
import Covid1 from "./covid1"


class CountryData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [],
                xAxes: [{
                    type: 'time',
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20
                    }
                }],
            },
            selectedCountry: undefined,
            countryData: [],
            statistics: []
        }
    }

    componentDidMount() {
        this.setState({ selectedCountry : this.props.selectedCountry });
        this.setState({ statistics : this.props.statistics });

        fetch("https://covid-193.p.rapidapi.com/history?country=" + encodeURI(this.props.selectedCountry), {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "b4fd3bfb15msh73e8b47c43ac8edp14789fjsn2c9fa87761ea",
                "x-rapidapi-host": "covid-193.p.rapidapi.com"
            }
        })
        .then(res => res.json())
        .then((data) => {

            this.setState({ countryData: data.response });

            let chartData = {
                labels: [],
                datasets: []
            }

            this.setState({ chartData: chartData });

            let labels = [];

            let categories = ['active'];

            for (let index = 0; index < categories.length; index++) {

                let dataset = {
                    label: '',
                    backgroundColor: 'transparent',
                    borderColor: '#a989df',
                    borderWidth: 1,
                    spanGaps: true,
                    pointRadius: 1,
                    
                    data: []
                }

                this.state.countryData.forEach((dayData) => {
                    labels.push(dayData.day);

                    dataset.label = categories[index];

                    if(categories[index] === 'active') {
                        dataset.data.push(dayData.cases.active);
                    }
                    else if(categories[index] === 'deaths') {
                        dataset.data.push(dayData.deaths.total);
                    }
                    
                })

                labels.reverse();
                dataset.data.reverse();

                this.setState(state => (state.chartData.labels = labels, state));
                this.setState(state => (state.chartData.datasets = [...this.state.chartData.datasets, dataset], state));

    
            }

        })
        .catch(console.log)

    }



   


    render() {
        return (
            <>
                <Covid1 statistics={this.state.statistics} selectedCountry={this.state.selectedCountry} />

                <FlexboxGrid style={{width: '100%'}}>
                    <FlexboxGrid.Item colspan={24} style={{padding: '1em'}}>
                        <Line
                        data={this.state.chartData}
                        options={{
                            title:{
                                display:false,
                            },
                            legend:{
                                display:false,
                            }             
                        }}
                        />
                    </FlexboxGrid.Item>
                </FlexboxGrid>

            </>
        )
    }

    
    

};

export default CountryData