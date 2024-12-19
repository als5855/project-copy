/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import * as s from './style'
import { IoSearchOutline } from 'react-icons/io5'
import { MeetingGroup } from '../../types';
import useSearchStore from '../../stores/search.store';




export default function SearchBar() {
  const setSearchResult = useSearchStore((state) => state.searchResults);
  const setGroupTitle = useSearchStore((state) => state.setGroupTitle);
  const GroupTitle = useSearchStore((state) => state.groupTitle);
  
  const handlefetchData = async(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
    if(!GroupTitle){
      alert("검색어를 입력해주세요.")
    }
    try {
      const
    }
  }
  
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
