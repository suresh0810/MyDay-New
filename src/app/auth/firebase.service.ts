import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class FirebaseService {



  collectionName = 'users';

  constructor(private afs: AngularFirestore) { 

  }

  read_users() {
    return this.afs.collection(this.collectionName).snapshotChanges();
  }
}
