FROM openjdk:18
ARG JAR_FILE=*.jar
COPY build/libs/daeily-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]