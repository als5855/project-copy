import React, { useEffect } from "react";
import RootLayout from "./layouts/RootLayout/RootLayout";
import RootContainer from "./layouts/RootContainer/RootContainer";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/index";
import GroupNaviBar from "./layouts/GroupNaviBar/GroupNaviBar";
import InformationNaviBar from "./layouts/InformationNaviBar/InformationNaviBar";
import Review from "./views/Review/Review";
import MainContainer from "./layouts/MainContainer/MainContainer";
import SignUp from "./views/Auth/SignUp/SignUp";
import SignIn from "./views/Auth/SignIn/SignIn";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import userAuthStore from "./stores/auth.store";
import FindUserId from "./views/Auth/FindUserID/index";
import MyPage from "./views/MyPage/index";
import Group from "./views/JoinGroup/index";

function App() {
  interface TokenUser {
    userId: string;
    nickName: string;
    profileImage: string | null;
  }

  const [cookies] = useCookies(["token"]);
  const { login, logout } = userAuthStore();

  useEffect(() => {
    if (cookies.token) {
      try {
        const decodedToken: any = jwtDecode(cookies.token);
        login({
          userId: decodedToken.userId,
          nickName: decodedToken.nickName,
          profileImage: decodedToken.profileImage,
        });
      } catch (e) {
        console.error("Invalid Token", e);
        logout();
      }
    } else {
      logout();
    }
  }, [cookies.token, login, logout]);


  return (
    <RootLayout>
      <GroupNaviBar />

      <RootContainer>
        <InformationNaviBar />
        <MainContainer>
          <Routes>
            {/* 메인 영역 라우트 설정 */}
            <Route path="/*" element={<Home />} />
            <Route path="/mypage/*" element={<MyPage/>}/>
            <Route path="/review" element={<Review />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/findUserId/*" element={<FindUserId />} />
            <Route path="/review" element={<Review />} />
            <Route path="/group/*" element={<Group />} />
          </Routes>
        </MainContainer>
      </RootContainer>
    </RootLayout>
  );
}

export default App;
