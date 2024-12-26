/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as s from "./groupList/style";
import { BsHeart } from "react-icons/bs";
import useHomeGroupStore from "../../stores/homeGroup.store";
import axios from "axios";
import { useCookies } from "react-cookie";
import userAuthStore from "../../stores/auth.store";

function AuthHomeGroup() {
  const { userId, isAuthenticated } = userAuthStore();
  const results = useHomeGroupStore((state) => state.results);
  const setResults = useHomeGroupStore((state) => state.setResults);
  const [loading, setLoading] = useState<boolean>(false);
  const [cookies] = useCookies(["token"]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (cookies.token) {
        const response = await axios.get(
          `http://localhost:8081/api/v1/meeting-group/home-recommendation`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
          }
        );
        const groupData = response.data.data;
          setResults(groupData);
          console.log(groupData);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const slices = [
    { start: 0, end: 3 },
    { start: 3, end: 6 },
    { start: 6, end: 10 },
  ];

  return (
    <div>
      <div css={s.container}>
        <div css={s.mainBox}>
          <p>추천 모임</p>
          <div css={s.line}></div>
          {loading ? (
            <p>데이터를 불러오는 중입니다...</p>
          ) : (
            slices.map(({ start, end }, index) => (
              <ul css={s.groupList} key={`slice-${index}`}>
                <div css={s.marginPaddingDel}>
                  {results[start]
                    ? results[start].groupCategory
                    : "카테고리가 없습니다."}
                </div>
                <ul css={s.marginPaddingDel}>
                  {results.slice(start, end).map((result) => (
                    <li key={result.groupId} css={s.groupLi}>
                      <div>{result.groupImage}</div>
                      <div css={s.line}></div>
                      <div css={s.listDetail}>
                        <p>{result.groupTitle}</p>
                        <p>
                          <BsHeart />
                        </p>
                      </div>
                      <div css={s.listDetail}>
                        <p>{result.groupDate}</p>
                        <p>{result.groupAddress}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ul>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthHomeGroup;
