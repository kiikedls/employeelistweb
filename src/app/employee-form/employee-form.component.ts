import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../model/employee.interface';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export default class EmployeeFormComponent implements OnInit {
  private fb=inject(FormBuilder);
  private router=inject(Router);
  private route=inject(ActivatedRoute);
  private employeeService=inject(EmployeeService);

  form?: FormGroup;
  emp?: Employee;

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id');

    if (id) {
      this.employeeService.get(parseInt(id))
        .subscribe(employee =>{
          this.emp = employee;
          this.form= this.fb.group({
            name:[employee.name, Validators.required],
            birthday:[employee.birthday, Validators.required],
            age:[employee.age, Validators.required],
            charge:[employee.charge, Validators.required],
            status:[employee.status, Validators.required]
          });
        })
    } else{
      this.form = this.fb.group({
        name:['',Validators.required],
        birthday:['',Validators.required],
        age:['',Validators.required],
        charge:['',Validators.required],
        status:[true,Validators.required]
      });
    }
  }

  save(){
    const employeeForm= this.form!.value;
    if (this.emp) {
      this.employeeService.update(this.emp.id, employeeForm)
      .subscribe(()=>{
        this.router.navigate(['/']);
      });
    } else{
      this.employeeService.create(employeeForm)
      .subscribe(()=>{
        this.router.navigate(['/']);
      });
    }

    
  }

}
