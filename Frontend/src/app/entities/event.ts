import { User } from "./user";

export class Event{

    id : number;
    eventTitle : string;
    coordinatorName : string;
    coordinator : User;
    email : string;
    clubName : string;
    date : string;
    time : string;
    venue : string;
    eventBudget : string;
    eventDescription : string;
    departmentCoordinatorApproval : boolean;
    deanApproval : boolean;
    hodApproval : boolean;
    iqacApproval : boolean;
    approved : boolean;
    disapproved : boolean;
    completed : boolean;
    isVirtual : boolean;
    isPhysical : boolean;

    constructor(eventTitle : string, coordinatorName : string,coordinator : User,email : string, clubName : string, date : string, time : string, venue : string,
        eventBudget : string, eventDescription : string,isVirtual : boolean, isPhysical : boolean){

            this.eventTitle = eventTitle;
            this.coordinatorName = coordinatorName;
            this.coordinator = coordinator;
            this.email = email;
            this.clubName = clubName;
            this.date = date;
            this.time = time;
            this.venue = venue;
            this.eventBudget = eventBudget;
            this.eventDescription = eventDescription;
            this.departmentCoordinatorApproval = false;
            this.deanApproval = false;
            this.hodApproval = false;
            this.iqacApproval = false;
            this.approved = false;
            this.disapproved = false;
            this.completed = false;
            this.isVirtual = isVirtual;
            this.isPhysical = isPhysical;

    }



}