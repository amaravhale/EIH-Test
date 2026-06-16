import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";

export default function OrganisationSettingsPage() {
  const members = [
    { name: "Jane Doe", email: "jane@empirisys.com", role: "Admin", status: "Active" },
    { name: "John Smith", email: "john@empirisys.com", role: "Member", status: "Active" },
    { name: "Alice Jones", email: "alice@empirisys.com", role: "Viewer", status: "Invited" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Organisation Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your team, billing, and global workspace settings.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Organisation Details</CardTitle>
          <CardDescription>
            Basic information about your organisation on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orgName">Organisation Name</Label>
            <Input id="orgName" defaultValue="Empirisys Ltd" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="domain">Verified Domain</Label>
            <div className="flex items-center gap-2">
              <Input id="domain" defaultValue="empirisys.com" disabled />
              <Badge variant="success">Verified</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Members</CardTitle>
            <CardDescription>Manage who has access to this workspace.</CardDescription>
          </div>
          <Button size="sm">Invite Member</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm leading-none">{member.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
