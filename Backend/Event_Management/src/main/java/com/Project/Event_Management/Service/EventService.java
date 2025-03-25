package com.Project.Event_Management.Service;

import com.Project.Event_Management.Entities.Event;
import com.Project.Event_Management.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;


    public List<Event> getEvents(){

        return eventRepository.findAll();

    }

    public Event getEvent(Long id){

        return eventRepository.findById(id).get();

    }

    public Event saveEvent(Event event){

        return eventRepository.save(event);

    }

    public List<Event> getEventByUserId(Long id){

        return eventRepository.getEventsByUserId(id);

    }

    public List<Event> getCompletedEvents(){
        return eventRepository.getCompletedEvents();
    }

    // Unconfirmed
    public List<Event> getUnapprovedEvents(){

        return eventRepository.getUnapprovedEvents();

    }

    public List<Event> getApprovedEvents(){

        return eventRepository.getApprovedEvents();

    }

    public List<Event> getEventsForDC(){

        return eventRepository.getEventsForDC();

    }



    public List<Event> getEventsForHOD(){

        return eventRepository.getsEventsForHOD();

    }

    public List<Event> getEventsForDean(){
        return eventRepository.getEventsForDean();
    }

    public List<Event> getEventsForIQAC(){

        return eventRepository.getEventsForIQAC();

    }

    public List<Event> confirmedByDC(){

        return eventRepository.confirmedByDC();

    }

    public List<Event> confirmedByHOD(){

        return eventRepository.confirmedByHOD();

    }

    public List<Event> confirmedByDean(){

        return eventRepository.confirmedByDean();

    }

    public List<Event> confirmedByIQAC(){

        return eventRepository.confirmedByIQAC();

    }

    public void deleteEvent(Long id){

        Event theEvent = eventRepository.findById(id).get();

        eventRepository.delete(theEvent);


    }


}
