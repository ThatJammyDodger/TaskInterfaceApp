import { React, useState, useEffect } from "react";
import { API_URL, getRandomInt } from "../scripts/tasksService";
import Loading from "../Components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import Task from "../Components/Task";
import { Button } from "@mui/material"

export function TasksPage(props) {
  const { user } = useAuth0();
  const title = "Your tasks";

  useEffect(() => {
    document.title = title;
  }, [title]);

  const [userAPI, setUserAPI] = useState({ tasks: [] });
  const [userId, setUserId] = useState();
  const [errorLoading, setErrorLoading] = useState(true);
  const [doRefresh, setDoRefresh] = useState(false);

  // Fetch user ID from the API
  useEffect(() => {
    fetch(API_URL("Tasks/" + user.email))
      .then((response) => response.text())
      .then((data) => {
        setUserId(data);
      })
      .catch((err) => {
        console.log("Error happened: " + err.message);
      });
  }, [user]);

  // Fetch tasks for the user based on userId
  useEffect(() => {
    if (userId) {
      fetch(API_URL("Tasks/" + userId))
        .then((response) => response.text())
        .then((data) => {
          const parsedData = JSON.parse(data);
          setUserAPI(parsedData);
          setErrorLoading(false);
        })
        .catch((err) => {
          console.log("Error happened: " + err.message);
          setErrorLoading(true);
        });
    }
  }, [userId, doRefresh]);

  // Update a specific task
  const updateTask = (updatedTask) => {
    setUserAPI((prev) => {
      const updatedTasks = prev.tasks.map((task) =>
        task.taskId === updatedTask.taskId ? updatedTask : task
      );
      return { ...prev, tasks: updatedTasks };
    });
  };

  const deleteTask = (taskId) => {
    setUserAPI((prev) => {
      const updatedTasks = prev.tasks.filter((task) => task.taskId !== taskId);
      return { ...prev, tasks: updatedTasks };
    });
  }

  const addTask = () => {
    const newTask = {
      taskId: crypto.randomUUID(),
      taskName: `Empty task ${getRandomInt(10000)}`,
      details: "What would you like to do?",
      dueBy: "2024-09-28T23:00:00Z",
      isComplete: false,
    };
  
    setUserAPI((prev) => {
      const updatedTasks = [...prev.tasks, newTask]; // Spread operator to create a new array
      return { ...prev, tasks: updatedTasks };
    });
  };
  
  

  return (
    <>
      <p>{JSON.stringify(userAPI)}</p>
      <div>
        <h3>Here are your tasks, {user.nickname}</h3>
        <div>
          {errorLoading || (!userAPI || !userAPI.tasks) ? (
            <p>
              <em>Loading...</em>
            </p>
          ) : (
            userAPI.tasks.map((t) => (
              <Task key={t.taskId} task={t} setTask={updateTask} deleteTask={deleteTask}/>
            ))
          )}
        </div>
        <Button 
        variant="contained"
        onClick={() => addTask()} // Call add task
      >
        Add Task
      </Button>
      </div>
    </>
  );
}

export default withAuthenticationRequired(TasksPage, {
  onRedirecting: () => <Loading />,
});
