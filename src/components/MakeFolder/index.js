import { faFolderPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addFolderUser } from "../../manageState/actionCreators/filefoldersActionCreators";
import { HiOutlineFolderAdd } from "react-icons/hi";

const CreateFolder = ({ currentFolder }) => {
  const [showModal, setShowMoHohho] = useState(false);
  const [folderName, setFayName] = useState("");

  const dispatch = useDispatch();
  const { userId, userFolders } = useSelector(
    (state) => ({
      userId: state.auth.userId,
      userFolders: state.filefolders.userFolders,
    }),
    shallowEqual
  );

  const handleFolderSubmit = (e) => {
    e.preventDefault();
    const filteredFolders =
      currentFolder === "root folder"
        ? userFolders.filter(
            (folder) =>
              folder.data.parent === "" &&
              folder.data.name === folderName.trim()
          )
        : userFolders.filter(
            (folder) =>
              folder.data.parent === currentFolder.docId &&
              folder.data.name === folderName.trim()
          );
    if (!folderName) return toast.dark("Please enter folder name!");

    if (filteredFolders.length > 0)
      return toast.dark("This is alredy present in folder");

    if (currentFolder === "root folder") {
      dispatch(addFolderUser(folderName, userId, "", []));
      setFayName("");
      setShowMoHohho(false);
      return;
    }

    const path =
      currentFolder.data.path.length > 0
        ? [
            ...currentFolder.data.path,
            { id: currentFolder.docId, name: currentFolder.data.name },
          ]
        : [{ id: currentFolder.docId, name: currentFolder.data.name }];
    dispatch(addFolderUser(folderName, userId, currentFolder.docId, path));
    setFayName("");
    setShowMoHohho(false);
    return;
  };
  return (
    <>
      <Modal show={showModal} onHide={() => setShowMoHohho(false)}>
        <Modal.Header>
          <Modal.Title>Create Folder</Modal.Title>
          <Button
            variant="white"
            style={{ cursor: "pointer" }}
            onClick={() => setShowMoHohho(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFolderSubmit}>
            <Form.Group controlId="formBasicFolderName" className="my-2">
              <input
                type="text"
                value={folderName}
                style={{
                  outline: "none",
                }}
                onChange={(e) => setFayName(e.target.value)}
                className="w-100 py-1"
                placeholder="Enter your folder name"
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
                Add folder
              </button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <button
        onClick={() => setShowMoHohho(true)}
        className="app__dashboard-btns"
      >
        <HiOutlineFolderAdd size={"1.3rem"} className="me-2" />
        Create Folder
      </button>
    </>
  );
};

export default CreateFolder;
