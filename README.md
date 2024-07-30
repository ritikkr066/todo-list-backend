# Guidance to Run the "To-Do-List" Project

In the project directory, there is two folder one for backend and one for front

* backend : run the project with commmand "node server.js" which will run with url 'http://localhost:3001'

* **todo-list : this is frontend with which has consume the API and run this project with commands:**
* installation: npm i
* run project: 'npm start' which will run with url 

## Screenshot of the task

'https://drive.google.com/file/d/1Kd6Y9Vb5kGewk1YRV0semLTi8BYsIZBW/view?usp=drivesdk'
   


## Overview 

    addTask : user to add new tasks and it's description

    updateTask : Allow user to edit the existing task

    status: provide status of existing task i.e it is COMPLETED or PENDING

    delete : User can delete the existing task

    filter : Allow user to filter the task on the basis of TITLES.

    timeStamp: provide last updated timeStamp

### Components

# Frontend

    App/HomePage : Main component that manages state and renders other components.

    TaskForm :  Handles the creation of new tasks.

    Task :   Represents the task with options to edit, delete, and current status of task.

   #  Styling 
         Tailwind CSS

# Backend

    GET /tasks : Fetch all tasks.
    POST /tasks : Create a new task.
    PATCH /tasks/:id   : Update an existing task.
    DELETE /tasks/:id  : Delete a task.

  # data Storage
        Uses a JSON file(tasks.json) to store tasks.
    









