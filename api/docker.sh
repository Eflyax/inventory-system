#!bin/bash

case "$1" in
	start)
		docker start mongoIS
		docker start nodeIS
		docker exec -ti nodeIS npm start
		;;
	stop)
		docker kill nodeIS
		docker kill mongoIS
		;;
	status)
		docker ps -a
		;;
	*)
		echo "Usage: $0 {start|stop|status}" >&2
		exit 1
		;;
esac
