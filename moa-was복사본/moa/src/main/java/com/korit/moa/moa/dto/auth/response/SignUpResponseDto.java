package com.korit.moa.moa.dto.auth.response;

import com.korit.moa.moa.entity.user.Gender;
import com.korit.moa.moa.entity.user.Hobby;
import com.korit.moa.moa.entity.user.Region;
import com.korit.moa.moa.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpResponseDto {

    private String userId;

    private String password;

    private Date userBirthDate;

    private Gender userGender;

    private String userName;

    private String nickName;

    private Set<String> hobbies ;

    private String  profileImage;

    private Region region;

        public SignUpResponseDto(User user) {
            this.userId = user.getUserId();
            this.password = user.getPassword();
            this.userBirthDate = user.getUserBirthDate();
            this.userGender = user.getUserGender();
            this.userName = user.getUserName();
            this.nickName = user.getNickName();
            this.profileImage = user.getProfileImage();
            this.hobbies = Arrays.stream(user.getHobbies().split(",")).collect(Collectors.toSet());
            this.region = user.getRegion();
    }
}
