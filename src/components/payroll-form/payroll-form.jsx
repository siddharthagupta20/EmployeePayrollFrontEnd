import React,{useState, useEffect, Component} from "react";
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import logo from '../../assets/images/logo.png';
import '../payroll-form/payroll-form.scss';
import {useParams, Link, withRouter } from 'react-router-dom';
import EmployeeService from '../../services/employee-service';

const PayrollForm = (props) => {
    let initialValue = {
        name: '',
        profileArray:[
            {url: '../../../assets/profile-images/Ellipse -3.png'},
            {url: '../../../assets/profile-images/Ellipse 1.png'},
            {url: '../../../assets/profile-images/Ellipse -8.png'},
            {url: '../../../assets/profile-images/Ellipse -7.png'},
        ],
        allDepartment:[
            'HR','Sales','Finance','Engineer','Others'
        ],
        departmentValue: [],
        gender:'',
        salary: '',
        day:'1',
        month: 'Jan',
        year: '2020',
        startDate: '',
        notes: '',
        id: '',
        profileUrl:'',
        isUpdate: false,
        error: {
            department :'',
            name:'',
            gender:'',
            salary:'',
            profileUrl:'',
            startDate:''
        }
    }
    const [formValue, setForm] = useState(initialValue);

    const params = useParams();
    
    useEffect(() => {
        console.log(params);
        if(params.id){
            getDataById(params.id);
        }
    }, []);

    const getDataById = (id) =>{
        employeeService.getEmployee(id)
        .then((data) =>{
            console.log("data is "+ data.data);
            let obj = data.data;
            setData(obj);
        })
        .catch( (err) => {
            console.log("err is "+ err);
        });
    };

    const setData = (obj) => {
        let array = obj.startDate.split(" ");
        setForm({
            ...formValue,
            ...obj,
            departmentValue: obj.departments,
            isUpdate : true,
            name: obj.name,
            salary: obj.salary,
            profileUrl : obj.profilePic,
            day: array[0],
            month: array[1],
            year: array[2],
            gender: obj.gender,
            notes: obj.note,
        });
    };

    const changeValue = (event) => {
        setForm({...formValue, [event.target.name]: event.target.value})
    }

    const onCheckChange = (name) => {
        let index = formValue.departmentValue.indexOf(name);
        let checkArray = [...formValue.departmentValue]
        if(index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({...formValue, departmentValue: checkArray});
    }

    const getChecked = (name) => {
        return formValue.departmentValue && formValue.departmentValue.includes(name);
    }

    const validData = async () => {
        let isError = false;
        let error = {
            department: '',
            name : '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate : ''
        }
        if(formValue.name.length < 1){
            error.name = 'name is required field'
            isError = true;
        }
        if(formValue.gender.length < 1){
            error.gender = 'gender is required field'
            isError = true;
        }
        if(formValue.salary.length <1 ){
            error.salary = 'salary is required field'
            isError = true;
        }
        if(formValue.profileUrl.length <1){
            error.profileUrl = 'profile is required field'
            isError = true;
        }
        if(formValue.departmentValue.length <1){
            error.department = 'department is required field'
            isError = true;
        }
        if(formValue.notes.length<1){
            error.notes = 'notes is required field'
            isError = true;
        }
        await setForm({...formValue, error: error});
        return isError;

    }

     let employeeService = new EmployeeService();
    const save = async (event) => {
        event.preventDefault();

        if(await validData()){
            console.log("error",formValue);
            return;
        }else{
        let object  = {
            name: formValue.name,
            departments: formValue.departmentValue,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
            note : formValue.notes,
            profilePic : formValue.profileUrl,
        };

        if(formValue.isUpdate){
            employeeService.updateEmployee(object)
            .then( (data) => {
                alert("Data updated successfully!")
                props.history.push("/home");
            })
            .catch( (error) => {
                console.log("Error after update"+error);
            })
        } else{
        employeeService.addEmployee(object).then(data => {
            console.log("data added successfully");
            props.history.push("/home");
        }).catch(err => {
            console.log("error after Add data");
        });
    }
    }
    }

    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate});
        console.log(formValue);
    }
    return(
            <div className="payroll-main">
                <header className="header row center">
                    <div className="logo">
                        <img src={logo} alt=""/>
                        <div>
                            <span className="emp-text">EMPLOYEE</span>
                            <span className="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header>
                <div className="content">
                    <form className="form" action="#" onSubmit={save}>
                        <div className="form-head">Employee Payroll form</div>
                        <div className="row">
                            <label htmlFor="name" className="label text">Name</label>
                            <input className="input" type="text" id="name" name="name" value={formValue.name} onChange={changeValue} placeholder="Your name.." />
                        </div>
                        <div className="error">{formValue.error.name}</div>
                        <div className="row">
                            <label htmlFor="profileUrl" className="label text">Profile image</label>
                            <div className="profile-radio-button">
                                <label>
                                    <input type="radio" name="profileUrl" checked={formValue.profileUrl=='../../assets/profile-images/Ellipse -3.png'} 
                                    value="../../assets/profile-images/Ellipse -3.png" onChange={changeValue} />
                                    <img className="profile" src={profile1} alt="" />
                                </label>
                                <label>
                                    <input type="radio" name="profileUrl" checked={formValue.profileUrl=='../../assets/profile-images/Ellipse 1.png'}  
                                    value="../../assets/profile-images/Ellipse 1.png" onChange={changeValue} />
                                    <img className="profile" src={profile2} alt=""/>
                                </label>
                                <label>
                                    <input type="radio" name="profileUrl" checked={formValue.profileUrl=='../../assets/profile-images/Ellipse -8.png'}
                                    value="../../assets/profile-images/Ellipse -8.png" onChange={changeValue}/>
                                    <img className="profile"  src={profile3} alt=""/>
                                </label>
                                <label>
                                    <input type="radio" name="profileUrl" checked={formValue.profileUrl=='../../assets/profile-images/Ellipse -7.png'}
                                    value="../../assets/profile-images/Ellipse -7.png" onChange={changeValue}/>
                                    <img className="profile" src={profile4} alt="" />
                                </label>
                            </div>
                        </div>
                        <div className="error">{formValue.error.profileUrl}</div>
                        <div className="row">
                            <label className="label text" htmlFor="gender">Gender</label>
                            <div>
                                <input type="radio" onChange={changeValue} name="gender" id="male" value="male"/>
                                <label className="text" htmlFor="male">Male</label>
                                <input type="radio" name="gender" onChange={changeValue} id="female" value="female"/>
                                <label htmlFor="female"  className="text">Female</label>
                            </div>
                        </div>
                        <div className="error">{formValue.error.gender}</div>
                        <div className="row">
                            <label className="label text" htmlFor="department">Department</label>
                            <div>
                                {formValue.allDepartment.map(item => (
                                    <span key={item}>
                                        <input type="checkbox" className="checkbox" onChange={() => onCheckChange(item)} name={item}
                                        checked={getChecked(item)} value={item} />
                                        <label className="label text" htmlFor={item}>{item}</label>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="error">{formValue.error.department}</div>
                        <div className="row">
                            <label htmlFor="salary" className="label text">Salary</label>
                            <input type="range" name="salary" id="salary" onChange={changeValue} className="input" min="300000" max="500000" step="100" defaultValue="400000"/>
                        </div>
                        <div className="error"> {formValue.error.salary}</div>
                        <div className="row">
                            <label htmlFor="startDate" className="label text" >Start Date</label>
                            <div>
                                <select name="day" id="day" onChange={changeValue}>
                                    <option value="1">01</option>
                                    <option value="2">02</option>
                                    <option value="3">03</option>
                                    <option value="4">04</option>
                                    <option value="5">05</option>
                                    <option value="6">06</option>
                                    <option value="7">07</option>
                                    <option value="8">08</option>
                                    <option value="9">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                                <select name="month" id="month" onChange={changeValue}>
                                    <option value="Jan">January</option>
                                    <option value="Feb">February</option>
                                    <option value="Mar">March</option>
                                    <option value="Apr">April</option>
                                    <option value="May">May</option>
                                    <option value="Jun">June</option>
                                    <option value="Jul">July</option>
                                    <option value="Aug">August</option>
                                    <option value="Sept">September</option>
                                    <option value="Oct">October</option>
                                    <option value="Nov">November</option>
                                    <option value="Dec">December</option>
                                </select>
                                <select name="year" id="year" onChange={changeValue}>
                                    <option value="2016">2016</option>
                                    <option value="2017">2017</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                </select>
                            </div>
                        </div>
                        <div className="error">{formValue.error.startDate}</div>
                        <div className="row">
                            <label htmlFor="notes" className="label text">Notes</label>
                            <textarea name="notes" onChange={changeValue} value={formValue.notes} id="notes" className="input" placeholder="" style={{height:'100%'}}></textarea>
                        </div>
                        <div className="buttonParent">
                            <a className="resetButton button cancelButton">Cancel</a>
                            <div className="submit-react">
                                <button type="submit" className="button submitButton" id="submitButton">{formValue.isUpdate ? "update":"Submit"}</button>
                                <button type="button" onClick={reset} className="resetButton button">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
}

export default PayrollForm;