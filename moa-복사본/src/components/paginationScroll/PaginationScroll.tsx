/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { GroupCategory, GroupTypeCategory, MeetingGroup, MeetingTypeCategory, Recommendation } from '../../types';
import * as s from './style'
import RecommendationsClick from '../recommendation/RecommendationsClick';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface PaginationScrollProps<T> {
  data: MeetingGroup[];
}

const PaginationScroll = <T extends {
    groupId: number;
    groupTitle: string;
    groupAddress: string;
    groupImage: string;
    groupDate: string;
    groupType: GroupTypeCategory;
}>({ data }:PaginationScrollProps<T>) => {
  
  const [likedGroups, setLikedGroups] = useState<number[]>([]);
  const [cookies] = useCookies(["token"]);
  
  const toggleLike = (groupId: number) => {
    setLikedGroups((prev) => 
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]);
  }
  
  const handleFetchData = async (groupId: number) => {
    if (!cookies.token) {
      alert("로그인 후 사용가능합니다.");
      return;
    }
    if (cookies.token) {
      try {
        if (!likedGroups.includes(groupId)) {
          await axios.post<Recommendation>(
            `http://localhost:8081/api/v1/recommendation`,
            { groupId },
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
              withCredentials: true,
            }
          );

        } else {
          await axios.delete(
            `http://localhost:8081/api/v1/recommendation/user-id`,
            {
              data: { groupId: groupId },
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
              withCredentials: true,
            }
          );
        }
        toggleLike(groupId);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <ul css={s.categoryList}>
      {data.map((result) => (
        <li css={s.groupLi} key={result.groupId}>
          <div><img src={result.groupImage} alt={result.groupImage} /></div>
          <div css={s.line}></div>
          <div css={s.listDetail}>
            <p css={s.content}>{result.groupTitle}</p>
            <p css={s.content}>
              <button css={s.click} onClick={() => handleFetchData(result.groupId)}>
                {likedGroups.includes(result.groupId) ? <BsHeartFill style={{ color: "red" }} /> : <BsHeart />}
              </button>
            </p>
          </div>
          <div css={s.listDetail}>
          <p>{result.groupDate}</p>
          <p>{result.groupAddress}</p>
          <p>{result.groupType}</p>
          </div>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default PaginationScroll