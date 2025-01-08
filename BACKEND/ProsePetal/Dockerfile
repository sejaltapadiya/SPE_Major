# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file from the target directory
COPY target/risk-assessment-0.0.1-SNAPSHOT.jar /app/risk-assessment-0.0.1-SNAPSHOT.jar

# Expose the port your Spring Boot app runs on
EXPOSE 9192

# Run the application
CMD ["java", "-jar", "/app/risk-assessment-0.0.1-SNAPSHOT.jar"]
