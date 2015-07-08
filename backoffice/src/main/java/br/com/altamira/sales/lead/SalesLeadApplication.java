package br.com.altamira.sales.lead;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.MimeMappings;
import org.springframework.cloud.aws.core.env.ResourceIdResolver;
import org.springframework.cloud.aws.messaging.core.QueueMessagingTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

import com.amazonaws.services.sqs.AmazonSQS;

@SpringBootApplication
@EnableWebSocket
public class SalesLeadApplication {

    public static void main(String[] args) {
        SpringApplication.run(SalesLeadApplication.class, args);
    }

    /*@Override
    public void customize(ConfigurableEmbeddedServletContainer container) {
        MimeMappings mappings = new MimeMappings(MimeMappings.DEFAULT);
        mappings.add("html", "text/html;charset=utf-8");
        container.setMimeMappings(mappings);
    }*/
    
    @Bean
    public QueueMessagingTemplate queueMessagingTemplate(AmazonSQS amazonSqs, ResourceIdResolver resourceIdResolver) {
    	amazonSqs.setEndpoint("sqs.sa-east-1.amazonaws.com");
        return new QueueMessagingTemplate(amazonSqs, resourceIdResolver);
    }
}
