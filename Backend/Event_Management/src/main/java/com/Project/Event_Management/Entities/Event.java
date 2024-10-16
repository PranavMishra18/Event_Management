package com.Project.Event_Management.Entities;

import com.Project.Event_Management.Serializers.EventSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name="events")
@JsonSerialize(using = EventSerializer.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
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
    private String eventDescription;
    private String eventDisapprovedReason;

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
}
