MONGODB_IMAGE="mongodb/mongodb-community-server"
MONGODB_TAG="7.0-ubuntu2204"
CONTAINER_NAME="mongodb"

# root credentials
ROOT_USERNAME="root-user"
ROOT_PASSWORD="root-password"

docker run -d --rm --name $CONTAINER_NAME \
-e MONGO_INITDB_ROOT_USERNAME=$ROOT_USERNAME \
-e MONGO_INITDB_ROOT_PASSWORD=$ROOT_PASSWORD \
$MONGODB_IMAGE:$MONGODB_TAG 

# The MongoDB shell can be accessed with:
#docker exec -it mongodb mongosh