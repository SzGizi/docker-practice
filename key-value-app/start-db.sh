MONGODB_IMAGE="mongodb/mongodb-community-server"
MONGODB_TAG="7.0-ubuntu2204"
source .env.db

# root credentials
ROOT_USERNAME="root-user"
ROOT_PASSWORD="root-password"


#connectivity
source .env.network
LOCALHOST_PORT=27017
CONTAINER_PORT=27017

#docker network create key-value-net

#storage
source .env.volume
VOLUME_CONTAINER_PATH="/data/db"
#docker volume create key-value-data

source setup.sh

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
    echo "Container $DB_CONTAINER_NAME already exists"
    echo "The container will be removd when stopped"
    echo "To stop the container, run: docker kill $DB_CONTAINER_NAME"
    exit 1
fi    
docker run -d --rm --name $DB_CONTAINER_NAME \
-e MONGO_INITDB_ROOT_USERNAME=$ROOT_USERNAME \
-e MONGO_INITDB_ROOT_PASSWORD=$ROOT_PASSWORD \
-e KEY_VALUE_DB=$KEY_VALUE_DB \
-e KEY_VALUE_USER=$KEY_VALUE_USER \
-e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
-p $LOCALHOST_PORT:$CONTAINER_PORT \
-v $VOLUME_NAME:$VOLUME_CONTAINER_PATH \
-v ./db-config/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
--network $NETWORK_NAME \
$MONGODB_IMAGE:$MONGODB_TAG 


# The MongoDB shell can be accessed with:
#docker exec -it mongodb mongosh

#docker run --rm --name debugsh -it --network key-value-net mongodb/mongodb-community-server:7.0-ubuntu2204 mongosh mongodb://key-value-user:key-value-password@mongodb/key-value-db
#show collections 