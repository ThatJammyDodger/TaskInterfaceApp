import { React, useState, useEffect } from "react";
import { API_URL } from "../scripts/tasksService";
import Loading from "../Components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

export function TasksPage(props) {
  const { user, isAuthenticated } = useAuth0();
  let title = "Your tasks"
  useEffect(() => {
    document.title = title
  }, [title])

  const [ userAPI, setUserAPI ] = useState([]);
  const [ userId, setUserId ] = useState();
  useEffect(() => {
    fetch(API_URL("Tasks/" + user.email))
    .then((response) => response.text())
    .then((data) => {
      console.log(data)
      setUserId(data)
    })
    .catch((err) => {
      console.log("Error happened: " + err.message);
    });
  }, [ user ]);

  return (
      <>
        <div>
          <h3>Here are your tasks, {user.nickname}</h3>
          <div>
              <ul>
                  <li>Example task</li>
              </ul>
          </div>
        </div>
      </>
  )
}

export default withAuthenticationRequired(TasksPage, {
    onRedirecting: () => <Loading />,
  });