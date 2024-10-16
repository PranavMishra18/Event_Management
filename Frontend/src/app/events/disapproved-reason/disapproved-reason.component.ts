import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../authService';
import { EventService } from '../../eventService';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-disapproved-reason',
  templateUrl: './disapproved-reason.component.html',
  styleUrl: './disapproved-reason.component.css'
})
export class DisapprovedReasonComponent implements OnInit {

  // userId : number | null = null;
  // user : any;

  eventId : number;
  role : string;
  eventDisapprovalReason : string;


  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private eventService : EventService,
    private router : Router,
    private route : ActivatedRoute,
    private dialog : MatDialog
  ) {}

  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userDetails = this.authService.getUserDetails();
      if (userDetails) {                    
        this.role = userDetails.role;
      }
    }  

      this.eventId = this.route.snapshot.params['id'];
      
      // this.eventService.getUser(this.userId).subscribe(data => {
      //   this.user = data;
      // })
    
  }

  onSubmit(f : NgForm){

    this.eventDisapprovalReason = f.value.eventDisapprovalReason;

    this.openLoadingDialog('disapprove');
    
  }

  openLoadingDialog(type : string): void {
    const loadingDialogRef = this.dialog.open(LoadingDialogComponent, {
        disableClose: true,
        data : {type} 
    });

    if(type === 'disapprove'){
      this.disapproveEvent(this.eventDisapprovalReason).then(() => {
        loadingDialogRef.close();
      });
    } 
}

  async disapproveEvent(eventDisapprovalReason : string): Promise<void> {
    return new Promise((resolve) => {
        
        let disapprovalObservable;

        if (this.role === 'DEPARTMENT_COORDINATOR') {
            disapprovalObservable = this.eventService.departmentCoordinatorDisapproves(this.eventId,eventDisapprovalReason);
        } else if (this.role === 'HOD') {
            disapprovalObservable = this.eventService.hodDisapproves(this.eventId,eventDisapprovalReason);
        } else if (this.role === 'DEAN') {
            disapprovalObservable = this.eventService.deanDisapproves(this.eventId,eventDisapprovalReason);
        } else if (this.role === 'IQAC') {
            disapprovalObservable = this.eventService.iqacDisapproves(this.eventId,eventDisapprovalReason);
        }

        disapprovalObservable.subscribe(data => {
            console.log(data);
            this.goToDashboard();
            resolve(); 
        });
    });
}

goToDashboard(){
  this.router.navigate(['/dashboard']);
}

  goBack(eventId : number){
    this.router.navigate([`event/view/${eventId}`]);
  }
}