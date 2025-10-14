#responsible for creating network and volume

source .env.network
source .env.volume

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    echo "Volume $VOLUME_NAME already exists"
else    
    docker volume create $VOLUME_NAME
fi

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "network $NETWORK_NAME already exists"
else    
    docker network create $NETWORK_NAME
fi