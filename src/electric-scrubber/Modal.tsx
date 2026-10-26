
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode, MouseEvent } from "react";

interface ModalProps {
  title: string;
  children?: ReactNode;
  onClose: () => void;
}

export default function Modal({
  title,
  children,
  onClose,
}: ModalProps) {
  const titleId = useId();

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  // Always reference the latest close function.
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Manage keyboard access, focus and background scrolling.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const getFocusableElements = () => {
      if (!modalRef.current) return [];

      return Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
          ].join(",")
        )
      ).filter(
        (element) =>
          element.getClientRects().length > 0 &&
          element.getAttribute("aria-hidden") !== "true"
      );
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        event.preventDefault();
        modalRef.current?.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;

      if (
        !modalRef.current?.contains(active) ||
        (event.shiftKey && active === first)
      ) {
        event.preventDefault();

        if (event.shiftKey) {
          last.focus();
        } else {
          first.focus();
        }

        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, []);

  const handleBackdropClick = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#071024]/80 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex max-h-[90dvh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:rounded-3xl"
      >
        {/* MODAL HEADER */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-100 bg-[#F8FAFC] px-5 py-5 sm:px-7">
          <div>
            <p className="mb-1 text-xs font-black uppercase tracking-[0.15em] text-[#B88912]">
              Customer Information
            </p>

            <h2
              id={titleId}
              className="text-xl font-black leading-tight text-[#101A35] sm:text-2xl"
            >
              {title}
            </h2>
          </div>

          {/* CLOSE ICON */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-2xl leading-none text-slate-500 transition hover:border-[#D5A51E] hover:bg-amber-50 hover:text-[#101A35]"
          >
            &times;
          </button>
        </div>

        {/* SCROLLABLE MODAL CONTENT */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 text-sm leading-7 text-slate-700 sm:px-7 sm:text-base">
          {children}
        </div>

        {/* MODAL FOOTER */}
        <div className="shrink-0 border-t border-slate-100 bg-white px-5 py-4 sm:px-7">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-[#101A35] px-6 py-3.5 text-base font-black text-white shadow-md transition hover:bg-[#1C2D55] active:scale-[0.99]"
          >
            Close
          </button>
        </div>

        {/* GOLD ACCENT */}
        <div
          className="h-1 shrink-0 bg-[#D5A51E]"
          aria-hidden="true"
        />
      </div>
    </div>,
    document.body
  );
}
