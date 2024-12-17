package com.korit.moa.moa.dto.user.response;

import com.korit.moa.moa.entity.user.Gender;
import com.korit.moa.moa.entity.user.Hobby;
import com.korit.moa.moa.entity.user.Region;
import com.korit.moa.moa.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseUserDto {

    private String userId;

    private Date userBirthDate;

    private Gender userGender;

    private String userName;

    private String nickName;

    private Set<String> hobbies ;

    private String  profileImage;

    private Region region;

    public ResponseUserDto(User user) {
        this.userId = user.getUserId();
        this.userBirthDate = user.getUserBirthDate();
        this.userGender = user.getUserGender();
        this.userName = user.getUserName();
        this.nickName = user.getNickName();
        this.hobbies = Arrays.stream(user.getHobbies().split(",")).collect(Collectors.toSet());
        this.profileImage = user.getProfileImage();
        this.region = user.getRegion();

    }
}
