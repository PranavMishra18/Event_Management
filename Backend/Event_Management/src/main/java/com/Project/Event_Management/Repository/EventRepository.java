package com.Project.Event_Management.Repository;

import com.Project.Event_Management.Entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event,Long> {

    @Query("SELECT e FROM Event e WHERE e.coordinator.id = :userId")
     List<Event> getEventsByUserId(Long userId);

    @Query("SELECT e FROM Event e WHERE e.approved = false")
    List<Event> getUnapprovedEvents();

    @Query("SELECT e FROM Event e WHERE e.completed = true")
    List<Event> getCompletedEvents();

    @Query("SELECT e FROM Event e WHERE e.approved = true")
    List<Event> getApprovedEvents();

    @Query("SELECT e FROM Event e WHERE e.departmentCoordinatorApproval = true")
    List<Event> confirmedByDC();

    @Query("SELECT e FROM Event e WHERE e.hodApproval = true")
    List<Event> confirmedByHOD();

    @Query("SELECT e FROM Event e WHERE e.deanApproval = true")
    List<Event> confirmedByDean();

    @Query("SELECT e FROM Event e WHERE e.iqacApproval = true")
    List<Event> confirmedByIQAC();

    @Query("SELECT e FROM Event e WHERE e.departmentCoordinatorApproval = false")
    List<Event> getEventsForDC();

    @Query("SELECT e FROM Event e WHERE e.departmentCoordinatorApproval = true AND e.hodApproval = false")
    List<Event> getsEventsForHOD();

    @Query("SELECT e FROM Event e WHERE e.hodApproval = true")
    List<Event> getEventsForDean();

    @Query("SELECT e FROM Event e WHERE e.deanApproval = true")
    List<Event> getEventsForIQAC();


}
