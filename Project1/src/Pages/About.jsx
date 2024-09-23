import "./About.css"
import { useEffect } from "react"

export default function About() {
  let title = "About"
  useEffect(() => {
    document.title = title
  }, [title])
  
  return (
      <>
        <h3>About this website</h3>
      </>
  )
}