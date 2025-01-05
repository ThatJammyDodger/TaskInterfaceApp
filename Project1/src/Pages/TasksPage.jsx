import { React, useState, useEffect } from "react";
import { API_URL, getRandomInt } from "../scripts/tasksService";
import Loading from "../Components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import Task from "../Components/Task";

export function TasksPage(props) {
  const { user, getAccessTokenSilently } = useAuth0(); // Include getAccessTokenSilently
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
    const fetchUserId = async () => {
      try {
        const token = await getAccessTokenSilently()
        const response = await fetch(API_URL("Tasks/" + user.email), {
          headers: {
            Authorization: `Bearer ${token}` // Add token to headers
          }
        });
        const data = await response.text();
        setUserId(data);
      } catch (err) {
        console.log("Error happened: " + err.message);
      }
    };

    fetchUserId();
  }, [user, getAccessTokenSilently]);

  // Fetch tasks for the user based on userId
  useEffect(() => {
    if (userId) {
      const fetchTasks = async () => {
        try {
          const response = await fetch(API_URL("Tasks/" + userId), {
            headers: {
              Authorization: `Bearer ${await getAccessTokenSilently()}` // Add token to headers
            }
          });
          const data = await response.text();
          const parsedData = JSON.parse(data);
          setUserAPI(parsedData);
          setErrorLoading(false);
        } catch (err) {
          console.log("Error happened: " + err.message);
          setErrorLoading(true);
        }
      };

      fetchTasks();
    }
  }, [userId, doRefresh, getAccessTokenSilently]);

  // Other functions (updateTask, deleteTask, addTask, saveTasks) remain unchanged
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
  };

  const addTask = () => {
    const newTask = {
      taskId: crypto.randomUUID(),
      taskName: `Empty task ${getRandomInt(10000)}`,
      details: "What would you like to do?",
      dueBy: "2024-09-28T23:00:00Z",
      isComplete: false,
    };
    setUserAPI((prev) => {
      const updatedTasks = [...prev.tasks, newTask];
      return { ...prev, tasks: updatedTasks };
    });
  };

  const saveTasks = async () => {
    fetch(API_URL("Tasks/" + userId), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessTokenSilently()}`
         // Add token to headers
      },
      body: JSON.stringify(userAPI),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(`Failed to save tasks: ${err.message}`);
        });
      }
      return response.json();
    })
    .then(updatedTasks => {
      setUserAPI(updatedTasks);
    })
    .catch(err => {
      console.error("Error updating tasks:", err);
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
        <div>
          <Button 
            variant="contained"
            onClick={addTask} // Call add task
          >
            Add Task
          </Button>
          <Button 
            variant="contained"
            onClick={saveTasks} // Call save tasks
          >
            Save all
          </Button>
        </div>
      </div>
    </>
  );
}

export default withAuthenticationRequired(TasksPage, {
  onRedirecting: () => <Loading />,
});
