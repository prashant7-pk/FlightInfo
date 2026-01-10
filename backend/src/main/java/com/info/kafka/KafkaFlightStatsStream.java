package com.info.kafka;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.info.helper.JsonSerdes;
import com.info.model.FlightStats;
import com.info.model.FlightTrackingBatch;
import com.info.model.FlightTrackingDetails;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KeyValue;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.kstream.*;
import org.springframework.kafka.support.serializer.JsonSerde;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class KafkaFlightStatsStream {

    public Map<String, List<FlightTrackingDetails>> flightMapForStats = new ConcurrentHashMap<>();
    private static final ObjectMapper objectMapper = new ObjectMapper();





    public KafkaFlightStatsStream(StreamsBuilder streamsBuilder){

        log.info("Starting Stats Stream");
        KStream<String, String> flightStream = streamsBuilder.stream(
                "flight-tracking",
                Consumed.with(Serdes.String(), Serdes.String())
        );
        KStream<String, List<FlightTrackingDetails>> flightStreamForStats = flightStream.mapValues(value -> {
            try {
                return objectMapper.readValue(value, new TypeReference<List<FlightTrackingDetails>>() {});
            } catch (Exception e) {
                e.printStackTrace();
                return Collections.emptyList();
            }
        });
        /*KStream<String , List<FlightTrackingDetails>> flightStreamForStats =
                batchKStream.mapValues( jsonString -> {
                    log.info("jsonString : {}",jsonString);
                    try {
                        return objectMapper.readValue(jsonString, new TypeReference<List<FlightTrackingDetails>>() {});
                    }catch (Exception e){
                        log.error("Cant convert string to FlightTrackingDetails");
                        e.printStackTrace();
                    }
                    return null;
                });*/
        KStream<String, FlightTrackingDetails> flattenedStream = flightStreamForStats.flatMapValues(
                list -> (list != null) ? list : Collections.emptyList()
        );

      /*  Sliding window computed every 30 s based oon producer publishing to topic
      KTable<Windowed<String>, FlightStats> flightStats = flattenedStream
                .groupByKey()
                .windowedBy(SlidingWindows.ofTimeDifferenceAndGrace(Duration.ofSeconds(150), Duration.ofSeconds(5)))
                .aggregate(
                        FlightStats::new,
                        (flightId, newData, agg) -> agg.update(newData),
                        Materialized.with(Serdes.String(), JsonSerdes.flightStats())
                );

       */

        //Time Window computed only once at every 150 seconds
        KTable<Windowed<String>, FlightStats> flightStats = flattenedStream
                .groupByKey()
                .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofSeconds(150)))
                .aggregate(
                        FlightStats::new,
                        (flightId, newData, agg) -> agg.update(newData),
                        Materialized.with(Serdes.String(), JsonSerdes.flightStats())
                );

        KStream<Windowed<String>, FlightStats> flightStatsStream = flightStats.toStream();
        log.info("Produced Stream -> {}", flightStatsStream);
        flightStatsStream.to("flight-window-stats", Produced.with(
                WindowedSerdes.timeWindowedSerdeFrom(String.class) , JsonSerdes.flightStats()
        ));
    }

    public void consumeFlightTrackingDetailsAndProduceFlightStats() {}
}

