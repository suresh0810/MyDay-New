import { Component, NgModule, OnInit } from '@angular/core';

import { AuthService } from '../../../auth/auth.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { finalize, tap } from 'rxjs/operators';
import { User } from '../../../auth/user';
import { ToastrService } from 'ngx-toastr';


export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  //

  
 // Upload Task 
 task: AngularFireUploadTask;

 // Progress in percentage
 percentage: Observable<number>;

 // Snapshot of uploading file
 snapshot: Observable<any>;

 // Uploaded File URL
 UploadedFileURL: Observable<string>;

 //Uploaded Image List
 images: Observable<MyData[]>;

 //File details  
 fileName:string;
 fileSize:number;

 //Status check 
 isUploading:boolean;
 isUploaded:boolean;

 private imageCollection: AngularFirestoreCollection<MyData>;



  //
  userName:string
  FirstName: string;
  LastName:string;
  Email:string;
  designation: string;
  Reporting: string;
  userId: string;
  Mobile:string;
  Address:string;
  State:string;
  City:string;
  phoneNumber:number;

  user: any;

  constructor(
    private auth: AuthService,
    private router: Router,
     private storage: AngularFireStorage,
      private afs: AngularFirestore,
     private toast:ToastrService,
      private modalService: NgbModal,
      config: NgbModalConfig,
  ) { 
   


    this.isUploading = false;
    this.isUploaded = false;
    this.auth.user_.subscribe(user =>{
      this.userId = user.userId;          
    
    //Set collection where our documents/ images info will save
    this.imageCollection = afs.collection<MyData>(`users`);
    this.images = this.imageCollection.valueChanges();
    console.log(this.images)
  })


  }

  ngOnInit(): void {

    this.auth.user_.subscribe(user =>{
      this.user = user;
      this.userId = user.userId; 
      this.userName =user.userName;    
      this.FirstName = user.FirstName;
      this.LastName = user.LastName;
      this.Email = user.Email; 
      this.phoneNumber = user.phoneNumber;
      this.Address = user.Address;     
      this.designation = user.designation;
      this.City = user.City;
      this.State = user.State;

    })
    
  }

  

  updateProfile()
    {     
  
  this.afs.collection('users').doc(this.userId).update({  
    
    'userName':this.userName,
          'FirstName': this.FirstName,
          'LastName': this.LastName,
          'Email': this.Email,                      
          'designation': this.designation,         
          'phoneNumber': this.phoneNumber,
          'Address': this.Address,
          'City':this.City,
          'State':this.State,
          

                                
          'createdAt': Date.now()
  },)

  .then(() =>{
   
  this.toast.success('Update Success!', 'success');
    this.router.navigate(['/user-profile']);
  
  })
  .catch(error =>{
   
  this.toast.error(error.message);
  })
    }


  open(content) {
    this.modalService.open(content);
  }


  uploadFile(event: FileList) {
   

    // The File object
    const file = event.item(0)
 
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }
 
    this.isUploading = true;
    this.isUploaded = false;
 
 
    this.fileName = file.name;
 
    // The storage path
    const path = `users/${new Date().getTime()}_${file.name}`;
 
    // Totally optional metadata
    const customMetadata = { app: 'Freaky Image Upload Demo' };
 
    //File reference
    const fileRef = this.storage.ref(path);
 
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
 
    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        this.UploadedFileURL.subscribe(resp=>{
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )
  }
 
  addImagetoDB(images: MyData) {
    //Create an ID for document
    const id = this.afs.createId();
 
    //Set document id with value in database
    this.imageCollection.doc(this.userId).update(images).then(resp => {
      console.log(resp);
 
      this.router.navigate(['/user-profile']);
    }).catch(error => {
      console.log("error " + error);
    });
  }


}
