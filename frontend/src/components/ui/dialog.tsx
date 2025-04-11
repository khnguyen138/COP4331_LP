import React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  return (
    <div
      className={`modal ${open ? "show" : ""}`}
      style={{ display: open ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">{children}</div>
      </div>
      {open && (
        <div
          className="modal-backdrop fade show"
          onClick={() => onOpenChange(false)}
        />
      )}
    </div>
  );
};

interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
}

export const DialogContent: React.FC<DialogContentProps> = ({
  className,
  children,
}) => {
  return <div className={`modal-body ${className}`}>{children}</div>;
};

interface DialogHeaderProps {
  children: React.ReactNode;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
  return <div className="modal-header">{children}</div>;
};

interface DialogTitleProps {
  children: React.ReactNode;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => {
  return <h5 className="modal-title">{children}</h5>;
};

interface DialogDescriptionProps {
  children: React.ReactNode;
}

export const DialogDescription: React.FC<DialogDescriptionProps> = ({
  children,
}) => {
  return <div className="modal-description">{children}</div>;
};

interface DialogTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({ children }) => {
  return <>{children}</>;
};
