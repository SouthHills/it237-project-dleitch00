# Employee Management System
describe project
## Prerequisites
Please ensure you have the following installed before following the steps, or else it will not run
### Linux 
1. docker
2. docker compose
3. docker buildx
4. git

### Windows 
1. docker desktop
2. git

## How to install 

### Linux
1. open a terminal in the location you wish to have this project, and clone the repository with git\
`git clone https://github.com/SouthHills/it237-project-dleitch00.git`
2. cd into the directory `cd ./it237-project-dleitch00/`
3. change the contents of the example.env file with a good password `nano example.env`
4. rename the example.env file to .env `mv example.env .env`
5. run the command `docker compose up` and wait until you see `server | data source has been initialized`
6. open a browser and navigate to `localhost:8080`
7. here you will click `register user` 
8. enter 1 into `id` if you wish to be an admin who can see everything, with the username `admin` then make a password.
> [!NOTE]
> enter 2 into `id` if you wish to be a regular user who can see only the plant assigned to them\
with the username `nonadmin`
9. Go back to the login page and enter your username and password




### Windows 



to close the docker containers use `docker compose down`
> [!IMPORTANT]
> Any changes you made will persist even after shutting down. if you wish to reset everything back to when you\
downloaded the project, use `docker compose down -v`



## PLanned Features
EXAMPLE 
- [ ] https://github.com/SouthHills/it237-project-dleitch00/issues/9

