# Hospital Management System

React + Node.js + MongoDB application deployed with Docker Swarm.

## Ports
- Frontend: 3000
- Backend: 5000
- MongoDB: internal only

## Deploy
docker stack deploy -c docker-stack.yml hospital
docker service ls
