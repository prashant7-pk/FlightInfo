//package com.info.config;
//
//import lombok.extern.slf4j.Slf4j;
//import org.apache.kafka.streams.StreamsBuilder;
//import org.apache.kafka.streams.kstream.KStream;
//import org.springframework.context.annotation.Bean;
//import org.springframework.stereotype.Component;
//
//@Slf4j
//@Component
//public class KafkaConfig {
//
//    @Bean
//    public KStream<String , String> flightStream(StreamsBuilder builder){
//        log.info("Kafka Config triggered :");
//        KStream<String , String> stream = builder.stream("flight-tracking");
//        return stream;
//    }
//}
