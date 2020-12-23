import React from 'react';
import './display.scss'
import deleteIcon from '../../assets/icons/delete-black-18dp.svg'
import editIcon from '../../assets/icons/create-black-18dp.svg'
import profile from '../../assets/profile-images/Ellipse -1.png'
import {withRouter} from 'react-router-dom';

const Display = (props) => {
    return(
        <table id="display" className="display">
            <tbody>
                <tr key={-1}>
                    <th></th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Start Date</th>
                    <th>Actions</th>
                </tr>
                {
                    props.employeeArray && props.employeeArray.map((element,ind) => (
                        <tr key={ind}>
                            <td><img src={profile} className="profile" alt=""/></td>
                            <td>{element.name}</td>
                            <td>{element.gender}</td>
                            <td>{element.departments && element.departments.map(dept => 
                                    ( <div className='dept-label'>{dept}</div>))}</td>
                            <td>${element.salary}</td>
                            <td>{element.startDate}</td>
                            <td>
                                <img src={deleteIcon}  alt="delete"/>
                                <img src={editIcon}  alt="edit"/>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default withRouter(Display); 