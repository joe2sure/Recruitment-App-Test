import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/UserAvatar";

const ChatArea = ({
  user,
  messages,
  value,
  onChange,
  onSend,
  onProfile,
}) => (
  <div className="flex flex-col flex-1 bg-white">
    {/* Header */}
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center">
        <UserAvatar
          src={user.avatar}
          alt={user.name}
          fallbackId={user.id}
          size={40}
        />
        <div className="ml-3">
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="text-gray-500 text-xl" aria-label="More options">⋮</button>
        <Button
          variant="link"
          className="text-purple-600"
          onClick={onProfile}
        >
          View Profile
        </Button>
      </div>
    </div>
    {/* Messages */}
    <div className="flex-1 p-4 overflow-y-auto">
      <p className="text-center text-gray-500 mb-4">Today</p>
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.isSelf ? "justify-end" : "justify-start"} mb-4`}
        >
          {!msg.isSelf && (
            <UserAvatar
              src={user.avatar}
              alt={user.name}
              fallbackId={user.id}
              size={32}
            />
          )}
          <div
            className={`max-w-xs p-3 rounded-lg ${
              msg.isSelf ? "bg-purple-100" : "bg-gray-100"
            }`}
          >
            <p>{msg.text}</p>
            <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
          </div>
          {msg.isSelf && (
            <UserAvatar
              src={user.avatar}
              alt="You"
              fallbackId={user.id + "-self"}
              size={32}
            />
          )}
        </div>
      ))}
    </div>
    {/* Input */}
    <div className="p-4 border-t">
      <form
        className="flex items-center"
        onSubmit={e => {
          e.preventDefault();
          onSend();
        }}
      >
        <Input
          placeholder="Reply message"
          className="flex-1 focus:ring-purple-500"
          value={value}
          onChange={onChange}
        />
        <Button type="submit" className="ml-2 bg-purple-600 text-white">
          ➤
        </Button>
      </form>
    </div>
  </div>
);

ChatArea.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      isSelf: PropTypes.bool.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onProfile: PropTypes.func,
};

export default ChatArea;
