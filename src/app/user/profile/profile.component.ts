import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: any;

  constructor(
    public authService: AuthenticationService

  ) { }

  ngOnInit(): void {
    // this.authService.getAuthLocal().subscribe((res:any) => {
    //   this.user = res
    // })
    this.authService.user.subscribe((res: any) => {
      this.user = res
    })
    // You can fetch user details here if it's dynamic.

  }

}
