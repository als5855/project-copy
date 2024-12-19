import React from 'react'
import { BsHeart } from 'react-icons/bs';
import useSearchStore from '../../stores/search.store';

function SearchList() {
  const results = useSearchStore((state) => state.results);
  const isResults = useSearchStore((state) => state.isResults);
  const loading = useSearchStore((state) => state.loading);
  const groupCategory = useSearchStore((state) => state.groupCategory)
  const region = useSearchStore((state) => state.region);

  return (
    <>
    <div>
    <h3>카테고리 검색결과</h3>
      <ul>
      <li>{groupCategory}</li>
      <li>|</li>
      <li>{region}</li>
      </ul> 
      { loading ? (
        <p>검색중....</p>
      ) : isResults === null ? null : isResults === false ? (
        <p>검색결과가 없습니다.</p>
      ) : (
      <ul>
        {results.map((result) => (
          <li key={result.groupId}>
            <div>{result.groupImage}</div>
            <p>{result.groupTitle}</p>
            <p>{result.groupAddress}</p>
            <div>
              <BsHeart />
            </div>
          </li>
        ))}
      </ul>
      )}
    </div>
    </>
  )
}

export default SearchList