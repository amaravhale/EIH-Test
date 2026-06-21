"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/user-context";

export default function SettingsPage() {
  const { user, updateUser } = useUser();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  }, [user]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateUser({ name, email, role });
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account preferences, notifications, and team access."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-700">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-700">Email Address</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-700">Role</label>
              <Input value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              {saveSuccess && <span className="text-sm text-green-600 font-medium">Saved!</span>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Control what alerts you receive.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-sm text-zinc-900">Critical Threat Alerts</p>
                <p className="text-xs text-zinc-500">Immediate email notifications for critical risks.</p>
              </div>
              <div className="h-5 w-9 rounded-full bg-blue-600 flex items-center p-0.5 cursor-pointer">
                <div className="h-4 w-4 rounded-full bg-white translate-x-4 shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-sm text-zinc-900">Weekly Digest</p>
                <p className="text-xs text-zinc-500">Summary of market signals every Monday.</p>
              </div>
              <div className="h-5 w-9 rounded-full bg-blue-600 flex items-center p-0.5 cursor-pointer">
                <div className="h-4 w-4 rounded-full bg-white translate-x-4 shadow-sm"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
