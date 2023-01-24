import React from 'react';
import styled from 'styled-components';
import Youtube from "../images/logo.png";
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';

const Container = styled.div`
    flex: 1; 
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
    height: 100vh;
    font-size: 14px;
    position: sticky;
    top: 0;
    overflow-y: scroll;
    @media (max-width: 1000px) {
        display: ${({videoOpen}) => videoOpen ? 'none' : "flex"};
        position: ${({ openn }) => openn ? 'absolute' : 'fixed'};
        z-index: ${({ openn }) => openn === true ? -1 : 0};
        width: 30%;
        height: ${({ openn }) => openn === true ? '100vh' : '100%'};
      }
      @media (max-width: 500px) {
        position: ${({ openn }) => openn ? 'absolute' : 'fixed'};
        z-index: ${({ openn }) => openn === true ? -1 : 0};
        width: 50%;
        height: ${({ openn }) => openn === true ? '100vh' : '100%'};
      }
`;

const Wrapper = styled.div`
    padding: 18px 26px;
      
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    margin-bottom: 25px;
`;

const Img = styled.img`
    height: 25px;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    padding: 7.5px 0px;

    &:hover{
        background-color: ${({ theme }) => theme.soft};
    }
`;

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Title = styled.h2`
    font-size: 14px;
    font-weight: 500;
    color: #aaaaaa;
    margin-bottom: 20px
`;

const Login = styled.div``;
const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
`;


const Menu = ({ darkMode, setDarkMode, openn, videoOpen, setvideoOpen }) => {

    const { currUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignOut = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/signin");
    }

    return (
        <Container openn={openn} videoOpen={videoOpen} >
            <Wrapper>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Logo>
                        <Img src={Youtube} />
                        YouTube
                    </Logo>
                </Link>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <HomeIcon />
                        Home
                    </Item>
                </Link>
                <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <ExploreOutlinedIcon />
                        Explore
                    </Item>
                </Link>
                <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <SubscriptionsOutlinedIcon />
                        Subscriptions
                    </Item>
                </Link>
                <Hr />
                {
                    !currUser ?
                        <>
                            <Login>
                                Sign in to like videos, comment and subscribe.
                                <Link to="signin" style={{ textDecoration: "none" }}>
                                    <Button>
                                        <AccountCircleOutlinedIcon />
                                        SIGN IN
                                    </Button>
                                </Link>
                            </Login>
                            <Hr />
                        </> : <>
                            <Login>
                                Sign out to.
                                <Link to="signin" style={{ textDecoration: "none" }}>
                                    <Button onClick={handleSignOut}>
                                        <AccountCircleOutlinedIcon />
                                        SIGN OUT
                                    </Button>
                                </Link>
                            </Login>
                            <Hr />
                        </>
                }
                <Title>
                    Best of YouTube
                </Title>
                <Item>
                    <LibraryAddOutlinedIcon />
                    Library
                </Item>
                <Item>
                    <HistoryOutlinedIcon />
                    History
                </Item>
                <Hr />
                <Item>
                    <LibraryMusicOutlinedIcon />
                    Music
                </Item>
                <Item>
                    <EmojiEventsOutlinedIcon />
                    Sports
                </Item>
                <Item>
                    <SportsEsportsOutlinedIcon />
                    Gaming
                </Item>
                <Item>
                    <MovieOutlinedIcon />
                    Movies
                </Item>
                <Item>
                    <NewspaperOutlinedIcon />
                    News
                </Item>
                <Item>
                    <LiveTvOutlinedIcon />
                    Live
                </Item>
                <Hr />
                <Item>
                    <SettingsOutlinedIcon />
                    Settings
                </Item>
                <Item>
                    <ReportOutlinedIcon />
                    Report
                </Item>
                <Item>
                    <HelpOutlineOutlinedIcon />
                    Help
                </Item>
                <Item onClick={() => setDarkMode(!darkMode)}>
                    {
                        darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />
                    }

                    {darkMode ? "Light" : "Dark"} Mode
                </Item>
            </Wrapper>
        </Container>
    )
}

export default Menu