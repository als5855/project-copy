package com.korit.moa.moa.repository;

import com.korit.moa.moa.entity.recommendation.Recommendation;
import com.korit.moa.moa.entity.recommendation.RecommendationsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, RecommendationsId> {

    @Query("SELECT m.groupId, COUNT(reco.user.userId) AS countId " +
            "FROM MeetingGroup m, Recommendation reco " +
            "WHERE m.groupId = reco.meetingGroup.groupId " +
            "GROUP BY m.groupId " +
            "ORDER BY countId DESC "
    )
    Optional<List<Object[]>> findAll();
}
