
#!/bin/bash

# Default values for host and port
DB_HOST=${DB_HOST:-0.0.0.0}
DB_PORT=${DB_PORT:-51527}

# Log file location
LOG_FILE=./derby-server.log

# Start the Derby server with logging
echo "Starting Derby server on $DB_HOST:$DB_PORT..."
java -cp ./lib/derbynet.jar org.apache.derby.drda.NetworkServerControl start -h $DB_HOST -p $DB_PORT > $LOG_FILE 2>&1

if [ $? -eq 0 ]; then
  echo "Derby server started successfully!"
else
  echo "Failed to start Derby server. Check the log at $LOG_FILE"
fi
