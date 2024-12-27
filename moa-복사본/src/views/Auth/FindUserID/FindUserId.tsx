import React, { useState } from 'react'
import { User } from '../../../types'
import axios from 'axios';
import { error } from 'console';
import { editableInputTypes } from '@testing-library/user-event/dist/utils';

interface FindUser {
  userName: string,
  userBirthDate: Date,
  userId: string
}

function FindUserId() {
  const [result, setResult] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    userName: "장지민",
    userBirthDate: "1996-03-08",
  }) 

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target
    setFormData({...formData, [element.name]:element.value});
  }
  
  const handleFetchData = async() => {
    console.log(formData.userName);
    console.log(formData.userBirthDate);
    try {
      const resoponse = await axios.get(`http://localhost:8081/api/v1/auth/userId`,
        {
          params : {
            userName: formData.userName,
            userBirthDate: formData.userBirthDate, 
          }
        });
      setResult(resoponse.data.data);
      console.log(resoponse.data.data);
    } catch (error){
      console.error('데이터 로딩중 오류: ', error);
    }
  } 


  return (
    <div>
      <h4>아이디 찾기</h4>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="userName">이름</label>
      <input type="text" onChange={handleChange} name='userName' value={formData.userName} placeholder='이름을 입력해주세요.'/>
      <label htmlFor="birthDate">생년월일</label>
      <input type="text" onChange={handleChange} name='userBirthDate' value={formData.userBirthDate} placeholder='YYYY-MM-DD'/>
      </form>
      <button onClick={handleFetchData}>아이디찾기</button>

      <p onChange={handleChange}>{result?.userId}</p>
    </div>
  )
}

export default FindUserId