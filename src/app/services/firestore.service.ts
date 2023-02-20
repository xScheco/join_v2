import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  updateDoc,
  doc,
} from '@angular/fire/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private chatCollection!: CollectionReference<DocumentData>;
  constructor(private readonly firestore: Firestore) {}

  getAll(coll: any) {
    this.chatCollection = collection(this.firestore, coll);
    return collectionData(this.chatCollection, {
      idField: 'id',
    });
  }

  get(coll: string, id: string) {
    const chatDocumentReference = doc(this.firestore, `${coll}/${id}`);
    return docData(chatDocumentReference, { idField: 'customid' });
  }

  create(coll: string, data: any) {
    this.chatCollection = collection(this.firestore, coll);
    return addDoc(this.chatCollection, data);
  }

  update(coll: string, id: string, data: any) {
    const chatDocumentReference = doc(this.firestore, `${coll}/${id}`);
    return updateDoc(chatDocumentReference, { ...data });
  }

  delete(coll: string, id: string) {
    const chatDocumentReference = doc(this.firestore, `${coll}/${id}`);
    return deleteDoc(chatDocumentReference);
  }
}
