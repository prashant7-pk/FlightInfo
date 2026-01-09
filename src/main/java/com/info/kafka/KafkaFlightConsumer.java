package com.info.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.info.model.FlightTrackingDetails;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;
import org.springframework.kafka.support.KafkaHeaders;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListMap;

@Slf4j
@Service
public class KafkaFlightConsumer {

    @Getter
    private final Map<String ,List<FlightTrackingDetails>> flightDataCache = new ConcurrentSkipListMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public KafkaFlightConsumer() {
    }

    @KafkaListener(topics = "flight-tracking" , groupId = "group1")
    public void consumeFlightData(String message, @Header(KafkaHeaders.RECEIVED_KEY) String flightId) {
        try {
                List<FlightTrackingDetails> flightData =
                        objectMapper.readValue(message, new TypeReference<List<FlightTrackingDetails>>() {
                        });
                flightDataCache.put(flightId,flightData);
        }catch (Exception e){
            e.printStackTrace();
        }

    }
}
