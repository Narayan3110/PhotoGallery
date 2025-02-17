FROM maven:3.8.4-openjdk-17 AS build

# Set working directory inside the container
WORKDIR /app

# Copy the pom.xml first to download dependencies separately for caching
COPY pom.xml .

# Go offline to download dependencies
RUN mvn dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Package the application and skip tests
RUN mvn clean package -DskipTests

# Second stage: use openjdk to run the application
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/target/gallery-0.0.1-SNAPSHOT.jar /app/gallery-0.0.1-SNAPSHOT.jar

# Expose port 9090 for the application
EXPOSE 9090

# Set entrypoint for the container
ENTRYPOINT ["java", "-jar", "/app/gallery-0.0.1-SNAPSHOT.jar"]
