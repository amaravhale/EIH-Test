"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "error" | "success";
}

export interface UserInfo {
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
}

export interface HeaderProps {
  user: UserInfo;
  notifications?: Notification[];
  onSearchClick?: () => void;
  onNotificationClick?: (notification: Notification) => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function Header({
  user,
  notifications = [],
  onSearchClick,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onLogout,
  className,
  children,
}: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifTypeColors: Record<string, string> = {
    info: "bg-blue-500",
    warning: "bg-amber-500",
    error: "bg-red-500",
    success: "bg-emerald-500",
  };

  return (
    <header
      className={cn(
        "flex h-14 items-center justify-between border-b border-border bg-card px-4",
        className
      )}
    >
      {/* Left side: breadcrumbs or custom children */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {children}
      </div>

      {/* Right side: actions */}
      <div className="flex items-center gap-1">
        {/* Search */}
        <button
          onClick={onSearchClick}
          className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full z-50 mt-1 w-80 rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
              <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-zinc-500">
                    {unreadCount} unread
                  </span>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-zinc-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <button
                      key={notif.id}
                      onClick={() => {
                        onNotificationClick?.(notif);
                        setNotifOpen(false);
                      }}
                      className={cn(
                        "flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800",
                        !notif.read && "bg-blue-50/50 dark:bg-blue-950/20"
                      )}
                    >
                      <div
                        className={cn(
                          "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                          notifTypeColors[notif.type]
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                          {notif.title}
                        </p>
                        <p className="text-xs text-zinc-500 line-clamp-2 mt-0.5">
                          {notif.description}
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-1">
                          {notif.time}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative ml-2" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
            )}
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {user.name}
              </p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
              <div className="border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {user.name}
                </p>
                <p className="text-xs text-zinc-500">{user.email}</p>
                {user.role && (
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {user.role}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  onProfileClick?.();
                  setUserMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                <User className="h-4 w-4" />
                Profile
              </button>
              <button
                onClick={() => {
                  onSettingsClick?.();
                  setUserMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <div className="my-1 border-t border-zinc-200 dark:border-zinc-700" />
              <button
                onClick={() => {
                  onLogout?.();
                  setUserMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
