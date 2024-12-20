package com.korit.moa.moa.service;

import com.korit.moa.moa.dto.ResponseDto;
import com.korit.moa.moa.dto.recommendation.request.RequestRecommendationDto;
import com.korit.moa.moa.dto.recommendation.response.GetResponseRecommendationDto;
import com.korit.moa.moa.dto.recommendation.response.ResponseRecommendationDto;
import com.korit.moa.moa.entity.recommendation.Recommendation;

import java.util.List;

public interface RecommendationService {
    ResponseDto<ResponseRecommendationDto> createRecommendation(RequestRecommendationDto dto);

    ResponseDto<List<GetResponseRecommendationDto>> getRecommendation(RequestRecommendationDto dto);
}
