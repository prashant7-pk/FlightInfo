package com.info.helper;

import com.info.model.FlightStats;
import com.info.model.FlightTrackingBatch;
import com.info.model.FlightTrackingDetails;
import org.apache.kafka.common.serialization.Serde;
import org.springframework.kafka.support.serializer.JsonSerde;

public class JsonSerdes{

    public static Serde<FlightTrackingBatch> flightTrackingBatch() {
        return new JsonSerde<>(FlightTrackingBatch.class);
    }

    public static Serde<FlightTrackingDetails> flightTrackingDetail() {
        return new JsonSerde<>(FlightTrackingDetails.class);
    }

    public static Serde<FlightStats> flightStats() {
        return new JsonSerde<>(FlightStats.class);
    }


}
