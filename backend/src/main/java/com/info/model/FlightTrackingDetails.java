package com.info.model;

import lombok.Data;

@Data
public class FlightTrackingDetails {
    private String flightId;
    private double latitude;
    private double longitude;
    private double altitude;
    private double speed;
    private String timestamp;

    public FlightTrackingDetails() {
    }

    public FlightTrackingDetails(String flightId, double latitude, double longitude, double altitude, double speed, String timestamp) {
        this.flightId = flightId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.speed = speed;
        this.timestamp = timestamp;
    }
}
