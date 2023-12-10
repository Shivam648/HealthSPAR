FROM openjdk:11
ADD ./target/payment-gateway-0.0.1-SNAPSHOT.jar /usr/src/payment-gateway-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "payment-gateway-0.0.1-SNAPSHOT.jar"]
