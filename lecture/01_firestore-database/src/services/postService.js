import { db } from "../firebase/config.js";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

// 기능별 함수 정의
const COLLECTION_NAME = "posts";
/**
 *
 * 신규 게시글을 등록하는 함수
 * @param {Object} postData - 등록할 게시글 데이터 {title, content}
 * @returns {string} 생성된 게시글 고유 ID
 *
 */

const createPost = async (postData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...postData,
      createdAt: serverTimestamp(),
    });
    console.log("게시글이 생성되었습니다. ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.log("게시글 등록 오류");
    throw error;
  }
};

/**
 * 전체 게시글 목록을 조회하는 함수
 * @returns {Array} 조회된 게시글 배열(각 게시글 객체에 ID 포함)
 */
const getPosts = async () => {
  try {
    // 쿼리 생성
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc")
    );

    // 쿼리 조회
    const querySnapshot = await getDocs(q); // 위에서 생성된 쿼리 객체

    // 조회 결과 가공
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 가공된 데이터 반환
    return posts;
  } catch (error) {
    console.log("게시글 목록 조회 오류");
    throw error;
  }
};

/**
 * 특정 게시글 조회하는 함수
 * @param {string} postId - 조회할 게시글 고유 ID
 * @returns {null | Object}  - 게시글 객체(ID 포함) 또는 null
 */

const getPost = async (postId) => {
  try {
    const docSnapShot = await getDoc(doc(db, COLLECTION_NAME, postId));
    if (!docSnapShot.exists()) {
      return null;
    }
    return {
      id: docSnapShot.id,
      ...docSnapShot.data(),
    };
  } catch (error) {
    console.log("게시글 조회 오류");
    throw error;
  }
};

/**
 * 특정 게시글 수정하는 함수
 * @param {string} postId - 수정할 게시글 고유 ID
 * @param {Object} postData - 수정할 게시글 데이터 {title, content}
 */
const updatePost = async (postId, postData) => {
  try {
    await updateDoc(doc(db, COLLECTION_NAME, postId), {
      ...postData,
    });
    console.log("게시글이 수정되었다.");
  } catch (error) {
    console.log("게시글 수정 오류");
    throw error;
  }
};

/**
 * 특정 게시글을 삭제하는 함수
 * @param {string} postId - 삭제할 게시글 ID
 */
const deletePost = async (postId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, postId));
    console.log("게시글 삭제 완!");
  } catch (error) {
    console.log("게시글 삭제 오류");
    throw error;
  }
};

export { createPost, getPost, getPosts, updatePost, deletePost };

//테스트 실행
// deletePost("uMVU4PhnL3OuakhTV2Mk");

// console.log(
//   updatePost("uMVU4PhnL3OuakhTV2Mk", {
//     title: "수정되고잇니이",
//     content: "수정된 내용",
//   })
// );

// console.log(await getPost("12345"));
// console.log(await getPost("uMVU4PhnL3OuakhTV2Mk"));

// createPost({
//   title: "게시글1",
//   content: "내용1",
// });

// createPost({
//   title: "게시글2",
//   content: "내용2",
// });
// 추가하는 영역

// console.log(await getPosts());
