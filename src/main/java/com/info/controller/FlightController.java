package com.info.controller;

import com.info.kafka.KafkaFlightConsumer;
import com.info.kafka.KafkaFlightProducer;
import com.info.kafka.KafkaFlightStatsConsumer;
import com.info.kafka.KafkaFlightStream;
import com.info.model.FlightDetail;
import com.info.model.FlightStats;
import com.info.model.FlightTrackingResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "*")
@Slf4j
public class FlightController {

    private final KafkaFlightProducer kafkaFlightProducer;
    private final KafkaFlightStream kafkaFlightStream;
    private final KafkaFlightConsumer kafkaFlightConsumer;
    private final KafkaFlightStatsConsumer kafkaFlightStatsConsumer;

    public FlightController(KafkaFlightProducer kafkaFlightProducer, KafkaFlightStream kafkaFlightStream, KafkaFlightConsumer kafkaFlightConsumer, KafkaFlightStatsConsumer kafkaFlightStatsConsumer) {
        this.kafkaFlightProducer = kafkaFlightProducer;
        this.kafkaFlightStream = kafkaFlightStream;
        this.kafkaFlightConsumer = kafkaFlightConsumer;
        this.kafkaFlightStatsConsumer = kafkaFlightStatsConsumer;
    }

    @GetMapping("/getAllFlights")
    public List<FlightDetail> getAllFlights(){
        return Arrays.asList(
                new FlightDetail("FL001", "AI203", "Delhi", "Mumbai", "Air India", "On Time"),
                new FlightDetail("FL002", "6E452", "Bangalore", "Kolkata", "IndiGo", "Delayed"),
                new FlightDetail("FL003", "SG987", "Chennai", "Hyderabad", "SpiceJet", "Departed"),
                new FlightDetail("FL004", "UK112", "Pune", "Delhi", "Vistara", "Cancelled")
        );
    }

    ///trackFlight?flightId=FLT001
    @GetMapping("/trackFlight")
    public FlightTrackingResponse getFlightTracking(@RequestParam String flightId){
        FlightTrackingResponse flightTrackingResponse = new FlightTrackingResponse();
        flightTrackingResponse.setData(kafkaFlightConsumer.getFlightDataCache().get(flightId));
        return flightTrackingResponse;
    }


    //getflightstats?flightId=FLT001
    @GetMapping("/getflightstats")
    public FlightStats getFlightStats(@RequestParam String flightId){
        return kafkaFlightStatsConsumer.getFlightStatsMap().get(flightId);
    }



    /*
    public final RedisService redisService;

    public FlightController(RedisService redisService){
        this.redisService = redisService;
    }

    @GetMapping("/{timezone}")
    public ResponseEntity<String> checkRedis(@PathVariable String timezone){
        log.info("timezone :{}", timezone);
        log.info("Calling actual API...");
        String time = redisService.checkRedis(timezone);
        log.info("Redis /API response : "+time);
        return new ResponseEntity<>(time, HttpStatus.OK);
    }

    */

}
