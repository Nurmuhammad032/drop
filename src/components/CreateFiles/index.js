import React, { useState } from "react";
import { faFileAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addFileUser } from "../../manageState/actionCreators/filefoldersActionCreators";
import { MdOutlineCreateNewFolder } from "react-icons/md";

const CreateFile = ({ currentFolder }) => {
  const [isShowModal, setIsShowModalOpenDoim] = useState(false);
  const [file, setAllFilesHammasi] = useState("");

  const dispatch = useDispatch();
  const { userId, userFiles } = useSelector(
    (state) => ({
      userId: state.auth.userId,
      userFiles: state.filefolders.userFiles,
    }),
    shallowEqual
  );

  const handleFileSubmit = (e) => {
    e.preventDefault();

    if (!file) return toast.dark("Please add file name!");
    const fileExtension =
      file.split(".").length > 1
        ? file.split(".")[file.split(".").length - 1].toLowerCase()
        : "txt";
    const allowedExtensions = [
      "html",
      "php",
      "js",
      "jsx",
      "txt",
      "xml",
      "css",
      "c",
      "cpp",
      "java",
      "cs",
      "py",
      "json",
    ];

    if (allowedExtensions.indexOf(fileExtension) === -1) {
      return toast.dark(`File with extension ${fileExtension} not allowed!`);
    }
    const fileName =
      file.split(".").length > 1 ? file : file + "." + fileExtension;

    const filteredFiles =
      currentFolder === "root folder"
        ? userFiles.filter(
            (file) =>
              file.data.parent === "" && file.data.name === fileName.trim()
          )
        : userFiles.filter(
            (file) =>
              file.data.parent === currentFolder.docId &&
              file.data.name === fileName.trim()
          );

    if (filteredFiles.length > 0)
      return toast.dark("This is alredy present in folder");

    if (currentFolder === "root folder") {
      dispatch(
        addFileUser({
          uid: userId,
          parent: "",
          data: "",
          name: fileName,
          url: "",
          path: [],
        })
      );
      setAllFilesHammasi("");
      setIsShowModalOpenDoim(false);
      return;
    }

    const path =
      currentFolder.data.path.length > 0
        ? [
            ...currentFolder.data.path,
            { id: currentFolder.docId, name: currentFolder.data.name },
          ]
        : [{ id: currentFolder.docId, name: currentFolder.data.name }];

    dispatch(
      addFileUser({
        uid: userId,
        parent: currentFolder.docId,
        data: "",
        name: fileName,
        url: "",
        path: path,
      })
    );
    setAllFilesHammasi("");
    setIsShowModalOpenDoim(false);
    return;
  };

  return (
    <>
      <Modal show={isShowModal} onHide={() => setIsShowModalOpenDoim(false)}>
        <Modal.Header>
          <Modal.Title>Create File</Modal.Title>
          <Button
            variant="white"
            style={{ cursor: "pointer" }}
            onClick={() => setIsShowModalOpenDoim(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFileSubmit}>
            <Form.Group controlId="formBasicFolderName" className="my-2">
              {/* <Form.Control
                type="text"
                placeholder="eg. index.html, index.js, index.php, index.txt"
                value={file}
                onChange={(e) => setAllFilesHammasi(e.target.value)}
              /> */}
              <input
                type="text"
                value={file}
                style={{
                  outline: "none",
                }}
                onChange={(e) => setAllFilesHammasi(e.target.value)}
                className="w-100 py-1"
                placeholder="eg. index.html, index.js, index.php, index.txt"
              />
            </Form.Group>
            <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
              <button
                type="submit"
                className="d-block mx-auto"
                style={{
                  border: "none",
                  background: "#0061fe",
                  color: "#fff",
                  padding: "0.2rem 1.5rem",
                }}
              >
                Add file
              </button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <button
        className="app__dashboard-btns"
        onClick={() => setIsShowModalOpenDoim(true)}
      >
        <MdOutlineCreateNewFolder className="me-2" size={"1.4rem"} />
        Create File
      </button>
    </>
  );
};

export default CreateFile;
