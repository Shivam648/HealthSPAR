FROM openjdk:11
ADD ./target/booked-appointments-0.0.1-SNAPSHOT.jar /usr/src/booked-appointments-0.0.1-SNAPSHOT.jar
WORKDIR usr/src
ENTRYPOINT ["java","-jar", "booked-appointments-0.0.1-SNAPSHOT.jar"]
