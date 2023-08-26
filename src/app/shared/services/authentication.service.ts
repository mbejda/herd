import { Injectable,NgZone } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';

import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  UserData : any;
  user: any;

  private usersCollection = collection(this.firestore, 'users');

  constructor(
    private auth: Auth,
    private router : Router,
    public ngZone: NgZone,
    private firestore: Firestore
    ){
    onAuthStateChanged(this.auth,(user: any)=>{
      if(user){
        this.UserData = user;
        this.getUser(this.UserData.uid).subscribe((res: any) => {
          if(!res || !res.uid){
          alert('NO USER')
          let user = {
            uid : this.UserData.uid,
            email : this.UserData.email,
            displayName : this.UserData.displayName,
            ads_watched: 0,
            keys_claimed: 0,
            role: 0,
            photo: this.UserData.photoURL
          }

          const userRef = doc(this.firestore, 'users', this.UserData.uid);

          // Set the user data on that reference
          setDoc(userRef, user);
        }
          this.user = res;
          localStorage.setItem('user', JSON.stringify(this.user));
        })
        localStorage.setItem('firebase_user', JSON.stringify(this.UserData));
        JSON.parse(localStorage.getItem('user')!);
        JSON.parse(localStorage.getItem('firebase_user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
        localStorage.setItem('firebase_user', 'null');
        JSON.parse(localStorage.getItem('firebase_user')!);
      }
    })
   }

  //get User
    //get Authenticated user from firebase
    getAuthFire(){
      return this.auth.currentUser;
    }


    //get Authenticated user from Local Storage
    getAuthLocal(){
      const token = localStorage.getItem('user')
      const user = JSON.parse(token as string);
      return user;
    }


    //Check wither User Is looged in or not
    get isLoggedIn(): boolean {
      const token = localStorage.getItem('user')
      const user = JSON.parse(token as string);
      return user !== null ? true : false;
    }


    //Check wither User Is admin or not
    get isAdmin(): boolean {
      const user = JSON.parse(localStorage.getItem('user') as string);
      console.log(user);

      return user.role == 1;
    }


    //Register Method
    Register(email : string, password : string) {
      return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
           /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
          // this.sendEmailVerification()

          let user = {
            uid : this.UserData.uid,
            email : this.UserData.email,
            displayName : this.UserData.displayName,
            ads_watched: 0,
            keys_claimed: 0,
            role: 0,
            photo: this.UserData.photoURL
          }

          const userRef = doc(this.firestore, 'users', this.UserData.uid);

          // Set the user data on that reference
          setDoc(userRef, user);
          this.UserData = user;
          // setDoc(this.usersCollection, user)
          this.router.navigate(['/dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
    }


    //Login Method
    Login(email : string, password : string){
      return signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        this.UserData = result.user;

        this.getUser(this.UserData.uid).subscribe((res: any) => {
          this.user = res;
          localStorage.setItem('user', JSON.stringify(this.user));
        })

        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
    }

    getUser(id: string): Observable<any> {
      return docData(doc(this.firestore, 'users', this.UserData.uid)) as Observable<any>
    }


   //Logout
    Logout() {
      signOut(this.auth).then(()=>this.router.navigate(['/login']))


    }


  //login with Email or Facebook
    //Login with Google
    GoogleAuth() {
      return this.loginWithPopup(new GoogleAuthProvider());
    }

    GithubAuth() {
      return this.loginWithPopup(new GithubAuthProvider());
    }



    //Login with Facebook
    //FacebookAuth() {
    //  return this.loginWithPopup(new FacebookAuthProvider());
    //}



    //Pop Up Provider
    loginWithPopup(provider :any) {
      return signInWithPopup(this.auth,provider).then((user) => {
        console.log("NOVI USER:", user);

        this.router.navigate(['dashboard']);
      });
    }


    //Send Password Reset Email
    async sendPasswordResetEmails(email : string){
       sendPasswordResetEmail(this.auth,email)
       .then(() => {
          window.alert('Password reset email sent, check your inbox.');
       })
       .catch((error:any ) => {
        window.alert(error.message);
      });
    }

    //Send Email Verification
    sendEmailVerification(){
      return sendEmailVerification(this.auth.currentUser as User );
    }
}
