import styled from "styled-components";

export const Container = styled.div`
  padding: 0;
  margin: 0;
  background-color: #00c8b3;

  @keyframes trophy {
    0% {
      transform: translateY(500px);
      opacity: 0;
    }
    35% {
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  .container {
    position: relative;
    width: 95vw;
    height: 88vh;
  }

  .trophy {
    z-index: 1;
    background-color: #fff;
    height: 100%;
    width: 100%;
    border-radius: 100%;
    animation: trophy 0.5s 1 forwards;
  }

  .action {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 300px;
    height: 25vw;
    max-width: 300px;
    width: 25vw;
  }
`;
