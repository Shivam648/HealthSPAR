FROM openjdk:11
ADD ./target/recommend-service-0.0.1-SNAPSHOT.jar /usr/src/recommend-service-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "recommend-service-0.0.1-SNAPSHOT.jar"]
