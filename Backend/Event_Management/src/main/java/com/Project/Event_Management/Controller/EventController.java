package com.Project.Event_Management.Controller;

import com.Project.Event_Management.Entities.Event;
import com.Project.Event_Management.Entities.User;
import com.Project.Event_Management.Service.EmailSenderService;
import com.Project.Event_Management.Service.EventService;
import com.Project.Event_Management.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {
        "http://localhost:4200",
        "http://event-sync-angular.s3-website-ap-southeast-2.amazonaws.com",
        "http://155.248.254.4:4200"
})
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailSenderService emailSenderService;

    @GetMapping("/events")
    public List<Event> viewEvents(){

        return eventService.getEvents();

    }



    @GetMapping("/events/{id}")
    public Event viewEvent(@PathVariable Long id){

        return eventService.getEvent(id);

    }



    @GetMapping("/events/user/{id}")
    public List<Event> getEventsByUserId(@PathVariable Long id){

        return eventService.getEventByUserId(id);

    }

    @GetMapping("/events/unconfirmed")
    public List<Event> getEventsByUnconfirmed(){
        return eventService.getUnapprovedEvents();
    }

    @GetMapping("/events/completed")
    public List<Event> getCompletedEvents(){
        return eventService.getCompletedEvents();
    }

    @GetMapping("/events/confirmed")
    public List<Event> getConfirmedEvents(){

        return eventService.getApprovedEvents();

    }

    @GetMapping("/events/confirmedByDC")
    public List<Event> confirmedByDC(){

        return eventService.confirmedByDC();

    }

    @GetMapping("/events/confirmedByHOD")
    public List<Event> confirmedByHOD(){

        return eventService.confirmedByHOD();

    }

    @GetMapping("/events/confirmedByDean")
    public List<Event> confirmedByDean(){

        return eventService.confirmedByDean();

    }

    @GetMapping("/events/confirmedByIQAC")
    public List<Event> confirmedByIQAC(){

        return eventService.confirmedByIQAC();

    }

    @GetMapping("/events/dc")
    public List<Event> getEventsForDC(){

        return eventService.getEventsForDC();

    }

    @GetMapping("/events/hod")
    public List<Event> getEventsForHOD(){

        return eventService.getEventsForHOD();

    }

    @GetMapping("/events/dean")
    public List<Event> getEventsForDean(){

        return eventService.getEventsForDean();

    }

    @GetMapping("/events/iqac")
    public List<Event> getEventsForIQAC(){

        return eventService.getEventsForIQAC();

    }

    @PostMapping("/events/save")
    public Event saveEvent(@RequestBody Event event){

//        emailSenderService.sendEmail("mishrapranav600@gmail.com","New Event Added","Event '" + event.getEventTitle() + "' by " +
//                event.getCoordinatorName() + " is waiting for approval.");

        return eventService.saveEvent(event);

    }

    @PutMapping("/events/update/{id}")
    public Event editEvent(@PathVariable Long id,@RequestBody Event newEvent){

        Event oldEvent = eventService.getEvent(id);

        oldEvent.setEventTitle(newEvent.getEventTitle());
        oldEvent.setCoordinatorName(newEvent.getCoordinatorName());
        oldEvent.setClubName(newEvent.getClubName());
        oldEvent.setDate(newEvent.getDate());
        oldEvent.setTime(newEvent.getTime());
        oldEvent.setVenue(newEvent.getVenue());
        oldEvent.setEventBudget(newEvent.getEventBudget());
        oldEvent.setEventDescription(newEvent.getEventDescription());

        return eventService.saveEvent(oldEvent);
    }

    @DeleteMapping("/events/delete/{id}")
    public void deleteEvent(@PathVariable Long id){
        System.out.println("did I run?");
        eventService.deleteEvent(id);
    }


    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Long id){

        return userService.getUserById(id);

    }

    @GetMapping("/users")
    public List<User> getUsers(){

        return userService.getUsers();

    }


    @PutMapping("/event/dc/approves/{id}")
    public Event dcApproves(@PathVariable Long id){

        Event event = eventService.getEvent(id);
        event.setDepartmentCoordinatorApproval(true);

        emailSenderService.sendEmail(event.getCoordinator().getEmail(),"Event approved by Department Coordinator",
                "Event '" + event.getEventTitle() + "' has been " +
                "approved by the Department Coordinator.");

        return eventService.saveEvent(event);
    }

    @PutMapping("/event/hod/approves/{id}")
    public Event hodApproves(@PathVariable Long id){

        Event event = eventService.getEvent(id);
        event.setHodApproval(true);

        emailSenderService.sendEmail(event.getCoordinator().getEmail(),"Event approved by HOD",
                "Event '" + event.getEventTitle() + "' has been " +
                        "approved by the HOD.");

        return eventService.saveEvent(event);
    }

    @PutMapping("/event/dean/approves/{id}")
    public Event deanApproves(@PathVariable Long id){

        Event event = eventService.getEvent(id);
        event.setDeanApproval(true);

        emailSenderService.sendEmail(event.getCoordinator().getEmail(),"Event approved by Dean",
                "Event '" + event.getEventTitle() + "' has been " +
                        "approved by the Dean.");
        return eventService.saveEvent(event);
    }

    @PutMapping("/event/iqac/approves/{id}")
    public Event iqacApproves(@PathVariable Long id){

        Event event = eventService.getEvent(id);
        event.setIqacApproval(true);
        event.setApproved(true);
        event.setDisapproved(false);

        emailSenderService.sendEmail(event.getCoordinator().getEmail(),"Event approved by IQAC",
                "Event '" + event.getEventTitle() + "' has been " +
                        "approved by the IQAC.");
        return eventService.saveEvent(event);
    }


    @PutMapping("/event/dc/disapproves/{id}")
    public Event dcDisapproves(@PathVariable Long id, @RequestParam String eventDisapprovalReason){

        Event event = eventService.getEvent(id);
        event.setDepartmentCoordinatorApproval(false);
        event.setApproved(false);
        event.setDisapproved(true);

        emailSenderService.sendEmail(event.getCoordinator().getEmail(),"Event disapproved...","Event '" + event.getEventTitle() + "' has been " +
                "disapproved by the Department Coordinator for the reason(s) :- \n \n " + eventDisapprovalReason);

        return eventService.saveEvent(event);
    }

    @PutMapping("/event/hod/disapproves/{id}")
    public Event hodDisapproves(@PathVariable Long id,@RequestParam String eventDisapprovalReason){

        Event event = eventService.getEvent(id);
        event.setHodApproval(false);
        event.setApproved(false);
        event.setDisapproved(true);

        emailSenderService.sendEmail(event.getCoordinator().getEmail(),"Event disapproved...","Event '" + event.getEventTitle() + "' has been " +
                "disapproved by the HOD for the reason(s) :- \n \n " + eventDisapprovalReason);

        return eventService.saveEvent(event);
    }

    @PutMapping("/event/dean/disapproves/{id}")
    public Event deanDisapproves(@PathVariable Long id,@RequestParam String eventDisapprovalReason){

        Event event = eventService.getEvent(id);
        event.setApproved(false);
        event.setDisapproved(true);

        emailSenderService.sendEmail(event.getCoordinator().getEmail(),"Event disapproved...","Event '" + event.getEventTitle() + "' has been " +
                "disapproved by the Dean for the reason(s) :- \n \n " + eventDisapprovalReason);

        return eventService.saveEvent(event);
    }

    @PutMapping("/event/iqac/disapproves/{id}")
    public Event iqacDisapproves(@PathVariable Long id,@RequestParam String eventDisapprovalReason){

        Event event = eventService.getEvent(id);
        event.setApproved(false);
        event.setDisapproved(true);

        emailSenderService.sendEmail(event.getCoordinator().getEmail(),"Event disapproved...","Event '" + event.getEventTitle() + "' has been " +
                "disapproved by the IQAC for the reason(s) :- \n \n " + eventDisapprovalReason);

        return eventService.saveEvent(event);
    }





}
