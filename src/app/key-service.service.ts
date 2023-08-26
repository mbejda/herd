import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Key } from './key.model';



@Injectable({
  providedIn: 'root'
})
export class KeyService {

  private keysCollection = collection(this.firestore, 'keys');

  constructor(private firestore: Firestore) { }

  // Add a new key
  addKey(keyValue: string): Promise<any> {
    const key: Key = {
      value: keyValue,
      status: 'unassigned',
      user: '',
      assign_date: Date.now(),
      creation_date: Date.now()
    };
    return addDoc(this.keysCollection, key);
  }

  // Fetch all keys
  getKeys(): Observable<Key[]> {
    return collectionData(this.keysCollection,{ idField: 'id' } ) as Observable<Key[]>
  }

  deleteKey(keyId: string): Promise<any> {
    return deleteDoc(doc(this.firestore, "keys", keyId));
  }

  // Update the status of a key
  // updateKeyStatus(keyId: string, status: 'unassigned' | 'assigned'): Promise<void> {
  //   return this.keysCollection.doc(keyId).update({status});
  // }
}
