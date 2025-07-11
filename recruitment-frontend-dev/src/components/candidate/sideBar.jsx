import { NavLink } from 'react-router-dom';

function Links({ title, svgIcon, url, specialClass = '' }) {
  return (
    <li className={specialClass}>
      <NavLink
        to={url}
        end
        className={({ isActive }) =>
          [
            'flex cursor-pointer hover:bg-secondary-300',
            'px-2 py-2 mb-2 transition-colors duration-300 text-button',
            'lg:justify-start gap-0 lg:gap-2',
            'items-center justify-center w-20 lg:w-full',
            isActive ? 'bg-purple-300 text-purple-900' : '',
          ].join(' ')
        }
      >
        {svgIcon}
        <span className="hidden lg:inline">{title}</span>
      </NavLink>
    </li>
  );
}

export default function Sidebar() {
  return (
    <aside
      className={`
         hidden md:grid md:w-20 lg:w-[230px]
         transition-all  bg-purple-900
         grid-rows-[130px_1fr]
         min-h-screen lg:p-4
         overflow-x-hidden
       `}
    >
      <div className="h-22 w-22 align-middle justify-self-center p-2 mt-3 lg:w-30 lg:h-30 lg:p-0 lg:mt-0">
        <img className="max-w-full" src="/logo.png" alt="Logo" />
      </div>

      <nav className="text-white mt-3">
        <ul className="flex flex-col h-full max-md:justify-center">
          <Links
            url="/candidate"
            title="Dashboard"
            svgIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="currentColor"
              >
                <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
              </svg>
            }
          />

          <Links
            url="/candidate/applications"
            title="My Applications"
            svgIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="currentColor"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z" />
              </svg>
            }
          />

          <Links
            url="/candidate/savedjobs"
            title="Saved Jobs"
            svgIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="currentColor"
              >
                <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Z" />
              </svg>
            }
          />

          <Links
            url="/candidate/courses"
            title="Courses"
            svgIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="currentColor"
              >
                <path d="M260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z" />
              </svg>
            }
          />

          <Links
            specialClass="mt-auto"
            url="/candidate/settings"
            title="Settings"
            svgIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="currentColor"
              >
                <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
              </svg>
            }
          />

          <Links
            url="/candidate/logout"
            title="Logout"
            svgIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="currentColor"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v204h-80v-204H200v560h560v-204h80v204q0 33-23.5 56.5T760-120H200Zm240-120v-80h240v-80H440v-80l-120 120 120 120Z" />
              </svg>
            }
          />
        </ul>
      </nav>
    </aside>
  );
}
