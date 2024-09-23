import { React, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import './ProfilePage.css'

import Loading from "../Components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export function ProfilePage() {
  const { user } = useAuth0();
  let title = "Profile"
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <Container className="mb-5 profile">
      <h3>Your profile, {user.nickname}</h3>
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0" style={{borderRadius: "50%"}}/>
        </Col>
        <Col md>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <p>{JSON.stringify(user, null, 2)}</p>
      </Row>
    </Container>
  );
}

export default withAuthenticationRequired(ProfilePage, {
  onRedirecting: () => <Loading />,
});
