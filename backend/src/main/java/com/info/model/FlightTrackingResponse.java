package com.info.model;

import lombok.Data;

import java.util.List;

@Data
public class FlightTrackingResponse {

    private List<FlightTrackingDetails> data ;
    private ErrorResponse error;
}
