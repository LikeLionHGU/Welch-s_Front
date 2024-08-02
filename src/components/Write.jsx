import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

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
import { readOnlySelector, useRecoilState } from "recoil";
import { historyState } from "../atom";
import ModalContainer from "./ModalContainer";

// user === 0 : 독자, 1: 참여자, 2: 관리자
// mode === 0 : /update, 1: /approval (수정 가능), 2: /approval (수정 불가)
export default function Write({ user, mode }) {
  const editorContainerRef = useRef(null);
  const editorMenuBarRef = useRef(null);
  const editorToolbarRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalContents, setModalContents] = useState("");
  const [history, setHistory] = useRecoilState(historyState);

  const toggleHistory = () => {
    setHistory((prev) => !prev); // 상태를 토글하여 열림/닫힘 상태 변경
  };

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

  // 누르면 모달 꺼지고 페이지 이동
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleTextareaChange = (event) => {
    setModalContents(event.target.value);
    console.log(event.target.value);
  };

  const ModalContents = () => (
    <div className="write-modal-contents-container">
      <div>미승인 사유</div>
      <textarea
        id="write-modal-contents-box"
        placeholder="수정해야 할 부분을 작성해 주세요."
        value={modalContents}
        onChange={handleTextareaChange}
      ></textarea>
      <div>
        <button onClick={handleCloseModal}>작성하기</button>
      </div>
    </div>
  );

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

  // 처음 입력되는 부분
  const initialData =
    user === 2 && mode === 2
      ? "<h2>제목</h2><p>태그가</p><h1>아주 잘 되네요</h1><h3>수정도 안되게 했습니다</h3>"
      : "";

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
                    const menuBarElement = editor.ui.view.menuBarView?.element;
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
                    const data = editor.getData();
                    console.log(data);
                  }}
                  editor={DecoupledEditor}
                  config={editorConfig}
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
                <button>임시 저장</button>
                <form>
                  <button type="submit">발행 검사</button>
                </form>
              </div>
            )}
          </>
        ) : // 관리자의 수정 편집 페이지, 버전을 관리하는...
        mode === 2 && user === 2 ? (
          <>
            <ModalContainer
              isOpen={openModal}
              closeModal={handleSetOpenModal}
              Contents={ModalContents}
              style={modalStyle}
            />
            <div className="write-btns">
              <button
                onClick={() => {
                  handleSetOpenModal();
                }}
              >
                미승인
              </button>
              <form>
                <button type="submit">승인</button>
              </form>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
