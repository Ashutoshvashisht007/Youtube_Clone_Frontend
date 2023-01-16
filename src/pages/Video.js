import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import Comments from '../components/Comments';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from 'timeago.js';
import { subscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div`
  
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({theme}) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({theme}) => theme.textSoft}; 
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;
  color: ${({theme}) => theme.text};
`;

const Button = styled.div`
  display: flex;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 10px 0px;
  border: 0.5px solid  ${({theme}) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({theme}) => theme.textSoft};
  font-size: 13px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const Subscribed = styled.button`
  background-color: grey;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  objectfit: cover;
`;


const Video = () => {
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel,setChannel] = useState({});
  const [view,setView] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        const rep = await axios.put(`/videos/view/${path}`);
        setView(rep.data);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  const { currUser } = useSelector((state) => state.user);

  const handleLike = async ()=> {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currUser._id));
  }
  const handleDislike = async ()=> {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currUser._id));
  }

  const handleSub = async () => {
    currUser.subscribedUsers.includes(channel._id) ? await axios.put(`/users/unsub/${channel._id}`) : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  }

  return <Container>
    <Content>
      <VideoWrapper>
        <VideoFrame src={currentVideo.videoUrl} controls />
      </VideoWrapper>
      <Title>{currentVideo.title}</Title>
      <Details>
        <Info>
          {view} views • {format(currentVideo.createdAt)}
        </Info>
        <Buttons>
          <Button onClick={handleLike}>
            {currentVideo.likes?.includes(currUser._id) ? <ThumbUpIcon/> : <ThumbUpOutlinedIcon/> } {currentVideo.likes?.length}
          </Button>
          <Button onClick={handleDislike}>
          {currentVideo.dislikes?.includes(currUser._id) ? <ThumbDownIcon/> : <ThumbDownOutlinedIcon/> } Dislike
          </Button>
          <Button>
            <ReplyOutlinedIcon/> Share
          </Button>
          <Button>
            <AddTaskOutlinedIcon/> Save
          </Button>
        </Buttons>
      </Details>
      <Hr/>
      <Channel>
        <ChannelInfo>
          <Image src={channel.img}/>
          <ChannelDetail>
            <ChannelName>{channel.name}</ChannelName>
            <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
            <Description>{currentVideo.description}</Description>
          </ChannelDetail>
        </ChannelInfo>
        {
          currUser.subscribedUsers?.includes(channel._id) ?
          <Subscribed onClick={handleSub}>
           SUBSCRIBED
          </Subscribed> :
          <Subscribe onClick={handleSub}>
          SUBSCRIBE
         </Subscribe> 
        }
      </Channel>
      <Hr/>
      <Comments videoId={currentVideo._id} />
    </Content>
    <Recommendation tags={currentVideo.tags} />
  </Container>
}

export default Video;