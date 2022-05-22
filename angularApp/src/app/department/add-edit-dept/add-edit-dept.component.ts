import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dept',
  templateUrl: './add-edit-dept.component.html',
  styleUrls: ['./add-edit-dept.component.css']
})
export class AddEditDeptComponent implements OnInit {
@Input() dep:any;
DepartmentId:string="";
DepartmentName:string="";

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.DepartmentId = this.dep.DepartmentId;
    this.DepartmentName = this.dep.DepartmentName;
  }

  addDepartment(){
    var val = {
      DepartmentId:this.DepartmentId,
      DepartmentName:this.DepartmentName
    };
    this.service.addDepartment(val).subscribe(res=>{
      alert(res.toString());
    });
  }

  updateDepartment(){
    var val = {
      DepartmentId:this.DepartmentId,
      DepartmentName:this.DepartmentName
    };
    this.service.updateDepartment(val).subscribe(res=>{
      alert(res.toString());
    });
  }
}
