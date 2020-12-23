import React from 'react';
import { Link } from 'react-router-dom';
import Display from '../display/display';
import logo from '../../assets/images/logo.png';
import addIcon from '../../assets/icons/add-24px.svg';
import './home-page.scss';
import EmployeeService from '../../services/employee-service';

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchExpand: false,
            employeeArray: [],
            AllEmployeeArray: [],
        };
        this.employeeService = new EmployeeService();
    }
    openSearch = () => {
        this.setState({ searchExpand: true});
    }
    componentDidMount(){
        this.getAllEmployee();
    }

    getAllEmployee = () => {
        this.employeeService
            .getAllEmployee()
            .then((data) =>{
                console.log("data after get "+data.data);
                this.setState({
                    employeeArray: data.data,
                    AllEmployeeArray: data.data,
                });
            })
            .catch((err) => {
                console.log("err after ",err);
            });
    };
    
    search = async (event) => {
        let search = event.target.value;
        await this.setState({employeeArray: this.state.AllEmployeeArray});
        let empArray = this.state.employeeArray;
        if(search.trim().length > 0)
            empArray = empArray.filter( (element) => element.name.toLowerCase().indexOf(search.toLowerCase()) > -1
            );
        this.setState({employeeArray: empArray});
    };

    render(){
        return(
            <div className="column content">
                <div className="emp-detail">
                    <div className="detail-text">
                        Employee Details <div className="count"></div>
                    </div>
                <div className="row center button-box">
                    <div className='search-box' onClick={this.openSearch}>
                        <input type="text" name="" id="" className={"input "+(this.state.searchExpand && 'input-expand')}
                         onChange={this.search} placeholder="Search" />
                    </div>
                    <Link to="payroll" className="add-button flex-row-center">
                        <img src={addIcon} alt=""/>Add User
                    </Link>
                </div>
                </div>
                <div className="table-main">
                    <Display employeeArray={this.state.employeeArray} />
                </div>
            </div>
        )
    }
}

export default HomePage;

