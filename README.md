# Ventilator Management API (using NodeJS,Express,MongoDB)

## Description 
This is a very simple API, to manage the ventilators in various hospitals. It is very efficient, and reduces time in updating the details of ventilators in this time of crisis.

## Functions
1. Get all Hospitals' Details
2. Get all Ventilators' Details
3. Get Hospital Details based on Hospital Name
4. Get Ventilators' Details based on Hospital Name
5. Get Ventilators' Details based on their status(Occupied, Unoccupied, Under Maintenance)
6. Update Ventilator Info like status
7. Add a new Ventilator to the database
8. Delete an existing ventilator from the database

## Usage
As of now, there is no user interface. You can use the API using the terminal(Linux) or command prompt(Windows).
1. Download the source code to a destination folder on your local machine.
2. Open your terminal (or cmd), and go to the folder where the code resides.
3. To make sure u have nodeJS and npm installed, type the following commands 
    ```
    node -v
    npm -v
    ```
    If installed, then the version of node and npm installed on your machine is displayed, else you get "Command not found"

4. Type the following to install all the dependencies.
    ```
    npm install
    ```
5. After the dependencies are installed, type the following command.
    ```
    node index.js
    ```
6. Now you can use the API to do any of the above listed functions.

## License
[ISC](https://choosealicense.com/licenses/isc/)
