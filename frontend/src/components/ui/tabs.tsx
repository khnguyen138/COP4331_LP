import React, { useState } from "react";

interface TabsProps {
  defaultValue: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  onValueChange,
  className,
  children,
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <div className={`tabs ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<any>, {
          activeTab,
          onTabChange: handleTabChange,
        })
      )}
    </div>
  );
};

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export const TabsList: React.FC<TabsListProps> = ({ className, children }) => {
  return <div className={`tabs-list ${className}`}>{children}</div>;
};

interface TabsTriggerProps {
  value: string;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  activeTab,
  onTabChange,
  className,
  children,
}) => {
  const isActive = activeTab === value;

  return (
    <button
      className={`tabs-trigger ${isActive ? "active" : ""} ${className}`}
      onClick={() => onTabChange && onTabChange(value)}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  activeTab?: string;
  className?: string;
  children: React.ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  activeTab,
  className,
  children,
}) => {
  if (activeTab !== value) {
    return null;
  }

  return <div className={`tabs-content ${className}`}>{children}</div>;
};
