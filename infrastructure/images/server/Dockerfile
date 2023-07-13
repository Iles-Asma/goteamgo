FROM python:3.8

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

RUN apt-get update 
RUN apt-get install -y curl unzip postgresql-client 
    # curl -o /tmp/sonar-scanner-cli.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.6.2.2472-linux.zip && \
    # unzip /tmp/sonar-scanner-cli.zip -d /opt && \
    # ln -s /opt/sonar-scanner-4.6.2.2472-linux/bin/sonar-scanner /usr/local/bin/sonar-scanner && \
    # rm /tmp/sonar-scanner-cli.zip

# Set the working directory
WORKDIR /app

# Install the dependencies
COPY /src/containers/goteamgo-server/requirements.txt .
RUN pip install -r requirements.txt
RUN pip install PyJWT
RUN pip install -U flask-cors
RUN pip install Flask-Migrate

# Copy the current directory contents into the container
COPY /src/containers/goteamgo-server .

# Copy wait-for-postgres script
COPY /src/containers/goteamgo-server/postgres.sh .

# Make the script executable
RUN chmod +x /app/postgres.sh

#RUN /app/run_sonarqube_analysis.sh

# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["/app/postgres.sh", "goteamgo-db", "flask", "run"]
#CMD ["flask", "run"]