import React, { useEffect, useState } from "react";

/**
 * Toast Component
 *
 * @param {Object} props
 * @param {string} props.message - The message to display
 * @param {string} props.status - Status type (success, error, warning, info)
 * @param {number} props.duration - Duration in milliseconds (default: 3000)
 * @param {string} props.position - Position of toast (format: 'vertical-horizontal')
 *                                 e.g., 'top-end', 'bottom-start', 'middle-center'
 *                                 default: 'bottom-end'
 * @param {boolean} props.show - Whether to show the toast
 * @param {function} props.onClose - Callback when toast is closed
 */
const Toast = ({
  message,
  status = "success",
  duration = 3000,
  position = "bottom-end",
  show = true,
  onClose,
}) => {
  const [visible, setVisible] = useState(show);

  // Parse the position into vertical and horizontal components
  const [vertical, horizontal] = position.split("-");

  useEffect(() => {
    setVisible(show);

    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  // Map status to alert types
  const alertClass =
    {
      success: "alert-success",
      error: "alert-error",
      warning: "alert-warning",
      info: "alert-info",
    }[status] || "alert-info";

  // Create position classes
  const positionClasses = [
    "toast",
    horizontal === "start"
      ? "toast-start"
      : horizontal === "center"
      ? "toast-center"
      : "toast-end",
    vertical === "top"
      ? "toast-top"
      : vertical === "middle"
      ? "toast-middle"
      : "toast-bottom",
  ].join(" ");

  if (!visible) return null;

  return (
    <div className={positionClasses}>
      <div className={`alert ${alertClass}`}>
        <div>
          <span className="font-hind font-bold">{message}</span>
        </div>
        {onClose && (
          <button
            onClick={() => {
              setVisible(false);
              onClose();
            }}
            className="btn btn-sm btn-ghost"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
