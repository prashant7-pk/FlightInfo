package com.info.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class RedisService {

   /* @Cacheable(value="time",key="'timezone'")
    public String checkRedis(String timezone){
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = null;
        try {
             response = restTemplate.exchange("http://worldclockapi.com/api/json/ut/now",
                    HttpMethod.GET, null, String.class);
            log.info(response.getBody());
        }catch (Exception e) {
            log.info("Rest error: {}", e.getMessage());
        }
        if (response != null) {
            return response.getBody();
        }
        return "No time";
    }

    */
}
