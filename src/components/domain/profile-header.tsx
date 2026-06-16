import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ExternalLink, Edit, ArrowLeft, Building2, MapPin, Users, Globe } from "lucide-react";
import Link from "next/link";

interface ProfileHeaderProps {
  competitor: any;
}

export function ProfileHeader({ competitor }: ProfileHeaderProps) {
  return (
    <div className="space-y-4">
      <Link href="/competitors/profiles" className="text-sm text-muted-foreground hover:text-foreground flex items-center w-fit">
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Competitors
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b pb-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20 border-2 border-border shadow-sm">
            <AvatarFallback className="bg-primary/5 text-primary text-2xl font-bold">
              {competitor.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{competitor.name}</h1>
              <Badge variant="destructive" className="uppercase">Critical Threat</Badge>
            </div>
            
            <p className="text-lg text-muted-foreground">{competitor.sector}</p>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {competitor.hq}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" /> {competitor.size} employees
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" /> 
                <a href={`https://${competitor.website}`} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">
                  {competitor.website}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          <Button size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit Website
          </Button>
        </div>
      </div>
    </div>
  );
}
