/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import * as s from "./style";
import { IoSearchOutline } from "react-icons/io5";
import useSearchStore from "../../stores/search.store";
import axios from "axios";

export default function SearchBar() {
  const setSearchResults = useSearchStore((state) => state.setSearchResults);
  const setKeyword = useSearchStore((state) => state.setKeyword);
  const setSearchLoading = useSearchStore((state) => state.setSearchLoading);
  const keyword = useSearchStore((state) => state.keyword);
  const setSearchKeyword = useSearchStore((state) => state.setSearchKeyword);
  const searchKeyword = useSearchStore((state) => state.searchKeyword);
  const searchResults = useSearchStore((state) => state.searchResults);

  const handleKwordList = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  const handleFetchData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchKeyword(e.currentTarget.value);
  }

  const fetchData = async (keyword: string) => {
      setSearchLoading(true);
      if (keyword.trim()) {
        try {
          const response = await axios.get(
            `http://localhost:8081/api/v1/auth/meeting-group`,
            { params: { keyword } }
          );
          const keywordData = response.data.data;
          setSearchResults(keywordData);
        } catch (error) {
          console.log("Errorfetching data: ", error);
        } finally {
          setSearchLoading(false);
        }
      }
  };
  const fetchData2 = async (keyword: string) => {
      setSearchLoading(true);
      if (keyword.trim()) {
        try {
          const response = await axios.get(
            `http://localhost:8081/api/v1/auth/meeting-group`,
            { params: { keyword } }
          );
          const keywordData = response.data.data;
          setSearchResults(keywordData);
        } catch (error) {
          console.log("Errorfetching data: ", error);
        } finally {
          setSearchLoading(false);
        }
      }
  };

  useEffect(() => {
    fetchData(keyword);
  }, [keyword]);

  useEffect(() => {
    fetchData(searchKeyword);
  }, [searchKeyword]);

  return (
    <div css={s.container}>
      <div css={s.searchBar}>
        <div css={s.searchBarLine}>
          <button css={s.searchBtn} onClick={handleFetchData}>
            <IoSearchOutline />
          </button>
          <input
            css={s.searchInput}
            type="search"
            value={keyword}
            onChange={handleKwordList}
            placeholder="모임 이름을 입력해주세요."
          />
        </div>
        <div>
          <ul>
            {searchResults.map((searchResult, index) => (
              <li key={index}>{searchResult.groupTitle}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
