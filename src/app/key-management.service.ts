import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Key {
  id?: string;
  value: string;
  status: 'unassigned' | 'assigned';
}

@Injectable({
  providedIn: 'root'
})
export class KeyManagementService {

  private keysCollection = this.firestore.collection<Key>('keys');

  constructor(private firestore: AngularFirestore) { }

  // Add a new key
  addKey(keyValue: string): Promise<any> {
    const key: Key = {
      value: keyValue,
      status: 'unassigned'
    };
    return this.keysCollection.add(key);
  }

  // Fetch all keys
  getKeys(): Observable<Key[]> {
    return this.keysCollection.valueChanges({ idField: 'id' });
  }

  // Update the status of a key
  updateKeyStatus(keyId: string, status: 'unassigned' | 'assigned'): Promise<void> {
    return this.keysCollection.doc(keyId).update({status});
  }
}
