import PropTypes from "prop-types";
import { User } from "lucide-react";

// Utility to generate a color from a string (e.g., user id or name)
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 60%)`;
  return color;
}

const UserAvatar = ({ src, alt, fallbackId, size = 40 }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  // fallback: colored icon
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: stringToColor(fallbackId || alt || "user"),
      }}
    >
      <User color="#fff" size={size * 0.6} />
    </div>
  );
};

UserAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  fallbackId: PropTypes.string,
  size: PropTypes.number,
};

export default UserAvatar;
