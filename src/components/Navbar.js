import React, { useState } from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import youtube from "../images/logo.png";
import Upload from './Upload';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({theme}) => theme.bgLighter};
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({theme}) => theme.text};
  cursor: pointer;
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text}; 
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    font-weight: 500; 
    cursor: pointer;
    @media (max-width: 1000px) {
      visibility: hidden;
    }
`;
const Button1 = styled.button`
  visibility: hidden;
  @media (max-width: 1000px) {
    visibility: ${({videoOpen}) => videoOpen ? 'hidden' : "visible"};
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 15px;
    background-color: transparent;
    color: #3ea6ff;
    font-weight: 500; 
    cursor: pointer;
    position: absolute;
    left: 0px;
  }
`;

const User = styled.div`
  display: flex;
  algin-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({theme}) => theme.text};
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 32px;
  height: 31px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = ({openn, setOpenn, videoOpen }) => {

  const { currUser } = useSelector(state => state.user);
  let imgg;
  if(!currUser)
  {
    imgg = youtube;
  }
  else
  {
    imgg = currUser.img;
  }
  const navigate = useNavigate();

  const [open,setOpen] = useState(false);
  const [q,setQ] = useState("");

  return (
    <>
    <Container>
      <Wrapper>
        <Button1 videoOpen={videoOpen} onClick={() => setOpenn(!openn)}>
          <DensityMediumOutlinedIcon/>
        </Button1>
        <Search>
          <Input 
            placeholder='Search' 
            onChange={(e) => setQ(e.target.value)}
          />
          <SearchOutlinedIcon 
            onClick={() => navigate(`/search?q=${q}`)} 
          />
        </Search>
        {
          currUser ? (
            <User>
              <VideoCallOutlinedIcon onClick={()=> setOpen(true)}/>
              <Avatar src={imgg}/>
              {currUser.name}
            </User>
            ) : 
            ( 
              <Link to="signin" style={{textDecoration: "none"}}>
                <Button>
                  <AccountCircleOutlinedIcon/>
                  SIGN IN
                </Button>
              </Link>
            )
        }
      </Wrapper>
    </Container>
    {open && <Upload setOpen = {setOpen}/>}
    </>
  )
}

export default Navbar