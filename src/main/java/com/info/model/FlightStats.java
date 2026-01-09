package com.info.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightStats {

    private String flightId;
    private double avgSpeed;
    private double avgAltitude;
    private double maxAltitude = 0;
    private double minAltitude = 999999999;
    private String windowStart;
    private String windowEnd;
    private int count = 0;
    private Set<String> processedEventIds = new HashSet<>();

    public FlightStats update(FlightTrackingDetails detail) {
        // update averages or other stats
        String id = detail.getFlightId() + detail.getTimestamp();
        if(processedEventIds.add(id)) {

            this.count = this.count < 15 ? ++this.count : 15 ;
            this.flightId = detail.getFlightId();
            this.avgSpeed = getRoundValue(((this.avgSpeed * (this.count - 1)) + detail.getSpeed()) / this.count);
            this.avgAltitude = getRoundValue(((this.avgAltitude * (this.count - 1)) + detail.getAltitude()) / this.count);
            this.maxAltitude = getRoundValue(Math.max(this.maxAltitude, detail.getAltitude()));
            this.minAltitude = getRoundValue(Math.min(this.minAltitude, detail.getAltitude()));
            this.windowStart = getFormattedUtcTimeMinus150s();
            this.windowEnd = getFormattedUtcTime();
        }
        return this;
    }

    private double getRoundValue(double value){
        return Math.round(value * 1000.0) / 1000.0;
    }

    private String getFormattedUtcTime(){
        return ZonedDateTime.now().format(DateTimeFormatter.ISO_INSTANT);
    }

    private String getFormattedUtcTimeMinus150s(){
        return ZonedDateTime.now().minusSeconds(150).format(DateTimeFormatter.ISO_INSTANT);
    }
}
