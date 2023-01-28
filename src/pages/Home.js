import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Card from '../components/Card';
import axios from "axios";
import { useLocation } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Home = ({ type, videoOpen, setvideoOpen }) => {

  const [videos,setVideos] = useState([]);
  const location = useLocation();

    useEffect(() => {
      if(location.pathname === "/")
      {
        setvideoOpen(false);
      }
    },[location.pathname,]);

    useEffect(()=> {
      const fetchVideos = async ()=>{
        // By using axios, we can send request to the API
        const res = await axios.get(`/api/videos/${type}`);
        setVideos(res.data);
        
      }
      fetchVideos();
    },[type]);

  return (
    <Container>
        {videos.map((video) => (
            <Card key={video._id} video={video} videoOpen={videoOpen} setvideoOpen={setvideoOpen} />
          ))}
    </Container>
  )
}

export default Home;