/** @jsxImportSource @emotion/react */
import React from 'react'
import * as s from './style'
import { IoSearchOutline } from 'react-icons/io5'

export default function SearchBar() {

  return (
    <div css={s.container}>
      <div css={s.searchBar}>
        <div css={s.searchBarLine}>
        <button css={s.searchBtn}><IoSearchOutline /></button>
        <input css={s.searchInput} name = "groupTitle" type="search" placeholder='모임 이름을 입력해주세요.' />
        </div>
      </div>
        
    </div>
  )
}
