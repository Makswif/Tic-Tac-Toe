/*
 * @param{{
 * className: string,
 *  width: 'md' | 'full',
 * isOpen: boolean
 * onClose: Function
 * }} props
 * @returns
 *
 */

import { clsx } from "clsx";
import {createPortal} from "react-dom";

export function UiModal({ width = "md", className, children, isOpen = false, onClose }) {

  const handleClose = (e) => {
    console.log(e.target.closest("[modal]"));
    onClose()
  }

  if (!isOpen) {
    return null
  }

  const modal = (
    <div
      className={clsx(
        "fixed inset-0 bg-slate-900/60 backdrop-blur pt-10 pb-10 flex overflow-y-auto",
        "items-start justify-center",
        className,
      )}
    >
      <div
        data-id="modal"
        className={clsx(
          "bg-white rounded-lg min-h-[320px] relative flex flex-col",
          {
            md: "max-w-[640px] w-full",
            full: "w-full mx-5",
          }[width],
        )}
      >
        <button
          onClick={onClose}
          className="
        absolute top-0 left-[calc(100%+12px)] w-8 h-8 flex items-center justify-center
        bg-white/10 rounded-full hover:bg-white/30 transition-colors">
          <CrossLightIcon className="w-4 h-4 text-white" />
        </button>
        {children}
      </div>
    </div>
  );
  return createPortal(modal, document.getElementById("modals"));
}

UiModal.Header = function UiModalHeader({ children, className }) {
  return <div className={clsx(className, "px-6 pt-6 pb-6 text-2xl")}>{children}</div>;
};

UiModal.Body = function UiModalHeader({ children, className }) {
  return <div className={clsx(className, "px-6")}>{children}</div>;
};

UiModal.Footer = function UiModalHeader({ children, className }) {
  return <div className={clsx(className, "mt-auto p-6 flex gap-4 justify-end")}>{children}</div>;
};

function CrossLightIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M19 5L5 19M5.00001 5L19 19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
