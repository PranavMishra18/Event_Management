import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Event } from "./entities/event";
import { log } from "console";

@Injectable({
    providedIn : 'root'
})
export class EventService{


    // baseUrl = "http://155.248.254.4:8080";
    baseUrl = "http://localhost:8080";



    constructor(private http : HttpClient){


    }

    getEvents(){
        return this.http.get<Event[]>(`${this.baseUrl}/events`);
    }

    getEventsByUserId(id : number){
        return this.http.get<Event[]>(`${this.baseUrl}/events/user/${id}`);
    }

    getConfirmedByDC(){
        return this.http.get<Event[]>(`${this.baseUrl}/events/confirmedByDC`);
    }

    getConfirmedByHOD(){
        return this.http.get<Event[]>(`${this.baseUrl}/events/confirmedByHOD`);
    }

    getConfirmedByDean(){
        return this.http.get<Event[]>(`${this.baseUrl}/events/confirmedByDean`);
    }

    getConfirmedByIQAC(){
        return this.http.get<Event[]>(`${this.baseUrl}/events/confirmedByIQAC`);
    }

    getEventsForDC(){        
        return this.http.get<Event[]>(`${this.baseUrl}/events/dc`);
    }

    getEventsForHOD(){
        return this.http.get<Event[]>(`${this.baseUrl}/events/hod`);
    }

    getEventsForDean(){
        return this.http.get<Event[]>(`${this.baseUrl}/events/dean`);
    }

    getEventsForIQAC(){
        return this.http.get<Event[]>(`${this.baseUrl}/events/iqac`);
    }

    getAllConfirmedEvents(){

        return this.http.get<Event[]>(`${this.baseUrl}/events/confirmed`);

    }

    getAllUnconfirmedEvents(){

        return this.http.get<Event[]>(`${this.baseUrl}/events/unconfirmed`);

    }

    getEvent(id : number){
        return this.http.get<Event>(`${this.baseUrl}/events/${id}`);
    }

    saveEvent(event : Event){

        return this.http.post(`${this.baseUrl}/events/save`,event);

    }

    editEvent(eventId : number, event : Event){

        return this.http.put(`${this.baseUrl}/events/update/${eventId}`,event);

    }

    deleteEvent(eventId : number){
        
        console.log(`Id to delete is :- ${eventId}`);
        
        
        return this.http.delete(`${this.baseUrl}/events/delete/${eventId}`)
    }

    getUser(id : number){

        return this.http.get<any>(`${this.baseUrl}/user/${id}`);

    }

    departmentCoordinatorApproves(eventId :number){

        return this.http.put(`${this.baseUrl}/event/dc/approves/${eventId}`,null);

    }

    hodApproves(eventId :number){

        return this.http.put(`${this.baseUrl}/event/hod/approves/${eventId}`,null);

    }

    deanApproves(eventId :number){

        return this.http.put(`${this.baseUrl}/event/dean/approves/${eventId}`,null);

    }

    iqacApproves(eventId :number){

        return this.http.put(`${this.baseUrl}/event/iqac/approves/${eventId}`,null);

    }

    departmentCoordinatorDisapproves(eventId: number, eventDisapprovalReason: string) {
        const params = new HttpParams().set('eventDisapprovalReason', eventDisapprovalReason);
        
        return this.http.put(`${this.baseUrl}/event/dc/disapproves/${eventId}`, null, { params });
    }
    

    hodDisapproves(eventId :number, eventDisapprovalReason: string){

        const params = new HttpParams().set('eventDisapprovalReason', eventDisapprovalReason);

        return this.http.put(`${this.baseUrl}/event/hod/disapproves/${eventId}`,null, {params});

    }

    deanDisapproves(eventId :number, eventDisapprovalReason: string){

        const params = new HttpParams().set('eventDisapprovalReason', eventDisapprovalReason);

        return this.http.put(`${this.baseUrl}/event/dean/disapproves/${eventId}`,null, {params});

    }

    iqacDisapproves(eventId :number, eventDisapprovalReason: string){

        const params = new HttpParams().set('eventDisapprovalReason', eventDisapprovalReason);

        return this.http.put(`${this.baseUrl}/event/iqac/disapproves/${eventId}`,null, {params});

    }



}