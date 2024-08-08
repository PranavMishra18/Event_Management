import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Event } from '../../entities/event';
import { EventService } from '../../eventService';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../authService';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { log } from 'node:console';

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

      openConfirmDialog(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '400px',
          panelClass: 'custom-dialog-container'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            
            this.approveEvent();
          }
        });
      }
    
      approveEvent(): void {
        
        

        if(this.role === 'DEPARTMENT_COORDINATOR'){
          
          this.eventService.departmentCoordinatorApproves(this.eventId).subscribe(data => {
            console.log(data);   
            location.reload();         
          })

          
          
          
        } else if(this.role === 'HOD'){

           this.eventService.hodApproves(this.eventId).subscribe(data => {
            console.log(data);
            location.reload();
           })

                     

        } else if(this.role === 'DEAN'){

          this.eventService.deanApproves(this.eventId).subscribe(data => {
            console.log(data);            
            location.reload();
          })

          
        } else if(this.role === 'IQAC'){

          this.eventService.iqacApproves(this.eventId).subscribe(data => {
            console.log(data);            
            location.reload();
          })

          
        }

        this.goToDashboard();        
      }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }    
}