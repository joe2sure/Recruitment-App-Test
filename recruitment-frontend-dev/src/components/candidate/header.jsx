import { Notification } from '@/components/candidate/Notification';
import { Button } from '@/components/ui/button';

export default function Header({ setSidebarOpen }) {
  return (
    <header className="bg-purple-900 text-white p-4">
      <div className="flex items-center gap-2 px-3 py-2 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl shadow-sm">
        {/* Mobile menu toggle button */}
        <Button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="cursor-pointer md:hidden text-white h-10 w-10 transition-colors duration-300"
          variant="ghost"
          size="icon"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26"
            viewBox="0 -960 960 960"
            width="26"
            fill="currentColor"
          >
            <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z" />
          </svg>
        </Button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Notification bell */}
        <Button
          className="relative h-10 w-10 transition-colors duration-300"
          variant="ghost"
          size="icon"
          aria-label="Notifications"
        >
          <Notification />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 -960 960 960"
            width="30"
            fill="currentColor"
          >
            <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
          </svg>
        </Button>

        {/* Message icon */}
        <Button
          className="relative h-10 w-10 transition-colors duration-300"
          variant="ghost"
          size="icon"
          aria-label="Messages"
        >
          <Notification />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 -960 960 960"
            width="30"
            fill="currentColor"
          >
            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
          </svg>
        </Button>

        {/* User Avatar */}
        <Button
          className="h-10 w-10 rounded-full overflow-hidden hover:ring-2 hover:ring-secondary-300"
          variant="ghost"
          size="icon"
          aria-label="User profile"
        >
          <img
            src="/candidate-pic.png"
            alt="User Avatar"
            className="object-cover h-full w-full"
          />
        </Button>
      </div>
    </header>
  );
}
