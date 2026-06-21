"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

interface UserContextType {
  user: User;
  updateUser: (updates: Partial<User>) => void;
}

const defaultUser: User = {
  name: "Alex Rivera",
  email: "alex.rivera@empirisys.com",
  role: "Senior Analyst",
  avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem("empirisys-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
  }, []);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      const newUser = { ...prev, ...updates };
      localStorage.setItem("empirisys-user", JSON.stringify(newUser));
      return newUser;
    });
  };

  if (!mounted) {
    // Optionally return null or children directly while unmounted to avoid hydration mismatch,
    // but returning children with default user might cause text mismatch if data changed.
    // It's usually fine if we only use it deep in the tree or handle hydration in components.
    return <UserContext.Provider value={{ user: defaultUser, updateUser }}>{children}</UserContext.Provider>;
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
