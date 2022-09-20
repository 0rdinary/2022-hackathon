FROM openjdk:18
ARG JAR_FILE=*.jar
COPY build/libs/daeily-*-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]