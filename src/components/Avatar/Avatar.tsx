import React from "react";

import styles from "./Avatar.module.scss";

export type AvatarProps = {
  src?: string;
  alt?: string;
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  src = "#",
  alt = "",
  className = styles.avatar,
}) => <img src={src} alt={alt} className={className} />;

export default React.memo(Avatar);
