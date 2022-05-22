import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  EmployeeList:any=[];
  ModalTitle:string='';
  ActivateAddEditEmpComp:boolean = false;
  emp:any; 
  page: any=1;
  totalRecords:any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  refreshEmpList(){
   this.service.getEmpList().subscribe(data=>{
     this.EmployeeList = data;
     this.totalRecords = data.length
   });
 }

 addClick(){
   this.emp={
    EmployeeId:0,
    EmployeeName:"",
    Department:"",
    DateOfJoining:"",
    PhotoFileName:"anonymous.png"
   }
   this.ModalTitle="Add Employee";
   this.ActivateAddEditEmpComp = true;
 }

 editClick(item:any){
this.emp = item;
this.ModalTitle = "Edit Employee";
this.ActivateAddEditEmpComp = true;
 }

 deleteClick(item:any){
if(confirm('Are you sure??')){
this.service.deleteDepartment(item.EmployeeId).subscribe(res=>{
  alert(res.toString());
  this.refreshEmpList();
});
}
 }

 closeClick(){
   this.ActivateAddEditEmpComp = false;
   this.refreshEmpList();
 }
}
