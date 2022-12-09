import React from "react";
import { Col } from "react-bootstrap";
import CreateFile from "../../MakeFiles/index.js";
import CreateFolder from "../../MakeFolder/index.js";
import UploadFile from "../../UploadAllFiles/index.js";
import BreadCrum from "../BreadCrum.js";

const SubNav = ({ currentFolder }) => {
  return (
    <Col
      md={12}
      className={"d-flex align-items-center px-5 pt-3 "}
    >
      {currentFolder && currentFolder !== "root folder" ? (
        <>
          <BreadCrum currentFolder={currentFolder} />
          {currentFolder.data.createdBy !== "admin" && (
            <div className="ml-auto col-md-5 d-flex justify-content-end">
              <UploadFile currentFolder={currentFolder} />
              &nbsp;
              <CreateFile currentFolder={currentFolder} />
              &nbsp;
              <CreateFolder currentFolder={currentFolder} />
            </div>
          )}
        </>
      ) : (
        <>
          <p>Root</p>
          <div className="ml-auto col-md-5 d-flex justify-content-end">
            <UploadFile currentFolder={currentFolder} />
            &nbsp;
            <CreateFile currentFolder={currentFolder} />
            &nbsp;
            <CreateFolder currentFolder={currentFolder} />
          </div>
        </>
      )}
    </Col>
  );
};

export default SubNav;
