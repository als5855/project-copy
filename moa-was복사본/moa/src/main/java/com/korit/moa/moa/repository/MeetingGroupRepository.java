package com.korit.moa.moa.repository;


import com.korit.moa.moa.entity.meetingGroup.GroupCategory;
import com.korit.moa.moa.entity.meetingGroup.GroupTypeCategory;
import com.korit.moa.moa.entity.meetingGroup.MeetingGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface MeetingGroupRepository extends JpaRepository<MeetingGroup,Long> {

       // 그룹 모임 홈화면 출력 사용자가 카테고리 선택한 경우 선택 안한 경우
       @Query(value = """
SELECT ranked.*
FROM (
    SELECT mg.*, 
           ROW_NUMBER() OVER (PARTITION BY mg.group_category ORDER BY RAND()) AS rn
    FROM Meeting_Groups mg
    WHERE EXISTS (
        SELECT 1
        FROM Users u
        WHERE u.user_id = :userId
          AND (
              u.hobby LIKE CONCAT('%', mg.group_category, '%')
              OR (TRIM(u.hobby) = '' OR u.hobby IS NULL AND mg.group_category IN (
                  SELECT group_category
                  FROM (
                      SELECT DISTINCT mg2.group_category
                      FROM Meeting_Groups mg2
                      ORDER BY RAND()
                      LIMIT 3
                  ) AS random_categories
              ))
          )
    )
) AS ranked
WHERE ranked.rn <= 3
ORDER BY ranked.group_category, RAND();
""", nativeQuery = true)
       Optional<List<MeetingGroup>> findGroupByUserId(@Param("userId") String userId);

    // 모임이름 필터링 검색
    @Query("SELECT m FROM MeetingGroup m " +
            "WHERE m.groupTitle LIKE %:keyword% " +
            "ORDER BY m.groupId")
    Optional<List<MeetingGroup>> findByGroupTitle(@Param("keyword") String keyword);

    // 모임 취미카테고리,지역칸테고리 필터링
    @Query("SELECT m FROM MeetingGroup m " +
            "WHERE m.groupCategory = :groupCategory " +
    "AND m.groupAddress Like CONCAT('%', :region, '%') " +
    "ORDER BY m.groupId ")
    Optional<List<MeetingGroup>> findByGroupCategoryAndRegion(@Param("groupCategory")GroupCategory groupCategory, @Param("region") String region);

    // 단기/정기 모임 필터
//    @Query("SELECT mg FROM MeetingGroup mg " +
//            "WHERE  mg.groupType = :groupType " +
//            "ORDER BY mg.groupId")
    Optional<List<MeetingGroup>> findByGroupType(@Param("groupType") GroupTypeCategory groupType);
}