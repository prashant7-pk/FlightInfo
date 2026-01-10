package com.info.service;

import com.info.model.FlightTrackingBatch;
import com.info.model.FlightTrackingDetails;
import org.springframework.stereotype.Service;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/*
    public Map<String, Deque<FlightTrackingDetails>> getFlightDataMap() {
        return flightDataMap;
    }

 */

@Service
public class FlightTrackingService {

    private final Map<String, LinkedList<FlightTrackingDetails>> flightDataMap = new HashMap<>();
    private final Random random = new Random();

    public List<FlightTrackingDetails> generate(String flightId) {
        LinkedList<FlightTrackingDetails> flightTrackingList =
                flightDataMap.computeIfAbsent(flightId, k -> new LinkedList<>());
    /*
    getLast() throw exception if list is empty. peekLast() will return null.
     */
        FlightTrackingDetails last = flightTrackingList.peekLast();
        double latitude = last != null ? getRoundValue(last.getLatitude() + 0.1) : getRoundValue(22.57);
        double longitude = last != null ? getRoundValue(last.getLongitude() + 0.2) : getRoundValue(88.36);
        double altitude = last != null
                ? getRoundValue(last.getAltitude() + Math.round(random.nextDouble() * 200 - 100))
                : 30000;
        double speed = getRoundValue(450 + Math.round(random.nextDouble() * 20));

        FlightTrackingDetails newData = new FlightTrackingDetails(
                flightId,latitude,longitude,altitude,speed, getFormattedUtcTime()
        );

        flightTrackingList.addLast(newData);
        if (flightTrackingList.size() > 7) {
            flightTrackingList.removeFirst(); // remove oldest record
        }
        return new ArrayList<>(flightTrackingList);
    }

    private String getFormattedUtcTime(){
        return ZonedDateTime.now().format(DateTimeFormatter.ISO_INSTANT);

    }

    private double getRoundValue(double value){
        return Math.round(value * 1000.0) / 1000.0;
    }

}
