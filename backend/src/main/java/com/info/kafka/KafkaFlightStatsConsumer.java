package com.info.kafka;

import com.info.helper.JsonSerdes;
import com.info.model.FlightStats;
import com.info.model.FlightTrackingDetails;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class KafkaFlightStatsConsumer {

    private final Map<String , FlightStats> flightStatsMap = new ConcurrentHashMap<>();
    public Map<String, FlightStats> getFlightStatsMap() {
        return flightStatsMap;
    }

    public KafkaFlightStatsConsumer(StreamsBuilder streamsBuilder) {
       // KStream<String, String> stream = streamsBuilder.stream("flight-window-stats");
        KTable<Windowed<String>, FlightStats> statsTable = streamsBuilder.table(
                "flight-window-stats",
                Consumed.with(
                        WindowedSerdes.timeWindowedSerdeFrom(String.class),
                        JsonSerdes.flightStats()
                )
        );

        statsTable.toStream().foreach((windowedKey, stats) -> {
            log.info(" Stats : {}",stats);
            flightStatsMap.put(stats.getFlightId(),stats);
        });
        for ( Map.Entry<String, FlightStats> entry : flightStatsMap.entrySet()){
            log.info("Key: {} , Value: {}",entry.getKey(),entry.getValue());
        }
    }
}
