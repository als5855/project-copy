/** @jsxImportSource @emotion/react */
import React from 'react'
import { GroupCategory, GroupTypeCategory, MeetingGroup, MeetingTypeCategory } from '../../types';
import * as s from './style'

interface PaginationScrollProps<T> {
  data: MeetingGroup[];
}

const PaginationScroll = <T extends {
    groupId: number;
    creatorId: string;
    groupTitle: string;
    groupContent: string;
    groupAddress: string;
    groupImage: string;
    groupSupplies: string;
    groupDate: string;
    groupQuestion: string;
    groupCategory: GroupCategory;
    groupTypeCategory: GroupTypeCategory;
    meetingTypeCategory: MeetingTypeCategory;
}>({ data }:PaginationScrollProps<T>) => {
  return (
    <div>
      <ul css={s.categoryList}>
      {data.map((result, index) => (
        <li css={s.groupLi} key={`${result.groupId}-${index}`}>
          <div>{result.groupImage}</div>
          <div css={s.line}></div>
          <div css={s.listDetail}>
            <p css={s.content}>{result.groupTitle}</p>
            <p css={s.content}>
              {/* <Recommendation /> */}
            </p>
          </div>
          <div css={s.listDetail}>
          <p>{result.groupDate}</p>
          <p>{result.groupAddress}</p>
          </div>
        </li>
      ))}
      </ul>
    </div>
  )
}

export default PaginationScroll