import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Calendar, Search } from "lucide-react";

const iconMap = {
  search: Search,
  calendar: Calendar,
};

const SearchBar = ({ placeholder, value, onChange, icon = "search" }) => {
  const Icon = iconMap[icon] || Search;
  return (
    <div className="relative w-full">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-purple-100 focus:ring-purple-500 pl-10"
        aria-label={placeholder}
      />
      <span className="absolute left-3 top-2.5 text-gray-400">
        <Icon size={18} />
      </span>
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  icon: PropTypes.oneOf(["search", "calendar"]),
};

export default SearchBar;
