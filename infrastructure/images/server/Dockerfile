# infrastructure/images/server/Dockerfile
FROM python:3.8

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Set the working directory
WORKDIR /app

# Install the dependencies
COPY /src/containers/goteamgo-server/requirements.txt .
RUN pip install -r requirements.txt

# Copy the current directory contents into the container
COPY /src/containers/goteamgo-server .

# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["flask", "run"]
