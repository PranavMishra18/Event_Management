package com.Project.Event_Management.Serializers;

import com.Project.Event_Management.Entities.User;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;

public class UserSerializer extends JsonSerializer<User> {

    @Override
    public void serialize(User user, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", user.getId());
        jsonGenerator.writeStringField("username", user.getUsername());
        jsonGenerator.writeStringField("role", user.getRole().name());
        // Serialize event IDs
        jsonGenerator.writeArrayFieldStart("eventIds");
        user.getEvents().forEach(event -> {
            try {
                jsonGenerator.writeNumber(event.getId());
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        jsonGenerator.writeEndArray();
        jsonGenerator.writeEndObject();
    }
}
