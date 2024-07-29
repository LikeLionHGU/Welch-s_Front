import React, { useEffect, useRef } from "react";
import BookImage from "../imgs/test1.png";
import "../styles/bookslist.css"; // 스타일링을 위한 CSS 파일

const BooksList = ({ books }) => {
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    const listScrollWidth = list.scrollWidth;
    const listClientWidth = list.clientWidth;

    // 이벤트마다 갱신될 값
    let startX = 0;
    let nowX = 0;
    let listX = 0;

    const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

    const getTranslateX = () => {
      const style = getComputedStyle(list);
      const matrix = new DOMMatrixReadOnly(style.transform);
      return matrix.m41;
    };

    const setTranslateX = (x) => {
      list.style.transform = `translateX(${x}px)`;
    };

    const bindEvents = () => {
      list.addEventListener('mousedown', onScrollStart);
      list.addEventListener('touchstart', onScrollStart);
    };

    const unbindEvents = () => {
      list.removeEventListener('mousedown', onScrollStart);
      list.removeEventListener('touchstart', onScrollStart);
    };

    const onScrollStart = (e) => {
      startX = getClientX(e);
      window.addEventListener("mousemove", onScrollMove);
      window.addEventListener("touchmove", onScrollMove);
      window.addEventListener("mouseup", onScrollEnd);
      window.addEventListener("touchend", onScrollEnd);
      list.style.cursor = 'grabbing';
      e.preventDefault(); // 드래그 시 선택 방지
    };

    const onScrollMove = (e) => {
      nowX = getClientX(e);
      setTranslateX(listX + nowX - startX);
    };

    const onScrollEnd = () => {
      if (listX > 0) {
        listX = 0;
        list.style.transition = 'transform 0.3s ease';
        setTranslateX(listX);
      } else if (listX < listClientWidth - listScrollWidth) {
        listX = listClientWidth - listScrollWidth;
        list.style.transition = 'transform 0.3s ease';
        setTranslateX(listX);
      }

      setTimeout(() => {
        list.style.transition = '';
      }, 300);

      window.removeEventListener('mousemove', onScrollMove);
      window.removeEventListener('touchmove', onScrollMove);
      window.removeEventListener('mouseup', onScrollEnd);
      window.removeEventListener('touchend', onScrollEnd);
      list.style.cursor = 'grab';
    };

    bindEvents();

    return () => {
      unbindEvents();
    };
  }, []);

  return (
    <div className="books-list-container">
      <div className="books-list" ref={listRef}>
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <img
              src={book.image || BookImage}
              alt={book.title}
              className="book-image"
            />
            <div className="book-title">
              <p>{book.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
