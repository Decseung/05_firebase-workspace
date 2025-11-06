import { auth } from "../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser,
} from "firebase/auth";

// console.log(auth);

// 1) 사용자 정보 등록 (회원가입) (createuserWithEmailAndPassword)
const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  // userCredential : 인증함수(가입, 로그인 등)를 실행했을 때 반환 객체 - 인증 정보, User(사용자 계정 정보), ..
  const user = userCredential.user;
  console.log("회원가입 성공:", user.uid); // 사용자의 고유 ID (UID)
  console.log("사용자 이메일:", user.email);
  console.log("사용자 이름:", user.displayName);
  console.log("사용자 프로필 URL:", user.photoURL);

  return user;
};

// 2) 사용자 정보 조회 (로그인) (signInWithEmailAndPassword)
const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  console.log("로그인 성공 : ", user.uid);
};

// 3) 로그아웃 (signOut)
const logout = async () => {
  // 현재 로그인 된 사용자 정보 (auth.currentUser) == User객체 {uid, email, displayName ...}
  console.log("현재 로그인 되어있는 사용자 ID : ", auth.currentUser.uid);
  console.log("현재 로그인 되어있는 사용자 이메일 : ", auth.currentUser.email);
  // 로그아웃
  await signOut(auth);
  console.log("로그아웃 성공");
  console.log("현재 로그인 되어있는 사용자:", auth.currentUser);
};

// 4) 인증 상태 변경 감지 (onAuthStateChanged)
const checkAuthState = () => {
  // 리스너함수 : 인증상태가 변경될때 마다 자동으로 되는 함수
  const unsubscrive = onAuthStateChanged(auth, (currentUser) => {
    console.log("*************** Auth 상태 변경됨 ***************");
    if (currentUser) {
      console.log("현재 로그인 된 사용자 : ", currentUser.uid);
    } else {
      // 로그아웃 상태 (인증정보 사라짐) === null 값 들어옴
      console.log("로그인된 사용자가 없습니다.");
    }
  });
};

// 5) 사용자 정보 삭제 (회원탈퇴) (deleteUser)
const deleteAccount = async () => {
  await deleteUser(auth.currentUser);
  console.log("사용자 계정 삭제 완");
};
// 테스트
// signUp("test03@example.com", "password123");

// checkAuthState();
// await login("test03@example.com", "password123");
// await logout();

// 삭제 (로그인 -> auth.currentUser 입력 -> 삭제)
// await login("test03@example.com", "password123");
// await deleteAccount();

export { signUp, login, logout, checkAuthState, deleteAccount };
