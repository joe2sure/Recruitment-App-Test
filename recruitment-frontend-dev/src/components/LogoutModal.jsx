// src/components/LogoutModal.jsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function LogoutModal({ isOpen, onClose, onLogout }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-xl bg-white p-6 text-center shadow-xl transition-all">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Are you sure you want to log out?
                </Dialog.Title>

                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={onLogout}
                    className="w-full rounded-lg border border-purple-600 px-5 py-2 text-purple-600 hover:bg-purple-50 transition"
                  >
                    Yes
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full rounded-lg bg-purple-900 px-5 py-2 text-white hover:bg-purple-800 transition"
                  >
                    No
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
