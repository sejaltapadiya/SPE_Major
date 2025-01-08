# Use a Java runtime as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built jar file into the container
COPY target/security-0.0.1-SNAPSHOT.jar /app/security-0.0.1-SNAPSHOT.jar

# Expose the port your Spring Boot app runs on
EXPOSE 9595

# Command to run the jar file
ENTRYPOINT ["java", "-jar", "/app/security-0.0.1-SNAPSHOT.jar"]
