import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {
 
  constructor(private service:SharedService) { }

  DepartmentList:any=[];
  ModalTitle:string='';
  ActivateAddEditDepComp:boolean = false;
  dep:any;
  page: any=1;
  totalRecords:any;
  DepartmentFilterId:string="";
  DepartmentFilterName:string="";
  DepartmentListWithoutFilter:any=[];


  ngOnInit(): void {
    this.refreshDeptList();
  }

  refreshDeptList(){
   this.service.getDeptList().subscribe(data=>{
     this.DepartmentList = data;
     this.DepartmentListWithoutFilter = data;
     this.totalRecords = data.length;
   });
 }

 addClick(){
   this.dep={
    DepartmentId:0,
    DepartmentName:""
   }
   this.ModalTitle="Add Department";
   this.ActivateAddEditDepComp = true;
 }

 editClick(item:any){
this.dep = item;
this.ModalTitle = "Edit Department";
this.ActivateAddEditDepComp = true;
 }

 deleteClick(item:any){
if(confirm('Are you sure??')){
this.service.deleteDepartment(item.DepartmentId).subscribe(res=>{
  alert(res.toString());
  this.refreshDeptList();
});
}
 }

 closeClick(){
   this.ActivateAddEditDepComp = false;
   this.refreshDeptList();
 }

 FilterFn(){
   var DepartmentIdFilter = this.DepartmentFilterId;
   var DepartmentNameFilter = this.DepartmentFilterName;
 this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (el:any){
  return el.DepartmentId.toString().toLowerCase().includes(
    DepartmentIdFilter.toString().trim().toLowerCase()
  )&&
  el.DepartmentName.toString().toLowerCase().includes(
    DepartmentNameFilter.toString().trim().toLowerCase()
  )
});
 }

 sortResult(prop:string,asc:boolean){
  this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a:any,b:any){
    if(asc){
        return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
    }else{
      return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
    }
  })
}
}
