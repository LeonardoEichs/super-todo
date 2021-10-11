import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Container } from "./styles";

function Success() {
  const history = useHistory();
  const [dotsLoading, setDotsLoading] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDotsLoading((prevState) =>
        prevState.length > 2 ? "." : prevState + "."
      );
    }, 500);
    setTimeout(() => {
      clearInterval(interval);
      history.push("/login");
    }, 5000);
  }, [history]);

  return (
    <Container>
      <div className="container">
        <div className="action">
          <div className="trophy">
            <svg fill="#FFD600" width="100%" height="100%" viewBox="0 0 24 24">
              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
            </svg>
          </div>
          <h1>Success</h1>
          <h3>Redirecting to login page{dotsLoading}</h3>
        </div>
      </div>
    </Container>
  );
}

export default Success;
