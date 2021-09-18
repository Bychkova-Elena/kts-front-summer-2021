import React from "react";
import "./Avatar.scss";

export type AvatarProps = {
  src?: string;
  alt?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src = "#", alt = "" }) => (
  <img src={src} alt={alt} />
);

export default React.memo(Avatar);
