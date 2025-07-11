import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/UserAvatar";

const MessageList = ({
  conversations,
  selectedId,
  onSelect,
  search,
  onSearch,
}) => (
  <div className="w-full max-w-xs border-r bg-white flex flex-col">
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="relative">
        <Input
          value={search}
          onChange={onSearch}
          placeholder="Search messages"
          className="w-full bg-purple-100 focus:ring-purple-500 pl-10"
          aria-label="Search messages"
        />
        <span className="absolute left-3 top-2.5 text-gray-400">
          <svg width="18" height="18" fill="none" stroke="currentColor"><circle cx="8" cy="8" r="7" strokeWidth="2"/><path d="M17 17l-3.5-3.5" strokeWidth="2" strokeLinecap="round"/></svg>
        </span>
      </div>
    </div>
    <div className="overflow-y-auto flex-1">
      {conversations.map((conv) => (
        <button
          key={conv.id}
          onClick={() => onSelect(conv.id)}
          className={`flex items-center w-full p-4 text-left transition-colors ${
            selectedId === conv.id ? "bg-purple-50" : "hover:bg-gray-50"
          }`}
          aria-current={selectedId === conv.id}
        >
          <UserAvatar
            src={conv.avatar}
            alt={conv.name}
            fallbackId={conv.id}
            size={40}
          />
          <div className="flex-1 min-w-0 ml-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold truncate">{conv.name}</span>
              <span className="text-xs text-gray-500">{conv.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 truncate">{conv.preview}</span>
              {conv.unread && (
                <span className="ml-1 w-2 h-2 bg-purple-500 rounded-full inline-block" />
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

MessageList.propTypes = {
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      name: PropTypes.string.isRequired,
      preview: PropTypes.string,
      time: PropTypes.string,
      unread: PropTypes.bool,
    })
  ).isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  search: PropTypes.string,
  onSearch: PropTypes.func,
};

export default MessageList;
