import React from "react";
import './page-header.css'

const PageHeader = ({title,onClick,text}) => {
  return (
    <div className="admin__page__header">
      <span>{title}</span>
      {text ? <button onClick={onClick}>{text}</button> : null}
    </div>
  );
};

export default PageHeader;
