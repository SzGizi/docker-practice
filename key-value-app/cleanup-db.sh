# Stop and remove mongodb container
# stop and remove app container
# remove volume
# remove network

source .env.db
source .env.network
source .env.volume

if [ "$(docker ps -aq -f name=$DB_CONTAINER_NAME)" ]; then
    echo "removing container $DB_CONTAINER_NAME "
    docker kill $DB_CONTAINER_NAME
else
    echo "Container $VOLUME_NAME does not exist"
fi  

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
     echo "removing volume $VOLUME_NAME "
    docker volume rm $VOLUME_NAME
else    
    echo "Volume $VOLUME_NAME does not exist"
fi

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "removing network $NETWORK_NAME "
    docker network rm  $NETWORK_NAME
else    
    echo "network $NETWORK_NAME does not exist"
fi