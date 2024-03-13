import { Component, inject } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Employee } from '../model/employee.interface';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export default class EmployeeListComponent {
  private employeeService=inject(EmployeeService);

  employees:Employee[] =[];

  ngOnInit(): void{
    this.loadList();
  }

  loadList(){
    this.employeeService.list()
    .subscribe(employees =>{
      this.employees = employees;
    });
  }

  deleteEmployee(employee:Employee){
    this.employeeService.delete(employee.id)
      .subscribe(() => {
        this.loadList();
      });
  }
}
