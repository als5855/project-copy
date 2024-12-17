import React from 'react'
import { IoHeartOutline } from 'react-icons/io5'

function GroupList() {
  return (
    <div>
      <h3>"{}"모임 검색 결과 입니다.</h3>
      <ul>
        <li>image</li>
        <li>title</li>
        <li><IoHeartOutline /></li>
        <li>region</li>
      </ul>
    </div>
  )
}

export default GroupList