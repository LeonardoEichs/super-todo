import styled from "styled-components";

interface UserImgProps {
  imgObj: string;
  height: number;
  width: number;
}

export const Container = styled.div``;

export const UserImg = styled.div<UserImgProps>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-clip: padding-box;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.imgObj});
`;
