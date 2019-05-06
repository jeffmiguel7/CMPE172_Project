//import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Header, Icon, Menu, Table, Segment, Grid, Container, Divider, Tab } from 'semantic-ui-react';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Tabs from 'react-bootstrap/Tabs';
import config from './.samples.config';


class Salaries extends Component {

  state = {

    salaryColumns: [{
      dataField: 'emp_no',
      text: 'Employee ID'
    },
    {
      dataField: 'salary',
      text: 'Salary'
    },
    {
      dataField: 'from_date',
      text: 'From'
    },  
    {
      dataField: 'to_date',
      text: 'To'
    }],

    empsearch: [], //new
    emps: [],
    emp: {
      name: ''
    },

    storesalaries: [],
    storeemployees: [],
    salary: {
      emp_no: '',
      frome_date: ''
    },
    employee: {
      emp_no: ''
      
    }
  }
  componentDidMount(){
    this.getEmployees();//new
    console.log(this.state.emps);

    this.searchSalaries();
    console.log(this.state.storesalaries);
    this.searchUser();
    this.state = {
      show: false
    }
  }

  /**new */
  getEmployees = () => {
    fetch('http://localhost:4000/employees')
      .then(response => response.json())
      .then(response => this.setState({ emps: response.data} ))
      .catch(err => console.error(err))

  }
  
  showButton() {
    this.setState({
      show: true
    });
  }

  searchSalaries = () => {
    const{salary} = this.state;
    fetch(`http://localhost:4000/salaries/search?emp_no=${salary.emp_no}`)
      .then(response => response.json())
      .then(response => this.setState({ storesalaries: response.data} ))
      .catch(err => console.error(err))
  }

  deleteSalaries = () => {
    const{salary} = this.state;
    fetch(`http://localhost:4000/salaries/delete?emp_no=${salary.emp_no}&from_date=${salary.from_date}`)
      .then(response => response.json)
      .then(this.deletesalary)
      .then(this.searchSalaries)
      .catch(err => console.error(err))
  }

  addSalaries = () => {
    const{salary} = this.state;
    fetch(`http://localhost:4000/salaries/add?emp_no=${salary.emp_no}&salary=${salary.salary}`)
      .then(response => response.json)
      .then(this.addsalary)
      .then(this.searchSalaries)
      .catch(err => console.error(err))
  }

  searchUser = () => {
    const{salary} = this.state;
    fetch(`http://localhost:4000/employees/search?emp_no=${salary.emp_no}`)
      .then(response => response.json())
      .then(response => this.setState({ storeemployees: response.data} ))
      .catch(err => console.error(err))
  }
  
  renderEmployeeTitles = ({emp_no, birth_date, first_name, last_name, gender, hire_date}) => (
    <div key={1}>
      {emp_no} {birth_date}>{first_name}>{last_name}>{gender}>{hire_date}
    </div>
    
  )
  
  renderEmployee = ({emp_no, birth_date, first_name, last_name, gender, hire_date}) => (
    
    <table class="ui large inverted blue table">
      <thead>
        <tr>
          <th class="single line">Employee ID</th>
          <th class="single line">First Name</th>
          <th class="single line">Last Name</th>
          <th class="single line">Birth Date</th>
          <th class="single line">Gender</th>
          <th class="single line">Date Hired</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{emp_no}</td>
          <td>{first_name}</td>
          <td>{last_name}</td>
          <td>{birth_date}</td>
          <td>{gender}</td>
          <td>{hire_date}</td>
        </tr>
      </tbody>
    </table>
  )

  clickFunctions = () => {
    this.searchSalaries();  
    this.searchUser();
    this.showButton();
  }
  
  render() {

    const { storesalaries, salary} = this.state;
    const { storeemployees, employee} = this.state;
    const { deletesalary} = this.state;

    const { empsearch, emps, emp} = this.state;
    const employees=[];


    emps.map(employee=>{
      const obj = {
        emp_no: employee.emp_no,
        birthday:employee.birth_date,
        firstname:employee.first_name,
        lastname:employee.last_name,
        gender:employee.gender,
        hireDate:employee.hire_date

      };
      employees.push(obj);
    });


    const employeeColumns=[{
      dataField: 'emp_no',
      text:'Employee ID',
      filter:textFilter()
      },
      {
        dataField:'birthday',
        text:'Birth Date',
        filter:textFilter()
      },
      {
        dataField:'firstname',
        text:'First Name'
      },
      {
        dataField:'lastname',
        text:'Last Name'
      },
      {
        dataField:'gender',
        text:'Gender'
      },
      {
        dataField:'hireDate',
        text:'Date Hired'
      }
    ];

    const customTotal=(from,to, size)=>(
      <span className="pagination">
        <div>
          <Container><Header as='h5'>Showing {to} of {size} Results</Header></Container>
        </div>
      </span>
    );
    const pageListRenderer = ({
      pages,
      onPageChange
    }) => { 
      // just exclude <, <<, >>, >
      const pageWithoutIndication = pages.filter(p => typeof p.page !== 'string');
      return (
        <div>
          {
            pageWithoutIndication.map(p => (
              <button className="btn btn-success" onClick={ () => onPageChange(p.page) }>{ p.page }</button>
            ))
          }
        </div>
      );
    };

    const options={
      page:1,
      paginationSize:4,
      pageStartIndex:1,
      totalSize:80000,
      sizePerPageList:[{text:'10',value:10}],
      showTotal:true,
      firstPageText:'First',
      prePageText:'Prev',
      nextPageText:'Next',
      lastPageText:'Last',
      nextPageTitle:'First Page',
      prepPageTitle:'Pre page',
      firstPageTitle:'Next page',
      lastPageTitle:'Last Page',
      paginationTotalRenderer:customTotal,
      //pageListRenderer


      //onPageChange: (page, sizePerPage) => {}, // callback function when page was changing
      //onSizePerPageChange: (sizePerPage, page) => {}, // callback function when page size was changi

    };

    
    const panes = [
 
      {
        menuItem: 'Employees',
        pane: {
          key: 'tab1',
          content: (
            <Container>
              <div>
                <h1 class="ui blue header">Search the Employees Database</h1>
              </div>

              <div class="ui divider"></div>

              
                <BootstrapTable bootstrap4 bordered={false} keyField='emp_no' data={employees} columns={employeeColumns} pagination={paginationFactory(options)} filter={filterFactory()}/>
              
            </Container>
          ),
        },
      },
      {
        menuItem: 'Salaries',
        pane: {
          key: 'tab2',
          content: (
            <Container>
              <div>
                <h1 class="ui blue header">Search the Salaries Database</h1>
              </div>
              
              <div class="ui divider"></div>

              
              <div class="ui action input">
                <input placeholder="Employee ID" value = { salary.emp_no } onChange = {e => this.setState({salary: { ...salary, emp_no: e.target.value}}) }/>
                <Container><button class="ui green button" onClick= {this.clickFunctions}>Search</button></Container>
              </div>

              {storeemployees.map(this.renderEmployee)}
              <BootstrapTable bootstrap4 bordered={false} keyField='id' data={ this.state.storesalaries } columns={ this.state.salaryColumns } />

              { this.state.show && 
                                    <Grid columns={3} padded >
                                    <Grid.Column>
                                    <div class="ui action input"> 
                                      <input placeholder="Salary Value" value = {salary.salary} onChange = {e => this.setState({salary: { ...salary, salary: e.target.value}}) } />
                                      <button class="ui teal button" onClick= {this.addSalaries}>Add Salary</button> 
                                    </div>
                                    </Grid.Column>
                                    <Grid.Column>
                                    <div class="ui action input"> 
                                      <input placeholder="0000-00-00" value = {salary.from_date} onChange = {e => this.setState({salary: { ...salary, from_date: e.target.value}}) }/>
                                      <button class="ui red button" onClick= {this.deleteSalaries}>Delete Salary</button> 
                                    </div>
                                    </Grid.Column>
                                    </Grid>
                                 
              }
            </Container>
          ),
        },
      },
    ]
    
    return (  

        <Grid>
         <Tab panes={panes} renderActiveOnly={false} />
        </Grid>
    );  
  }
}

export default Salaries;