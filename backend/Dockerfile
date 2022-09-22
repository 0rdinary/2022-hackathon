FROM openjdk:18
ARG JAR_FILE=.jar
COPY build/libs/daeily-*-SNAPSHOT.jar app.jar
COPY build/libs/daeily-firebase-adminsdk.json daeily-firebase-adminsdk.json
ENTRYPOINT ["java","-jar","app.jar"]