package com.info.kafka;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.info.model.FlightTrackingBatch;
import com.info.model.FlightTrackingDetails;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.KStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.support.serializer.JsonSerde;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Slf4j
@Service
public class KafkaFlightStream {


    public Map<String, List<FlightTrackingDetails>> flightDataMap = new ConcurrentHashMap<>();

    public Map<String, List<FlightTrackingDetails>> getFlightDataMap() {
        return flightDataMap;
    }

    private final ObjectMapper objectMapper = new ObjectMapper();

    public KafkaFlightStream(StreamsBuilder streamsBuilder){
        KStream<String, String> stream = streamsBuilder.stream("flight-tracking",
                Consumed.with(Serdes.String(), Serdes.String()));

        stream.foreach((key, value) -> {
            try {
                List<FlightTrackingDetails> list = objectMapper.readValue(
                        value, new TypeReference<List<FlightTrackingDetails>>() {}
                );
                log.info("Flight tracking Details Consumer ");
                flightDataMap.put(key, list);
                log.info("flightDataMap : {}",flightDataMap);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public void startStreamForFlight() {}
}
