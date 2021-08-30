import "./Avatar.css";

export type AvatarProps = {
  src?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src = "#" }) => <img src={src} />;

export default Avatar;
