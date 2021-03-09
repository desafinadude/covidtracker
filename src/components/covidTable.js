import React from 'react'
import NumberFormat from 'react-number-format';
import { Card, Modal, Button } from 'semantic-ui-react'
import { FlexboxGrid } from 'rsuite'; 
import DataTable from 'react-data-table-component';
import EyeIcon from 'mdi-react/EyeIcon'
import CountryData from './countryData'


class CovidTable extends React.Component {

    componentDidMount() {
    }

    componentWillReceiveProps(newProp) {


    }

    

 
    render() {

        let tableData = []

        this.props.statistics.forEach((country) => {
            if(country.country !== 'All' && country.deaths.total !== null && (country.country !== country.continent) && country.continent !== null) {

                // if(country.country === 'USA') { country.country = 'United States'}
                // if(country.country === 'S-Korea') { country.country = 'South Korea'}
                // if(country.country === 'Eswatini') { country.country = 'Lesotho'}
                // if(country.country === 'R&eacute;union') { country.country = 'Reunion'}
                // if(country.country === 'Faeroe-Islands') { country.country = 'Faroe-Islands'}

                tableData.push({
                    country: country.country,
                    continent: country.continent,
                    tests: country.tests.total,
                    confirmed: country.cases.total,
                    recovered: country.cases.recovered,
                    critical: country.cases.critical,
                    deaths: country.deaths.total,
                    countryData: country
                })
            }

        })        

        const columns = [
            {
                name: 'COUNTRY',
                selector: 'country',
                sortable: true,
                cell: row => <><strong style={{fontSize: '1.2em'}}>{row.country}</strong></>,
            },
            {
                name: 'CONTINENT',
                selector: 'continent',
                sortable: true
            },
            {
                name: 'TESTS',
                selector: 'tests',
                sortable: true,
                cell: row => <NumberFormat value={row.tests} displayType={'text'} thousandSeparator={true} />

            },
            {
                name: 'CONFIRMED',
                selector: 'confirmed',
                sortable: true,
                cell: row => <NumberFormat value={row.confirmed} displayType={'text'} thousandSeparator={true} />

            },
            {
                name: 'RECOVERED',
                selector: 'recovered',
                sortable: true,
                cell: row => <NumberFormat value={row.recovered} displayType={'text'} thousandSeparator={true} />
            },
            {
                name: 'CRITICAL',
                selector: 'critical',
                sortable: true,
                cell: row => <NumberFormat value={row.critical} displayType={'text'} thousandSeparator={true} />
            },
            {
                name: 'DEATHS',
                selector: 'deaths',
                sortable: true,
                cell: row => <NumberFormat value={row.deaths} displayType={'text'} thousandSeparator={true} />
            },
            {
                name: '',
                selector: '',
                sortable: true,
                cell: row => <Modal size='large' trigger={<Button size="mini"><EyeIcon size={16}/></Button>}>
                        <Modal.Header>{row.country}</Modal.Header>
                        <Modal.Content>
                            <CountryData statistics={this.props.statistics} selectedCountry={row.country}/>
                        </Modal.Content>
                    </Modal>
            },
            








        ];

        return (
            <>  
                <FlexboxGrid style={{width: '100%'}}>
                    <FlexboxGrid.Item colspan={24} style={{padding: '0 1em'}}>
                        <Card fluid>
                            <Card.Content>
                                <DataTable
                                    title="World"
                                    columns={columns}
                                    data={tableData}
                                    defaultSortField="deaths"
                                    defaultSortAsc={false}
                                />
                            </Card.Content>
                        </Card>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </>
        )
    }


};

export default CovidTable

