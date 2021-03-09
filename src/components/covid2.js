import React from 'react'
import NumberFormat from 'react-number-format';
import { Grid, Card } from 'semantic-ui-react'
import { Select } from 'antd';
import { Line } from 'react-chartjs-2'

const { Option } = Select;

class Covid2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [
                    {
                        // label: '',
                        // backgroundColor: 'rgba(75,192,192,1)',
                        // borderColor: 'rgba(0,0,0,1)',
                        // borderWidth: 2,
                        data: []
                    }
                ]
            },
        }
    }

    componentDidMount() {

        

    }

   


    render() {
        return (
            <>
            <Grid.Row columns='equal'>
                <Grid.Column width={12}>
                    <Card fluid>
                        <Card.Content>
                            
                                <Line
                                data={this.state.chartData}
                                options={{
                                    title:{
                                        display:false,
                                    },
                                    legend:{
                                        display:false,
                                    },
                                    backgroundColor: 'rgba(75,192,192,1)',
                                    borderColor: 'rgba(75,192,192,1)',
                                    xAxes: [{
                                        type: 'time',
                                        ticks: {
                                            autoSkip: true,
                                            maxTicksLimit: 20
                                        }
                                    }]
                                }}
                                />
                            
                        </Card.Content>
                        
                    </Card>
                </Grid.Column>
            </Grid.Row>

            </>
        )
    }

    
    changeCountry = (value) => {

        console.log(value)

        fetch("https://covid-193.p.rapidapi.com/history?country=" + value, {
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

};

export default Covid2