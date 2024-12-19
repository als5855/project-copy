import React, { useCallback, useEffect, useState } from 'react'
import { GroupCategory, MeetingGroup, Region } from '../types';
import axios from 'axios';

interface ResultHobbyRegionCateogry {
  groupCategory: string;
  region: string;
  results: MeetingGroup[];
  isCategory: boolean;
  isRegion: boolean;
  isCategoryBtn: Record<string, boolean>;
  isRegionBtn: Record<string, boolean>;

  bind: [
    {
    groupCategory: string;
    isCategory: boolean;
    onClick: (
      e: React.MouseEvent<HTMLButtonElement>
    ) => void;
  },
  {
    region: string;
    isRegion: boolean;
    onClick: (
      e: React.MouseEvent<HTMLButtonElement>
    ) => void;
  },
  {
    groupCategory: string;
    style: (
      button: string
    ) => void
  },
  {
    region: string;
    style: (
      button: string
    ) => void
  }
]

}

function HobbyRegionCategoryHook(initialValue: string): ResultHobbyRegionCateogry {
  const [groupCategory, setGroupCategory] = useState<string>(initialValue);
  const [region, setRegionCategory] = useState<string>(initialValue);
  const [results, setResults] = useState<MeetingGroup[]>([]);
  const [isCategory, setCategory] = useState<boolean>(false);
  const [isRegion, setRegion] = useState<boolean>(false);
  const [isCategoryBtn, setCateogryBtn] = useState<Record<string, boolean>>({
    "취미" : false,
    "문화_예술" : false,
    "스포츠_운동": false,
    "푸드_맛집": false,
    "자기계발": false,
    "여행": false,
    "연애": false,
    "힐링": false
  });
  const [isRegionBtn, setRegionBtn] = useState<Record<string, boolean>>({
    "서울" : false, 
    "인천" : false,
    "대전" : false,
    "광주" : false,
    "세종" : false,
    "울산" : false,
    "부산" : false,
    "대구" : false,
    "경기" : false,
    "충북" : false,
    "충남" : false,
    "강원" : false,
    "전북" : false,
    "전남" : false,
    "경북" : false,
    "경남" : false,
    "제주" : false
  });

  const handleHobbyFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectCategory = e.currentTarget.value as GroupCategory
    setGroupCategory(selectCategory);
    setCategory(prev => !prev);
    console.log(isCategory);
  };

  const handleResionFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectCategory = e.currentTarget.value as Region
    setRegionCategory(selectCategory);
    setRegion(prev => !prev);
    console.log(isRegion);
  };

  const categoryButtonStyle = (button: string) => ({
        backgroundColor: groupCategory === button ? "red" : ""
  });

  const regionButtonStyle = (button:string) => ({

      backgroundColor: region === button ? "red" : "", 
  });

  const fetchCategoryData = useCallback(async (groupCategory: string, region: string) => {

    if(isCategoryBtn && isRegionBtn){
    try {
      const response = await axios.get(
        `http://localhost:8081/api/v1/auth/meeting-group/groupCategory`,
        { params: { groupCategory, region } }
      );

      const categoryData = response.data.data;

      setResults(categoryData);
      console.log(categoryData);
      console.log("관련모임 출력");
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
    } 
  }, [isCategoryBtn, isRegionBtn]);

  useEffect(() => {
    fetchCategoryData(groupCategory, region);
  }, [groupCategory, region]);
  
  return {
    results,
    groupCategory,
    region,
    isCategory,
    isRegion,
    isCategoryBtn,
    isRegionBtn,
    bind: [
      {
        groupCategory,
        isCategory,
        onClick:handleHobbyFilterClick
      },
      {
        region,
        isRegion,
        onClick:handleResionFilterClick
      },
      {
        groupCategory,
        style:categoryButtonStyle
      },
      {
        region,
        style:regionButtonStyle
      }
  ]
  }
}

export default HobbyRegionCategoryHook