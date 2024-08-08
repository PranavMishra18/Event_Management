package com.Project.Event_Management.Serializers;

import com.Project.Event_Management.Entities.Event;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;

public class EventSerializer extends JsonSerializer<Event> {

    @Override
    public void serialize(Event event, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", event.getId());
        jsonGenerator.writeStringField("eventTitle", event.getEventTitle());
        jsonGenerator.writeStringField("coordinatorName", event.getCoordinatorName());
        jsonGenerator.writeObjectField("coordinator", event.getCoordinator()); // Serialize coordinator details
        jsonGenerator.writeStringField("clubName", event.getClubName());
        jsonGenerator.writeStringField("date", event.getDate());
        jsonGenerator.writeStringField("time", event.getTime());
        jsonGenerator.writeStringField("venue", event.getVenue());
        jsonGenerator.writeStringField("email",event.getEmail());
        jsonGenerator.writeStringField("eventBudget", event.getEventBudget());
        jsonGenerator.writeStringField("eventDescription", event.getEventDescription());
        jsonGenerator.writeStringField("eventDisapprovedReason",event.getEventDisapprovedReason());
        jsonGenerator.writeBooleanField("departmentCoordinatorApproval", event.isDepartmentCoordinatorApproval());
        jsonGenerator.writeBooleanField("deanApproval", event.isDeanApproval());
        jsonGenerator.writeBooleanField("hodApproval", event.isHodApproval());
        jsonGenerator.writeBooleanField("iqacApproval", event.isIqacApproval());
        jsonGenerator.writeBooleanField("status", event.isStatus());
        jsonGenerator.writeBooleanField("completed", event.isCompleted());
        jsonGenerator.writeEndObject();
    }
}
