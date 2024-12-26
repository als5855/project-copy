/** @jsxImportSource @emotion/react */
import * as s from './style'
import React, { useEffect, useState } from 'react'
import useRecomendationStore from '../../stores/recomendation.store';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Recommendation, RecommendationsId } from '../../types';

const RecommendationsClick = () => {
  const isLike = useRecomendationStore((state) => state.isLike);
  const setIsLike = useRecomendationStore((state) => state.setIsLike);
  const recommendation = useState<Recommendation[]>([]);
  const recommendationsId = useState<RecommendationsId>({
    groupId: 0,
    userId: ''
  })
  const [cookies] = useCookies(["token"]);
  
  const handleHeart = (e:React.MouseEvent<HTMLButtonElement>) => {
    setIsLike(); 
    fetchData();
  }


  const fetchData = async() => {
    if(cookies.token){
      try{
        if(isLike === false) {
          const response = await axios.post(`http://localhost:8081/api/v1/recommendation`, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          });
          const responseData = response.data.data;

        } else {
          const response = await axios.delete(`http://localhost:8081/api/v1/recommendation/user-id`, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          });

          const responseData = response.data.data;
        }
        
        
      } catch(error) {
        console.error(error);
      }
    }
  } 


  return (
    <div >
      <button onClick={handleHeart} css={s.click}>
      { isLike ? <BsHeartFill /> : <BsHeart />}</button>
    </div>
  )
}

export default RecommendationsClick