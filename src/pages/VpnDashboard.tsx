import { useState } from "react";
import { VpnHeader } from "@/components/VpnHeader";
import { ServerList, Server } from "@/components/ServerList";
import { ConnectionPanel } from "@/components/ConnectionPanel";
import { toast } from "sonner";

const US_SERVERS: Server[] = [
  { id: "us-dallas", name: "US Dallas", city: "Dallas", state: "Texas", ping: 25, load: 15 },
  { id: "us-ny", name: "US East", city: "New York", state: "New York", ping: 32, load: 28 },
  { id: "us-la", name: "US West", city: "Los Angeles", state: "California", ping: 18, load: 42 },
  { id: "us-chicago", name: "US Central", city: "Chicago", state: "Illinois", ping: 28, load: 35 },
  { id: "us-miami", name: "US Southeast", city: "Miami", state: "Florida", ping: 35, load: 22 },
  { id: "us-seattle", name: "US Northwest", city: "Seattle", state: "Washington", ping: 22, load: 38 },
  { id: "us-denver", name: "US Mountain", city: "Denver", state: "Colorado", ping: 30, load: 19 },
  { id: "us-atlanta", name: "US South", city: "Atlanta", state: "Georgia", ping: 33, load: 45 },
  { id: "us-phoenix", name: "US Southwest", city: "Phoenix", state: "Arizona", ping: 26, load: 31 },
  { id: "us-boston", name: "US Northeast", city: "Boston", state: "Massachusetts", ping: 29, load: 24 }
];

export const VpnDashboard = () => {
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleServerSelect = (server: Server) => {
    if (isConnected) {
      toast.info("Disconnect first to change servers");
      return;
    }
    setSelectedServer(server);
    toast.success(`Selected ${server.name} - ${server.city}, ${server.state}`);
  };

  const handleToggleConnection = async () => {
    if (!selectedServer && !isConnected) {
      toast.error("Please select a server first");
      return;
    }

    setIsConnecting(true);
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!isConnected) {
      setIsConnected(true);
      toast.success(`Connected to ${selectedServer?.name} - ${selectedServer?.city}, ${selectedServer?.state}`);
    } else {
      setIsConnected(false);
      toast.info("Disconnected from VPN");
    }
    
    setIsConnecting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <VpnHeader isConnected={isConnected} />
      
      <div className="container mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <ConnectionPanel 
              selectedServer={selectedServer}
              isConnected={isConnected}
              onToggleConnection={handleToggleConnection}
            />
          </div>
          
          <div>
            <ServerList 
              servers={US_SERVERS}
              selectedServer={selectedServer}
              onServerSelect={handleServerSelect}
              isConnected={isConnected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};