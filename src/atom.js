import { atom } from "recoil";

export const historyState = atom({
  key: "historyState",
  default: true, // 기본값은 사이드바가 닫혀있는 상태
});

export const categoryState = atom({
  key: "categoryState",
  default: "전체",
});

export const bigCategoryState = atom({
  key: "bigCategoryState",
  default: "소설",
});
