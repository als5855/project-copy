/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FindUserId from './FindUserId'
import FindUserIdProps from './FindUserIdProps'
import useFindUserIdStore from '../../../stores/findUserId.store';

function index() {
  const result = useFindUserIdStore((state) => state.result);
  return (
    <div>
    <Routes>
    <Route path="/" element={<FindUserId />} />
    <Route path="/result" element={<FindUserIdProps result={result}/>} />
    </Routes>  
    </div>
  )
}

export default index