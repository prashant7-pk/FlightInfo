package com.info.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class TopicCreationForKStream {

    @Bean
    public NewTopic flightWindowStatsTopic() {
        return TopicBuilder.name("flight-window-stats")
                .partitions(3)
                .replicas(1)
                .build();
    }

}
