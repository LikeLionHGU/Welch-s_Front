import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  DecoupledEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  Indent,
  IndentBlock,
  Italic,
  Link,
  Paragraph,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Title,
  Underline,
  Undo,
} from "ckeditor5";

import translations from "ckeditor5/translations/ko.js";

import "ckeditor5/ckeditor5.css";

import "../styles/write.css";
import { useRecoilState } from "recoil";
import { historyState } from "../atom";
import ModalContainer from "./ModalContainer";
// write 컴포넌트 호출 시, useEffect로 Approval에서는 내용을 가지고 와야함
// Update에서는 useEffect 사용할 필요 X
// useEffect 내부에서 updateId에 내용을 확인하고, null이 아닐 경우에만 사용

// user === 0 : 독자, 1: 참여자, 2: 관리자
// mode === 0 : /update, 1: /approval
export default function Write({ user, mode, id, updatedId }) {
  // user, mode, 갈피 id를 받아옴
  const editorContainerRef = useRef(null);
  const editorMenuBarRef = useRef(null);
  const editorToolbarRef = useRef(null);
  const editorRef = useRef(null);
  const navigate = useNavigate();

  // const { id, user, mode } = location.state || {};
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [history, setHistory] = useRecoilState(historyState);
  var data = ""; // contents에 해당하는 부분

  const [postList, setPostList] = useState([]); // 모든 버전(post를 다 가지고 옴)
  const [post, setPost] = useState(); // 현재 선택한 버전의 post
  const [updatedPost, setUpdatedPost] = useState(); // 검토 신청이 들어온 post
  // 처음 입력되는 부분
  const [initialData, setInitialData] = useState("");
  // const initialData = useRef("");

  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const toggleHistory = () => {
    setHistory(!history); // 상태를 토글하여 열림/닫힘 상태 변경
  };

  const addPost = async () => {
    const token = localStorage.getItem("token");
    const value = {
      contents: data,
      bookMarkId: id,
    };

    try {
      const response = await axios.post(
        `https://likelion.info/post/upload`,
        value,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Post uploaded successfully");
        alert("게시물 업로드 성공");
        // window.location.reload();
      } else {
        console.error("Error uploading post");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in setting up request:", error.message);
      }
      console.error("Error uploading post:", error);
      alert(`Error uploading post: ${error.message}`);
      localStorage.removeItem("token");
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (updatedId != null) {
      // updated id가 null이 아닌 경우에만 호출하게 됨
      const token = localStorage.getItem("token");

      if (token == null) {
        navigate("/", { replace: true });
        return;
      }

      const fetchDefaultPost = () => {
        // 갈피의 가장 최신 승인 post 가져오기
        axios
          .get(`https://likelion.info/bookmark/get/default/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          })
          .then((response) => {
            setPost(response.data); // 가장 최신 승인 post를 post 안에 저장
            // initialData = response.data.contents;
            setInitialData(response.data.contents);

            console.log("initial:", initialData);
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
            localStorage.removeItem("token");
            navigate("/", { replace: true });
          });
      };

      const fetchUpdatedPost = () => {
        // 검토 요청이 들어온 post 객체 가져오기
        axios
          .get(`https://likelion.info/post/get/${updatedId}`, {
            // 수정된 post id 사용
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          })
          .then((response) => {
            setUpdatedPost(response.data); // 검토 요청이 들어온 post를 updatedPost 안에 저장
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
            localStorage.removeItem("token");
            navigate("/", { replace: true });
          });
      };

      setLoading(false);
      if (mode === 1 && user === 2) {
        fetchUpdatedPost();
      }
      if (mode === 2 && user === 2) {
        fetchDefaultPost();
      }
    }
  }, []);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  // const handleSetEditor = () => {
  //   if (editorRef.current) {
  //     const data = editorRef.current.getData();
  //     console.log(data);
  //   }
  // };

  const handleSetOpenModal = () => {
    setOpenModal(!openModal);
    console.log(openModal);
  };

  if (loading && mode === 2) {
    return <div>왜 안돼</div>;
  }

  const modalStyle = {
    overlay: {
      zIndex: "1000",
      backgroundColor: " rgba(48, 48, 48, 0.4)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minWidth: "700px", // 원하는 너비
      height: "400px", // 원하는 높이
      zIndex: "1001",
    },
  };

  // useEffect(() => {
  //   console.log(postList);
  // }, [postList]);

  const handleSetEditor = () => {
    if (editorRef.current) {
      const data = editorRef.current.getData();
      console.log(data);
    }
  };

  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "insertTable",
        "highlight",
        "blockQuote",
        "|",
        "alignment",
        "|",
        "indent",
        "outdent",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      Autoformat,
      AutoLink,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      Code,
      CodeBlock,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      Indent,
      IndentBlock,
      Italic,
      Link,
      Paragraph,
      RemoveFormat,
      SelectAll,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Style,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextPartLanguage,
      TextTransformation,
      Title,
      Underline,
      Undo,
    ],
    balloonToolbar: ["bold", "italic", "|", "link"],
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, "default", 18, 20, 22],
      supportAllValues: true,
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    // 미리 적어지는 곳
    initialData: initialData,
    language: "ko",
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    menuBar: {
      isVisible: true,
    },
    placeholder: "자신만의 책갈피를 채워봐요!",
    style: {
      definitions: [
        { name: "Article category", element: "h3", classes: ["category"] },
        { name: "Title", element: "h2", classes: ["document-title"] },
        { name: "Subtitle", element: "h3", classes: ["document-subtitle"] },
        { name: "Info box", element: "p", classes: ["info-box"] },
        { name: "Side quote", element: "blockquote", classes: ["side-quote"] },
        { name: "Marker", element: "span", classes: ["marker"] },
        { name: "Spoiler", element: "span", classes: ["spoiler"] },
        {
          name: "Code (dark)",
          element: "pre",
          classes: ["fancy-code", "fancy-code-dark"],
        },
        {
          name: "Code (bright)",
          element: "pre",
          classes: ["fancy-code", "fancy-code-bright"],
        },
      ],
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
    translations: [translations],
  };
  return (
    <div className="write-container">
      <div
        className="editor-container editor-container_document-editor editor-container_include-style"
        ref={editorContainerRef}
      >
        <div className="editor-container__toolbar" ref={editorToolbarRef}></div>
        <div className="editor-container__editor-wrapper">
          <div className="editor-container__editor">
            <div ref={editorRef}>
              <div id="editor-history-btn-container">
                <div id="editor-history-btn" onClick={toggleHistory}>
                  {mode === 0 ? <>History</> : <></>}
                </div>
              </div>
              {isLayoutReady && (
                <CKEditor
                  onReady={(editor) => {
                    editorRef.current = editor;
                    const toolbarElement = editor.ui.view.toolbar.element;
                    if (user === 2 && mode === 2) {
                      editor.enableReadOnlyMode("feature-id");
                    }

                    if (toolbarElement) {
                      editorToolbarRef.current.appendChild(toolbarElement);
                    }
                    // if (menuBarElement) {
                    //   editorMenuBarRef.current.appendChild(menuBarElement);
                    // }
                  }}
                  onAfterDestroy={() => {
                    if (editorToolbarRef.current) {
                      editorToolbarRef.current.innerHTML = "";
                    }
                    if (editorMenuBarRef.current) {
                      editorMenuBarRef.current.innerHTML = "";
                    }
                  }}
                  onChange={(event, editor) => {
                    data = editor.getData();
                  }}
                  editor={DecoupledEditor}
                  config={editorConfig}
                  // data={mode === 2 && user === 2 ? initialData : {}}
                />
              )}
            </div>
          </div>
        </div>
        {mode === 0 ? (
          <>
            {/* 모든 사람들이 볼 수 있는 페이지 */}
            {user !== 0 && (
              <div className="write-btns">
                <button onClick={handleSetEditor}>임시 저장</button>

                <button onClick={addPost}>발행 검사</button>
              </div>
            )}
          </>
        ) : // 관리자의 수정 편집 페이지, 버전을 관리하는...
        mode === 2 && user === 2 ? (
          <></>
        ) : (
          <>
            <ModalContainer
              isOpen={openModal}
              closeModal={handleSetOpenModal}
              style={modalStyle}
              mode={0}
            />
            <div className="write-btns">
              <button
                onClick={() => {
                  handleSetOpenModal();
                }}
              >
                미승인
              </button>
              <button type="submit">승인</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
