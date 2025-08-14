import { useState, useEffect } from "react";
import { Power, Download, Upload, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Server } from "./ServerList";
import { toast } from "sonner";

interface ConnectionPanelProps {
  selectedServer: Server | null;
  isConnected: boolean;
  onToggleConnection: () => void;
}

export const ConnectionPanel = ({ selectedServer, isConnected, onToggleConnection }: ConnectionPanelProps) => {
  const [connectionTime, setConnectionTime] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);

  // Simulate connection time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setConnectionTime(prev => prev + 1);
      }, 1000);
    } else {
      setConnectionTime(0);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  // Simulate network speeds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setDownloadSpeed(Math.floor(Math.random() * 50) + 10);
        setUploadSpeed(Math.floor(Math.random() * 20) + 5);
      }, 2000);
    } else {
      setDownloadSpeed(0);
      setUploadSpeed(0);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleConnection = () => {
    if (!selectedServer && !isConnected) {
      toast.error("Please select a server first");
      return;
    }
    onToggleConnection();
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className={`relative w-24 h-24 rounded-full border-4 transition-all duration-500 ${
              isConnected 
                ? 'border-success bg-success/20 shadow-[0_0_30px_hsl(var(--vpn-glow))]' 
                : 'border-muted bg-muted/20'
            }`}>
              <Button
                size="icon"
                variant="ghost"
                className={`w-full h-full rounded-full transition-all ${
                  isConnected 
                    ? 'text-success hover:bg-success/20' 
                    : 'text-muted-foreground hover:bg-muted/30'
                }`}
                onClick={handleToggleConnection}
              >
                <Power className="w-8 h-8" />
              </Button>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">
              {isConnected ? 'Connected to' : 'Ready to connect'}
            </p>
            <p className="font-semibold text-foreground">
              {selectedServer ? `${selectedServer.name} - ${selectedServer.city}, ${selectedServer.state}` : 'No server selected'}
            </p>
          </div>
          
          <Button 
            onClick={handleToggleConnection}
            size="lg"
            className={`w-full ${
              isConnected 
                ? 'bg-destructive hover:bg-destructive/90' 
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isConnected ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
      </Card>

      {isConnected && (
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Connection Time</p>
            <p className="font-mono text-sm font-semibold">{formatTime(connectionTime)}</p>
          </Card>
          
          <Card className="p-4 text-center">
            <Download className="w-5 h-5 text-success mx-auto mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Download</p>
            <p className="font-mono text-sm font-semibold">{downloadSpeed} Mbps</p>
          </Card>
          
          <Card className="p-4 text-center">
            <Upload className="w-5 h-5 text-warning mx-auto mb-2" />
            <p className="text-xs text-muted-foreground mb-1">Upload</p>
            <p className="font-mono text-sm font-semibold">{uploadSpeed} Mbps</p>
          </Card>
        </div>
      )}
    </div>
  );
};