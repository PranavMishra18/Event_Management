    package com.Project.Event_Management.Entities;

    import com.Project.Event_Management.Serializers.EventSerializer;
    import com.fasterxml.jackson.annotation.JsonProperty;
    import com.fasterxml.jackson.databind.annotation.JsonSerialize;
    import jakarta.persistence.*;


    import java.time.LocalDate;

    @Entity
    @Table(name="events")
    @JsonSerialize(using = EventSerializer.class)

    public class Event {



        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;



        private String eventTitle;


        private String coordinatorName;



        @ManyToOne
        @JoinColumn(name = "user_id")
        private User coordinator;



        private String clubName;


        private String email;


        private LocalDate date;


        private String time;


        private String venue;


        private String eventBudget;



        @Column(length = 2000)
        private String eventDescription;



        @Column(length = 2000)
        private String eventDisapprovedReason;


        @Column(columnDefinition = "boolean default true")
        @JsonProperty("isVirtual")
        private boolean isVirtual;

        @Column(columnDefinition = "boolean default true")
        @JsonProperty("isPhysical")
        private boolean isPhysical;




        @Column(columnDefinition = "boolean default false")
        private boolean departmentCoordinatorApproval;




        @Column(columnDefinition = "boolean default false")
        private boolean deanApproval;



        @Column(columnDefinition = "boolean default false")
        private boolean hodApproval;



        @Column(columnDefinition = "boolean default false")
        private boolean iqacApproval;



        @Column(columnDefinition = "boolean default false")
        private boolean approved;



        @Column(columnDefinition = "boolean default false")
        private boolean disapproved;



        @Column(columnDefinition = "boolean default false")
        private boolean completed;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
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

        public User getCoordinator() {
            return coordinator;
        }

        public void setCoordinator(User coordinator) {
            this.coordinator = coordinator;
        }

        public String getClubName() {
            return clubName;
        }

        public void setClubName(String clubName) {
            this.clubName = clubName;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public LocalDate getDate() {
            return date;
        }

        public void setDate(LocalDate date) {
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

        public String getEventDisapprovedReason() {
            return eventDisapprovedReason;
        }

        public void setEventDisapprovedReason(String eventDisapprovedReason) {
            this.eventDisapprovedReason = eventDisapprovedReason;
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

        public boolean isApproved() {
            return approved;
        }

        public void setApproved(boolean approved) {
            this.approved = approved;
        }

        public boolean isDisapproved() {
            return disapproved;
        }

        public void setDisapproved(boolean disapproved) {
            this.disapproved = disapproved;
        }

        public boolean isCompleted() {
            return completed;
        }

        public void setCompleted(boolean completed) {
            this.completed = completed;
        }

        public boolean isVirtual() {
            return isVirtual;
        }

        public void setVirtual(boolean virtual) {
            isVirtual = virtual;
        }

        public boolean isPhysical() {
            return isPhysical;
        }

        public void setPhysical(boolean physical) {
            isPhysical = physical;
        }

    }
