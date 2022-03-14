import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from './employee';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[]; 
  public editEmployee:Employee;
  public deleteEmployee:Employee;
  constructor(private empService:EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees()
  }
 
  public getEmployees(): void {
    this.empService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmloyee(addForm: NgForm): void {

    this.empService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onEditEmployee(emp:Employee): void {

    this.empService.editEmployee(emp).subscribe(
      (response: Employee) => {
        this.getEmployees();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteEmployee():void{
    this.empService.deleteEmployee(this.deleteEmployee?.id).subscribe(
      () => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public searchEmployees(key:string):void{
    var  results:Employee[]=[];
    console.log(key);
     for (const emp of this.employees) {
       if(emp?.name.toLowerCase().indexOf(key.toLowerCase())!==-1 || emp?.phone.indexOf(key.toLowerCase())!==-1 || emp?.email.indexOf(key.toLowerCase())!==-1)
        results.push(emp);
     }
     this.employees=results;
     if (!key) {
       this.getEmployees();
     }
  }
  public onClick(emp:Employee,mod:string){
    if (mod=="edit") {
      this.editEmployee=emp;
    }else{
      this.deleteEmployee=emp;
    }
  }
}