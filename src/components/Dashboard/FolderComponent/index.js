import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie-player";
import loading from "../../../assets/animation/loading.json";
import { useHistory, useParams } from "react-router";
import {
  getAdminFiles,
  getAdminFolders,
  getUserFiles,
  getUserFolders,
} from "../../../manageState/actionCreators/filefoldersActionCreators";
import SubNav from "../NavbarSub.js";
import {
  FcFolder,
  FcImageFile,
  FcFile,
  FcAudioFile,
  FcVideoFile,
} from "react-icons/fc";

const FolderComponent = () => {
  const { folderId } = useParams();

  const { folders, isLoading, userId, files } = useSelector(
    (state) => ({
      folders: state.filefolders.userFolders,
      files: state.filefolders.userFiles,
      isLoading: state.filefolders.isLoading,
      userId: state.auth.userId,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isLoading) {
      dispatch(getAdminFolders());
      dispatch(getAdminFiles());
    }
    if (!folders && !files) {
      dispatch(getUserFolders(userId));
      dispatch(getUserFiles(userId));
    }
  }, [dispatch, folders, isLoading]);
  const userFolders =
    folders && folders.filter((file) => file.data.parent === folderId);

  const currentFolder =
    folders && folders.find((folder) => folder.docId === folderId);

  const createdFiles =
    files &&
    files.filter(
      (file) => file.data.parent === folderId && file.data.url === ""
    );

  const uploadedFiles =
    files &&
    files.filter(
      (file) => file.data.parent === folderId && file.data.url !== ""
    );

  if (isLoading) {
    return (
      <Row>
        <Col md="12">
          <Lottie
            play
            loop
            animationData={loading}
            style={{
              width: "25rem",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Col>
      </Row>
    );
  }

  if (
    userFolders &&
    userFolders.length < 1 &&
    createdFiles &&
    createdFiles.length < 1 &&
    uploadedFiles &&
    uploadedFiles.length < 1
  ) {
    return (
      <>
        <SubNav currentFolder={currentFolder} />
        <Row>
          <Col md="12">
            <p className="text-center small text-center my-5">Empty Folder</p>
          </Col>
        </Row>
      </>
    );
  }
  return (
    <>
      <SubNav currentFolder={currentFolder} />
      {userFolders && userFolders.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Created Folders</p>
          <Row
            md="2"
            style={{ height: "auto" }}
            className="pt-2  gap-2 pb-4 px-5"
          >
            {!folders ? (
              <Lottie
                play
                loop
                animationData={loading}
                style={{
                  width: "25rem",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            ) : (
              userFolders.map(({ data, docId }) => (
                <Col
                  onDoubleClick={() =>
                    history.push(`/dashboard/folder/${docId}`)
                  }
                  onClick={(e) => {
                    if (e.currentTarget.classList.contains("text-white")) {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.classList.remove("text-white");
                      e.currentTarget.classList.remove("shadow-sm");
                    } else {
                      e.currentTarget.style.background = "#017bf562";
                      e.currentTarget.classList.add("text-white");
                      e.currentTarget.classList.add("shadow-sm");
                    }
                  }}
                  key={docId}
                  md={2}
                  className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2"
                >
                  <FcFolder size={"3.5rem"} className="mt-3" />
                  <p className="text-center mt-3">{data.name}</p>
                </Col>
              ))
            )}
          </Row>
        </>
      )}
      {createdFiles && createdFiles.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Created Files</p>
          <Row
            md="2"
            style={{ height: "auto" }}
            className="pt-2  gap-2 pb-4 px-5"
          >
            {createdFiles.map(({ data, docId }) => (
              <Col
                onDoubleClick={() => history.push(`/dashboard/file/${docId}`)}
                onClick={(e) => {
                  if (e.currentTarget.classList.contains("text-white")) {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.classList.remove("text-white");
                    e.currentTarget.classList.remove("shadow-sm");
                  } else {
                    e.currentTarget.style.background = "#017bf562";
                    e.currentTarget.classList.add("text-white");
                    e.currentTarget.classList.add("shadow-sm");
                  }
                }}
                key={docId}
                md={2}
                className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2"
              >
                {/* <FontAwesomeIcon
                  icon={faFileAlt}
                  className="mt-3"
                  style={{ fontSize: "3rem" }}
                /> */}
                <FcFile size={"3.5rem"} className="mt-3" />
                <p className="text-center mt-3">{data.name}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
      {uploadedFiles && uploadedFiles.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Uploaded Files</p>
          <Row
            md="2"
            style={{ height: "auto" }}
            className="pt-2  gap-2 pb-4 px-5"
          >
            {uploadedFiles.map(({ data, docId }) => (
              <Col
                onDoubleClick={() => history.push(`/dashboard/file/${docId}`)}
                onClick={(e) => {
                  if (e.currentTarget.classList.contains("text-white")) {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.classList.remove("text-white");
                    e.currentTarget.classList.remove("shadow-sm");
                  } else {
                    e.currentTarget.style.background = "#017bf562";
                    e.currentTarget.classList.add("text-white");
                    e.currentTarget.classList.add("shadow-sm");
                  }
                }}
                key={docId}
                md={2}
                className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2"
              >
                {data.name
                  .split(".")
                  [data.name.split(".").length - 1].includes("png") ||
                data.name
                  .split(".")
                  [data.name.split(".").length - 1].includes("jpg") ||
                data.name
                  .split(".")
                  [data.name.split(".").length - 1].includes("jpeg") ||
                data.name
                  .split(".")
                  [data.name.split(".").length - 1].includes("svg") ||
                data.name
                  .split(".")
                  [data.name.split(".").length - 1].includes("gif") ? (
                  <FcImageFile size="3.5rem" className="mt-3" />
                ) : data.name
                    .split(".")
                    [data.name.split(".").length - 1].includes("mp4") ||
                  data.name
                    .split(".")
                    [data.name.split(".").length - 1].includes("mpeg") ? (
                  <FcVideoFile size="3.5rem" className="mt-3" />
                ) : data.name
                    .split(".")
                    [data.name.split(".").length - 1].includes("mp3") ? (
                  <FcAudioFile size="3.5rem" className="mt-3" />
                ) : (
                  <FcFile size="3.5rem" className="mt-3" />
                )}
                <p className="text-center mt-3">{data.name}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default FolderComponent;
