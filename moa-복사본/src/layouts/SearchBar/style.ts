import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const searchBar = css`
  width: 100%;
  height: 10%;
  /* border: 1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 650px;
  margin: 30px auto;
`;

export const searchBarLine = css`
  width:60%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1.2px solid #ddd;
`

export const searchBtn = css`
  font-size: 25px;
  margin: 0px 10px 0px 10px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: #777;
`

export const searchInput = css`
  width: 100%;
  height: 30%;
  border: none;
  outline: none;
  font-size: 16px;
  margin-bottom: 10px;
  &::placeholder {color: #ddd;}
`;

export const categorybox = css`
  background-color: beige;
  width: 500px;
  /* height: 800px; */
`