# VSF - API facade

## Requirements
- Docker engine https://docs.docker.com/engine/install/
- Docker compose https://docs.docker.com/compose/install/

## Installation (using docker)
```bash
$ cp .env.sample .env # copy env file
$ cd .docker
$ docker-compose --env-file ../.env up -d
$ cd ..
$ ./docker.sh start # start as usual
```

### Init demo data
Go to http://0.0.0.0:5000/init in browser

## Start / stop
For managing app state you can use script `docker.sh`:

- `./docker.sh start` - start API with MongoDB + start nodemon watching source code files
- ` ./docker.sh stop` - stop API with MongoDB

## Docker useful commands
```bash
# List all containers
$ docker ps -a # (this project use containers: `mongo`, `nodeApi`)

# Container management
$ docker start <container_name>
$ docker stop <container_name>
$ docker restart <container_name>

# Access container bash
$ docker exec -ti <container_name> bash

# Container rebuild
$ docker-compose up <container_name>
```
