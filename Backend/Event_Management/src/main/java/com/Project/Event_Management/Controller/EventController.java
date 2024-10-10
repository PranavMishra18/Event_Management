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
@CrossOrigin(origins = "http://localhost:4200")
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

    @GetMapping("/events/status")
    public List<Event> getEventsByStatus(){
        return eventService.getEventsByStatus();
    }

    @GetMapping("/events/confirmed")
    public List<Event> getConfirmedEvents(){

        return eventService.getConfirmedEvents();

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
        return eventService.saveEvent(event);
    }

    @PutMapping("/event/hod/approves/{id}")
    public Event hodApproves(@PathVariable Long id){

        Event event = eventService.getEvent(id);
        event.setHodApproval(true);
        return eventService.saveEvent(event);
    }

    @PutMapping("/event/dean/approves/{id}")
    public Event deanApproves(@PathVariable Long id){

        Event event = eventService.getEvent(id);
        event.setDeanApproval(true);
        return eventService.saveEvent(event);
    }

    @PutMapping("/event/iqac/approves/{id}")
    public Event iqacApproves(@PathVariable Long id){

        Event event = eventService.getEvent(id);
        event.setIqacApproval(true);
        event.setStatus(true);
        return eventService.saveEvent(event);
    }


    @PutMapping("/event/dc/disapproves/{id}")
    public Event dcDisapproves(@PathVariable Long id){

        Event event = eventService.getEvent(id);
        event.setDepartmentCoordinatorApproval(false);

        emailSenderService.sendEmail(event.getEmail(),"Event disapproved...","Event '" + event.getEventTitle() + "' has been " +
                "disapproved by the Department Coordinator for the reason(s) :- \n \n " + event.getEventDisapprovedReason());

        return eventService.saveEvent(event);
    }

    @PutMapping("/event/hod/disapproves/{id}")
    public Event hodDisapproves(@PathVariable Long id){

        Event event = eventService.getEvent(id);
        event.setHodApproval(false);

        emailSenderService.sendEmail(event.getEmail(),"Event disapproved...","Event '" + event.getEventTitle() + "' has been " +
                "disapproved by the HOD for the reason(s) :- \n \n " + event.getEventDisapprovedReason());

        return eventService.saveEvent(event);
    }

    @PutMapping("/event/dean/disapproves/{id}")
    public Event deanDisapproves(@PathVariable Long id){

        Event event = eventService.getEvent(id);
        event.setDeanApproval(false);

        emailSenderService.sendEmail(event.getEmail(),"Event disapproved...","Event '" + event.getEventTitle() + "' has been " +
                "disapproved by the Dean for the reason(s) :- \n \n " + event.getEventDisapprovedReason());

        return eventService.saveEvent(event);
    }

    @PutMapping("/event/iqac/disapproves/{id}")
    public Event iqacDisapproves(@PathVariable Long id){

        Event event = eventService.getEvent(id);
        event.setIqacApproval(false);

        emailSenderService.sendEmail(event.getEmail(),"Event disapproved...","Event '" + event.getEventTitle() + "' has been " +
                "disapproved by the IQAC for the reason(s) :- \n \n " + event.getEventDisapprovedReason());

        return eventService.saveEvent(event);
    }





}
