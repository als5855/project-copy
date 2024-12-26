import React, { useEffect, useState } from 'react'
import { User } from '../../types';
import axios from 'axios';
import { Cookies, useCookies } from 'react-cookie';
import userAuthStore from '../../stores/auth.store';
import { useNavigate } from 'react-router-dom';


function GetUserInfo() {
  const {userId, isAuthenticated} = userAuthStore();
  const [cookies, setCookies] = useCookies(['token']);
  const [userInfo, setUserInfo] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);

  const navigator = useNavigate();

  const fetchData = async () => {
    if (!cookies.token) {
      navigator("/signIn");
      return;
    }
  
    setLoading(true); // 쿠키가 있을 경우에만 로딩 시작
    try {
      const response = await axios.get(`http://localhost:8081/api/v1/users/user-id`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
        withCredentials: true,
      });
      const userData = response.data.data;
      setUserInfo(userData);
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  return (
    <div>
      <h4>마이페이지</h4>
        {loading 
        ? <p>Loading......</p>
        :
        <ul>
        <li>
          <ul>
            <li>아이디</li>
            <li>{userInfo?.userId}</li>
          </ul>
          <ul>
            <li>이름</li>
            <li><input type="text" placeholder={userInfo?.userName}/></li>
          </ul>
          <ul>
            <li>닉네임</li>
            <li><input type="text" placeholder={userInfo?.nickName} /></li>
          </ul>
          <ul>
            <li>주소</li>
            <li>
              <select name="" id="">
                <option>{userInfo?.region}</option>
              {["서울", "인천", "대전", "광주", "세종", "울산", "부산", "대구", "경기", "충북", "충남", "강원", "전북", "전남", "경북", "경남", "제주"].map(
                (region) =>(
                  <option value={region}>{region}</option>
                ))}
              </select>
            </li>
          </ul>
          <ul>
            <li>성별</li>
            <li><input type="text" />{userInfo?.userGender}</li>
          </ul>
        </li>
        <li>
          <ul>
            <li>선호 카테고리</li>
            <li>{userInfo?.hobbies}</li>
          </ul>
        </li>
        <li>
          <ul>
          <img src={userInfo?.profileImage} alt="" />
          <input type="file" />
          </ul>
        </li>
        <li>
          <ul>
            <li><button>수정</button></li>
            <li><button>취소</button></li>
          </ul>
        </li>
      </ul>
      }
    </div>
  )
}

export default GetUserInfo