import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Lottie from "react-lottie-player";
import loading from "../../../assets/animation/loading.json";
import {
  getAdminFiles,
  getAdminFolders,
} from "../../../manageState/actionCreators/filefoldersActionCreators";
import SubNav from "../NavbarSub.js";

const FolderAdminComponent = () => {
  const { folderId } = useParams();

  const { files, folders, isLoading } = useSelector(
    (state) => ({
      folders: state.filefolders.adminFolders,
      files: state.filefolders.adminFiles,
      isLoading: state.filefolders.isLoading,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading && (!folders || !files)) {
      dispatch(getAdminFolders());
      dispatch(getAdminFiles());
    }
  }, [dispatch, isLoading]);
  const adminFiles =
    files && files.filter((file) => file.data.parent === folderId);

  const currentFolder =
    folders && folders.find((folder) => folder.docId === folderId);
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
  return (
    <>
      <SubNav currentFolder={currentFolder} />
      <Row>
        <Col md="12">
          <p className="border-bottom py-2">Created Files</p>
          <div style={{ height: "150px" }} className="pt-2 pb-4 px-5">
            {!files ? (
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
              adminFiles.map(({ data, docId }) => (
                <Col
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
                  <FontAwesomeIcon
                    icon={faFile}
                    className="mt-3"
                    style={{ fontSize: "3rem" }}
                  />
                  <p className="mt-3">{data.name}</p>
                </Col>
              ))
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FolderAdminComponent;
