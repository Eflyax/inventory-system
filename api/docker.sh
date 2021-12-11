#!bin/bash

case "$1" in
	start)
		docker start mongo
		docker start nodeApi
		docker exec -ti nodeApi npm start
		;;
	stop)
		docker kill nodeApi
		docker kill mongo
		;;
	status)
		docker ps -a
		;;
	*)
		echo "Usage: $0 {start|stop|status}" >&2
		exit 1
		;;
esac
