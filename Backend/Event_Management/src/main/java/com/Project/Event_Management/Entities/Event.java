package com.Project.Event_Management.Entities;

import com.Project.Event_Management.Serializers.EventSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;

@Entity
@Table(name="events")
@JsonSerialize(using = EventSerializer.class)
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;



    String eventTitle;

    String coordinatorName;

    @ManyToOne
            @JoinColumn(name = "user_id")
    User coordinator;

    String clubName;

    String email;

    String date;

    String time;

    String venue;

    String eventBudget;

    String eventDescription;

    String eventDisapprovedReason;

    @Column(columnDefinition = "boolean default false")
    boolean departmentCoordinatorApproval;

    @Column(columnDefinition = "boolean default false")
    boolean deanApproval;

    @Column(columnDefinition = "boolean default false")
    boolean hodApproval;

    @Column(columnDefinition = "boolean default false")
    boolean iqacApproval;

    @Column(columnDefinition = "boolean default false")
    boolean status;

    @Column(columnDefinition = "boolean default false")
    boolean completed;



    public Event(){

    }

    public Event(String eventTitle, String coordinatorName, User coordinator,String email, String clubName,
                 String date, String time, String venue, String eventBudget, String eventDescription, String eventDisapprovedReason
                 ) {
        this.eventTitle = eventTitle;
        this.coordinatorName = coordinatorName;
        this.coordinator = coordinator;
        this.clubName = clubName;
        this.date = date;
        this.time = time;
        this.venue = venue;
        this.email = coordinator.username;
        this.eventBudget = eventBudget;
        this.eventDescription = eventDescription;
        this.eventDisapprovedReason = null;
        this.departmentCoordinatorApproval = false;
        this.deanApproval = false;
        this.hodApproval = false;
        this.iqacApproval = false;
        this.status = false;
        this.completed = false;
    }

    public boolean isCompleted() {
        return completed;
    }

    public String getEventDisapprovedReason() {
        return eventDisapprovedReason;
    }

    public void setEventDisapprovedReason(String eventDisapprovedReason) {
        this.eventDisapprovedReason = eventDisapprovedReason;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public User getCoordinator() {
        return coordinator;
    }

    public void setCoordinator(User coordinator) {
        this.coordinator = coordinator;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public String getCoordinatorName() {
        return coordinatorName;
    }

    public void setCoordinatorName(String coordinatorName) {
        this.coordinatorName = coordinatorName;
    }

    public String getClubName() {
        return clubName;
    }

    public void setClubName(String clubName) {
        this.clubName = clubName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getEventBudget() {
        return eventBudget;
    }

    public void setEventBudget(String eventBudget) {
        this.eventBudget = eventBudget;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }

    public boolean isDepartmentCoordinatorApproval() {
        return departmentCoordinatorApproval;
    }

    public void setDepartmentCoordinatorApproval(boolean departmentCoordinatorApproval) {
        this.departmentCoordinatorApproval = departmentCoordinatorApproval;
    }

    public boolean isDeanApproval() {
        return deanApproval;
    }

    public void setDeanApproval(boolean deanApproval) {
        this.deanApproval = deanApproval;
    }

    public boolean isHodApproval() {
        return hodApproval;
    }

    public void setHodApproval(boolean hodApproval) {
        this.hodApproval = hodApproval;
    }

    public boolean isIqacApproval() {
        return iqacApproval;
    }

    public void setIqacApproval(boolean iqacApproval) {
        this.iqacApproval = iqacApproval;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", eventTitle='" + eventTitle + '\'' +
                ", coordinatorName='" + coordinatorName + '\'' +
                ", coordinator=" + coordinator +
                ", clubName='" + clubName + '\'' +
                ", email='" + email + '\'' +
                ", date='" + date + '\'' +
                ", time='" + time + '\'' +
                ", venue='" + venue + '\'' +
                ", eventBudget='" + eventBudget + '\'' +
                ", eventDescription='" + eventDescription + '\'' +
                ", eventDisapprovedReason='" + eventDisapprovedReason + '\'' +
                ", departmentCoordinatorApproval=" + departmentCoordinatorApproval +
                ", deanApproval=" + deanApproval +
                ", hodApproval=" + hodApproval +
                ", iqacApproval=" + iqacApproval +
                ", status=" + status +
                ", completed=" + completed +
                '}';
    }
}
