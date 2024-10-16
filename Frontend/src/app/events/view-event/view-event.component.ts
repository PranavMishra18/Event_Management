import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Event } from '../../entities/event';
import { EventService } from '../../eventService';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../authService';
import { MatDialog } from '@angular/material/dialog';
import { ApproveDialogComponent } from '../../dialogs/approve-dialog/approve-dialog.component';
import { log } from 'node:console';
import { DisapproveDialogComponent } from '../../dialogs/disapprove-dialog/disapprove-dialog.component';
import { LoadingDialogComponent } from '../../dialogs/loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrl: './view-event.component.css'
})
export class ViewEventComponent implements OnInit {


    eventId : number;
    event : Event = {} as Event;
    eventFields: { label: string, value: string }[] = [];
    role : string = null;

    constructor(private eventService : EventService, private router : Router, private route : ActivatedRoute,
      private authService: AuthService,@Inject(PLATFORM_ID) private platformId: Object,
      private dialog : MatDialog){

    }

    ngOnInit(): void {

      if (isPlatformBrowser(this.platformId)) {
        const userDetails = this.authService.getUserDetails();
        if (userDetails) {                    
          this.role = userDetails.role;
        }
      }
      
        this.eventId = this.route.snapshot.params['id'];
        this.eventService.getEvent(this.eventId).subscribe(data => {
          this.event = data;
          this.eventFields = [
            { label: 'Event Title', value: this.event.eventTitle },
            { label: 'Club', value: this.event.clubName },
            { label: 'Date', value: this.event.date },
            { label: 'Venue', value: this.event.venue },
            { label: 'Time', value: this.event.time },
            { label: 'Dept Coord Approval', value: this.event.departmentCoordinatorApproval ? 'Approved' : 'Not Approved' },
            { label: 'HOD Approval', value: this.event.hodApproval ? 'Approved' : 'Not Approved' },
            { label: 'Dean Approval', value: this.event.deanApproval ? 'Approved' : 'Not Approved' },
            { label: 'IQAC Approval', value: this.event.iqacApproval ? 'Approved' : 'Not Approved' }
          ];
        });
      }

    openApproveDialog(enterAnimationDuration: string, exitAnimationDuration: string,name : string): void {
        const dialogRef = this.dialog.open(ApproveDialogComponent, {
          width: '350px', 
          enterAnimationDuration: '150ms', 
          exitAnimationDuration: '100ms', 
          data: { name }
        });
    
        dialogRef.afterClosed().subscribe(result => {
    
          if(result === 'approve'){
            this.openLoadingDialog("approve");
          } 
        })
    }

    openDisapproveDialog(enterAnimationDuration: string, exitAnimationDuration: string,name : string): void {
        const dialogRef = this.dialog.open(DisapproveDialogComponent, {
          width: '350px', 
          enterAnimationDuration: '150ms', 
          exitAnimationDuration: '100ms', 
          data: { name }
        });
    
        dialogRef.afterClosed().subscribe(result => {
    
          if(result === 'disapprove'){
            this.router.navigate([`event/disapproveReason/${this.eventId}`]);
            // ^ go to disapprove reason component, where we will verify authority disapproving the event.
          } 
        })
    }

    openLoadingDialog(type : string): void {
      const loadingDialogRef = this.dialog.open(LoadingDialogComponent, {
          disableClose: true,
          data : {type} 
      });

      if(type === 'approve'){
        this.approveEvent().then(() => {
          loadingDialogRef.close();
      });
      }   
  }

  async approveEvent(): Promise<void> {
    return new Promise((resolve) => {
        
        let approvalObservable;

        if (this.role === 'DEPARTMENT_COORDINATOR') {
            approvalObservable = this.eventService.departmentCoordinatorApproves(this.eventId);
        } else if (this.role === 'HOD') {
            approvalObservable = this.eventService.hodApproves(this.eventId);
        } else if (this.role === 'DEAN') {
            approvalObservable = this.eventService.deanApproves(this.eventId);
        } else if (this.role === 'IQAC') {
            approvalObservable = this.eventService.iqacApproves(this.eventId);
        }

        approvalObservable.subscribe(data => {
            console.log(data);
            this.goToDashboard();
            resolve(); 
        });
    });
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }    
}