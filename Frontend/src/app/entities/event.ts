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
    status : boolean;
    completed : boolean;

    constructor(eventTitle : string, coordinatorName : string,coordinator : User,email : string, clubName : string, date : string, time : string, venue : string,
        eventBudget : string, eventDescription : string){

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
            this.status = false;
            this.completed = false;

    }



}