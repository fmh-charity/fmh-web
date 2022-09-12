import React from "react";

const Loader = () => {
  const loadPic = Math.floor(Math.random() * 14) + 1;

  // eslint-disable-next-line jsx-a11y/alt-text, import/no-dynamic-require, global-require
  return <img src={require(`src/assets/images/${loadPic}.webp`)} />;
};

export default Loader;
