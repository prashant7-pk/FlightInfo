package com.info.model;

import lombok.Data;

@Data
public class FlightDetail {
    private String flightId;
    private String flightNumber;
    private String source;
    private String destination;
    private String airline;
    private String status;


    public FlightDetail(String flightId, String flightNumber, String source, String destination, String airline, String status) {
        this.flightId = flightId;
        this.flightNumber = flightNumber;
        this.source = source;
        this.destination = destination;
        this.airline = airline;
        this.status = status;
    }
}
