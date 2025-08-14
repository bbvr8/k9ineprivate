import { useState } from "react";
import { MapPin, Zap, Signal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Server {
  id: string;
  name: string;
  city: string;
  state: string;
  ping: number;
  load: number;
}

interface ServerListProps {
  servers: Server[];
  selectedServer: Server | null;
  onServerSelect: (server: Server) => void;
  isConnected: boolean;
}

export const ServerList = ({ servers, selectedServer, onServerSelect, isConnected }: ServerListProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedServers = showAll ? servers : servers.slice(0, 5);

  const getLoadColor = (load: number) => {
    if (load < 30) return 'text-server-good';
    if (load < 70) return 'text-server-medium';
    return 'text-server-poor';
  };

  const getLoadBgColor = (load: number) => {
    if (load < 30) return 'bg-server-good/20';
    if (load < 70) return 'bg-server-medium/20';
    return 'bg-server-poor/20';
  };

  const getPingColor = (ping: number) => {
    if (ping < 50) return 'text-server-good';
    if (ping < 100) return 'text-server-medium';
    return 'text-server-poor';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">US Servers</h2>
        <span className="text-sm text-muted-foreground">{servers.length} available</span>
      </div>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {displayedServers.map((server) => (
          <Card 
            key={server.id} 
            className={`p-4 cursor-pointer transition-all hover:bg-accent/50 ${
              selectedServer?.id === server.id 
                ? 'ring-2 ring-primary bg-accent/30' 
                : ''
            } ${isConnected && selectedServer?.id === server.id ? 'shadow-[0_0_20px_hsl(var(--vpn-glow))]' : ''}`}
            onClick={() => onServerSelect(server)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{server.name}</p>
                  <p className="text-sm text-muted-foreground">{server.city}, {server.state}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Signal className={`w-4 h-4 ${getPingColor(server.ping)}`} />
                  <span className={`text-sm ${getPingColor(server.ping)}`}>{server.ping}ms</span>
                </div>
                
                <div className={`flex items-center gap-1 px-2 py-1 rounded ${getLoadBgColor(server.load)}`}>
                  <Zap className={`w-3 h-3 ${getLoadColor(server.load)}`} />
                  <span className={`text-xs font-medium ${getLoadColor(server.load)}`}>{server.load}%</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {servers.length > 5 && (
        <Button 
          variant="ghost" 
          onClick={() => setShowAll(!showAll)}
          className="w-full"
        >
          {showAll ? 'Show Less' : `Show All ${servers.length} Servers`}
        </Button>
      )}
    </div>
  );
};