import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../auth/user';
import { DBService } from '../api/DB.service';
import {Users, FirebaseUser, Sectors, SpentFor} from '../Classes';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FirebaseService } from 'src/app/auth/firebase.service';
import { ObjectId } from 'mongodb';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  Temp_SpentFor:SpentFor;

  Temp_Sector:Sectors;
  List_of_Sector=[];
  List_of_SpentFor=[];

  constructor(private modalService: NgbModal,private DBservice_: DBService , private router: Router,private toast:ToastrService,) { }

  ngOnInit(): void {

    this.Temp_Sector = new Sectors("");
    this.Temp_SpentFor = new SpentFor("");
    this.Load_Sector();
    this.Load_SpentFor();

  }
//Sector
Create_Sect(sdf:Sectors){    
     this.DBservice_.Create_Sector(sdf).subscribe((Data_: ObjectId) => {          
       console.log(Data_);  
       this.Load_Sector();              
       this.toast.success('Create Sector Success!', 'Success!', {
         timeOut:1500
       });           
     })      
   }

   Load_Sector() {    
    this.DBservice_.Load_Sector().subscribe((Data_: any[]) => {
     this.List_of_Sector = Data_;      
        console.log("Load_Sector");  
        console.log(this.List_of_Sector);  
     })
    }

    Update_Sector(Sect_:Sectors) {           
      this.DBservice_.Update_Sector(Sect_).subscribe((Data_) => {
        console.log("Update ToDolist_item : " + JSON.stringify(Data_));       
         this.Load_Sector();   
      })
     
    }

    Delete_Sector(Sect_:Sectors) {             
      this.DBservice_.Delete_Sector(Sect_).subscribe((Data_:ObjectId) => {
        
        this.Load_Sector();
        this.toast.success('SpentFor Delete Success!', 'Success!', {
          timeOut:1500
        });
        
      })
    }
//SpentFor
   Create_SpentFor(spentfor_:SpentFor){    
    this.DBservice_.Create_SpentFor(spentfor_).subscribe((Data_: ObjectId) => {          
      console.log(Data_);   
      this.Load_SpentFor();                 
      this.toast.success('Create SpentFor Success!', 'Success!', {
        timeOut:1500
      });           
    })      
  }

  Load_SpentFor() {    
    this.DBservice_.Load_SpentFor().subscribe((Data_: any[]) => {
     this.List_of_SpentFor = Data_;      
        console.log("Load_Sector");  
        console.log(this.List_of_SpentFor);  
     })
    }
    Update_SpentFor(Spentfor_:SpentFor) {           
      this.DBservice_.Update_SpentFor(Spentfor_).subscribe((Data_) => {
        console.log("Update ToDolist_item : " + JSON.stringify(Data_));       
         this.Load_SpentFor(); 
      })
     
    }

    Delete_SpentFor(Spentfor_:SpentFor) {             
      this.DBservice_.Delete_SpentFor(Spentfor_).subscribe((Data_:ObjectId) => { 
        
        this.Load_SpentFor();
        this.toast.success('SpentFor Delete Success!', 'Success!', {
          timeOut:1500
        });
        
      })
    }


  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, size: 'lg', scrollable: true,});
  }

  sect_reset(){
    this.Temp_Sector.Sector_Name = "";
  }

  SpentFor_reset(){
    this.Temp_SpentFor.Spent_Name = "";
  }

  //input enter key
  onSomeAction(event){
    if(event.keyCode===13){
      //submit form
    }
   }

}
