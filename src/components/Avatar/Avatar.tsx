import React from "react";
import "./Avatar.scss";

export type AvatarProps = {
  src?: string;
  alt?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  src = "https://pbs.twimg.com/media/EXg7x-EWAAILbYK.jpg",
  alt = "",
}) => <img src={src} alt={alt} />;

export default React.memo(Avatar);
