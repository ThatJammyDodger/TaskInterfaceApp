import "./About.css"
import { useEffect } from "react"

export default function About() {
  let title = "About"
  useEffect(() => {
    document.title = title
  }, [title])

  const exampleTasks = [
    "Replying to important emails",
    "Shopping for specific items",
    "Doing the admin stuff you never feel like doing",
    "And so much more!"
  ]

  return (
      <>
        <h3>About this website</h3>
        <p>This site is designed to help you out with remembering your everyday, non-routine, tasks which can include stuff like: </p>
        <ul>
          {exampleTasks.map((task, index) => {
            return <li key={index}>{task}</li>
          })}
        </ul>
      </>
  )
}