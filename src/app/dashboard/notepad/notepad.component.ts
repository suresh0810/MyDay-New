import { Component, OnInit, ElementRef, ChangeDetectionStrategy  } from '@angular/core';
import { DBService } from '../api/DB.service';
import { User, Task,  FirebaseUser, KStatus, KstatusOption,createddate,Deadline, Expense_Group,Expense,Sectors, SpentFor,Notes} from '../Classes';
import { ObjectId } from 'bson';
import { FirebaseService } from 'src/app/auth/firebase.service';
import {NgbDateStruct, NgbDate, NgbCalendar, NgbDateAdapter,NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pipe, PipeTransform } from '@angular/core';
import { SumPipe } from '../pipe/sum.pipe';
import { Observable } from 'rxjs/Observable';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS
  } from "@angular/material/core";
  import { MomentDateAdapter } from "@angular/material-moment-adapter";
  import { DatePipe } from "@angular/common";
  import { Router } from '@angular/router';
import{ AuthService} from '../../auth/auth.service';
import{AngularFirestore} from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';


export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

export const MY_FORMATS = {
  parse: {
    dateInput: "YYYY-MM-DD HH:mm:ss"
  },
  display: {
   // dateInput: "YYYY-MM-DD HH:mm:ss",
    //monthYearLabel: "MMM YYYY",
    //dateA11yLabel: "YYYY-MM-DD HH:mm:ss",
    //monthYearA11yLabel: "MMMM YYYY"
    dateInput: "MMM DD YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "YYYY-MM-DD HH:mm:ss",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe,    
  ]
})
export class NotepadComponent implements OnInit {
  notes = [];
  recognition:any;
  FB_User: any;
  User_: User;
  Temp_Notes:Notes;
  FirebaseUser_: FirebaseUser;
  Global_UserList: FirebaseUser[];
  Owner_Of_The_Note:FirebaseUser;
  constructor(private el:ElementRef,private router: Router, private DBService_: DBService, private afs: AngularFirestore,private modalService: NgbModal, private toast:ToastrService, private firebaseService:FirebaseService,  private auth:AuthService, ) {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [{ id: 0,content:'' }];

    const {webkitSpeechRecognition} : IWindow = <IWindow><unknown>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.onresult = (event)=> {
      console.log(this.el.nativeElement.querySelectorAll(".content")[0]);
      this.el.nativeElement.querySelectorAll(".content")[0].innerText = event.results[0][0].transcript
      
    };
   }

  ngOnInit(): void {
    this.Temp_Notes = new Notes(this.FirebaseUser_,0,"")
    this.getFirebaseUsers();

    this.auth.user_.subscribe(user =>
      {
           // this.FB_User = user;
            console.log("this.FB_User : ");   
            console.log(user.userName); 
                
           this.Global_UserList.forEach(element => 
            {       
             if(user.userId==element.id)
              {
              this.FirebaseUser_=element;
              console.log("this.FirebaseUser_"); 
              console.log(this.FirebaseUser_);    
              this.Load_Notes_OnlyOwned();         
             
             
             }
         });  
            this.User_ = new User(this.FirebaseUser_); 
     //this.UpdateUserFristime(this.User_);  
      })

  }
  // updateAllNotes() {
  //   console.log(document.querySelectorAll('app-note'));
  //   let notes = document.querySelectorAll('app-note');

  //   notes.forEach((note, index)=>{
  //        console.log(note.querySelector('.content').innerHTML)
  //        this.notes[note.id].content = note.querySelector('.content').innerHTML;
  //   });

  //   localStorage.setItem('notes', JSON.stringify(this.notes));

  // }

  addNote (Temp_Notes:Notes) {
    this.notes.push({ id: this.notes.length + 1,content:'' });
    //this.notes.push(Temp_Notes.id , Temp_Notes.content );
    // sort the array
    this.notes= this.notes.sort((a,b)=>{ return b.id-a.id});
    
   console.log(this.notes);
  // this.Owner_Of_The_Note.id = this.FirebaseUser_.id;
  Temp_Notes.Owner_Of_The_Notes={} as FirebaseUser;
    Temp_Notes.Owner_Of_The_Notes.id = this.FirebaseUser_.id;
    Temp_Notes.id = this.notes.length + 1;
    this.DBService_.Create_Note(Temp_Notes).subscribe((Data_: ObjectId) => {             
      console.log(Data_);     
      this.toast.success('Create Note Success!','Success!', {
        timeOut:1500
      });  
      this.Load_Notes_OnlyOwned();
     //localStorage.setItem('notes', JSON.stringify(this.notes));
    })
  };

  Load_Notes_OnlyOwned(){
    this.DBService_.Load_Notes_OnlyOwned(this.FirebaseUser_).subscribe((Data_: Notes[]) => {       
       this.notes = Data_  ;    
         console.log("notes");
         console.log(this.notes);  
         localStorage.setItem('notes', JSON.stringify(this.notes));                  
      })   
  }
  getid(save_:Notes){
    this.DBService_.Update_Notes(save_).subscribe((Data_) => {
      console.log("Note json : " + JSON.stringify(Data_));
     // localStorage.setItem('notes', JSON.stringify(this.notes));
      //this.Load_Notes_OnlyOwned();
      this.toast.success('Update Success!', 'Success!', {
        timeOut:1500
      });
    })
  }

  Delete_Notes(Note_:Notes) {     
         
    this.DBService_.Delete_Notes(Note_).subscribe((Data_:ObjectId) => {

      console.log("Delete ToDolist_item : " + JSON.stringify(Data_));        
      this.toast.success('Expense Delete Success!', 'Success!', {
        timeOut:1500
      });
      this.Load_Notes_OnlyOwned();
    })
  }
  
  saveNote(event){
   // console.log(event);
     const id = event.srcElement.parentElement.parentElement.getAttribute('id');
     const content = event.target.innerText;
     event.target.innerText = content;
     const json = {
       'id':id,
      'content':content
    }
    this.updateNote(json);
    console.log(json);
  
    localStorage.setItem('notes', JSON.stringify(this.notes));     
    console.log("********* updating note *********")

  }

 
  updateNote(newValue){
    this.notes.forEach((note, index)=>{
      if(note.id== newValue.id) {
        this.notes[index].content = newValue.content;
      }
    });
  }
  
  deleteNote(event){
     const id = event.srcElement.parentElement.parentElement.parentElement.getAttribute('id');
     this.notes.forEach((note, index)=>{
      if(note.id== id) {
        this.notes.splice(index,1);
        localStorage.setItem('notes', JSON.stringify(this.notes));
        console.log("********* deleting note *********")
        return;
      }
    });
  }

   record(event) {
    this.recognition.start();
    this.addNote(event);
  
  }


  getFirebaseUsers() {
    this.firebaseService.read_users().subscribe(data => {
      this.Global_UserList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          userName: e.payload.doc.data()['userName'],
          filepath: e.payload.doc.data()['filepath'],
          Selected_People: e.payload.doc.data()['Selected_People'],
        
        };
      })
      console.log("this.Global_UserList");  
      console.log(this.Global_UserList);     
    });
    return this.Global_UserList;
  } 

}
