import config from '../config/config';
import AxiosService from './axios-service';

export default class EmployeeService{
    baseUrl = config.baseUrl;
    addEmployee(data){
        return AxiosService.postService(`${this.baseUrl}create`,data);
    }
    getAllEmployee(){
        return AxiosService.getService(`${this.baseUrl}get`);
    }
    getEmployee(id){
        return AxiosService.getService(`${this.baseUrl}get/${id}`);
    }
}