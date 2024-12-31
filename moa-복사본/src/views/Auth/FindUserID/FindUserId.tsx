import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useFindUserIdStore from '../../../stores/findUserId.store';


function FindUserId() {
  const setResult = useFindUserIdStore((state) => state.setResult);
  const [formData, setFormData] = useState({
    userName: "",
    userBirthDate: "",
  }) 

  const navigator = useNavigate();

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target
    setFormData({...formData, [element.name]:element.value});
  }
  
  const handleFetchData = async() => {
    navigator("/findUserId/result");
    try {
      const resoponse = await axios.get(`http://localhost:8081/api/v1/auth/userId`,
        {
          params : {
            userName: formData.userName,
            userBirthDate: formData.userBirthDate, 
          }
        });
        setResult(resoponse.data.data);
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
      <input type="text" onChange={handleChange} name='userBirthDate' value={formData.userBirthDate} placeholder='YYYYMMDD'/>
      </form>
      <button onClick={handleFetchData}>아이디찾기</button>
    </div>
  )
}

export default FindUserId;

