package com.info.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.info.model.FlightTrackingBatch;
import com.info.model.FlightTrackingDetails;
import com.info.service.FlightTrackingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class KafkaFlightProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final FlightTrackingService trackingService;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final List<String> flightIds = List.of("FL001", "FL002", "FL003","FL004");

    public KafkaFlightProducer(KafkaTemplate<String, String> kafkaTemplate, FlightTrackingService trackingService) {
        this.kafkaTemplate = kafkaTemplate;
        this.trackingService = trackingService;
    }
    @Scheduled(fixedRate = 10000)
    public void produceAndPublishFlightData(){
        for (String flightId : flightIds) {
            List<FlightTrackingDetails> flightDataList = trackingService.generate(flightId);
            try{
                String flightDataJson = objectMapper.writeValueAsString(flightDataList);
                kafkaTemplate.send("flight-tracking",flightId,flightDataJson);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
