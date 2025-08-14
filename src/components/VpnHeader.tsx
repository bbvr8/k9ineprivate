import { Shield, Wifi } from "lucide-react";

interface VpnHeaderProps {
  isConnected: boolean;
}

export const VpnHeader = ({ isConnected }: VpnHeaderProps) => {
  return (
    <header className="flex items-center justify-between p-6 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
          <Shield className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">K9INE VPN +</h1>
          <p className="text-sm text-muted-foreground">Secure Connection</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
          isConnected 
            ? 'bg-success/20 text-success' 
            : 'bg-destructive/20 text-destructive'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-success' : 'bg-destructive'
          } ${isConnected ? 'animate-pulse' : ''}`} />
          <span className="text-sm font-medium">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        <Wifi className={`w-5 h-5 ${
          isConnected ? 'text-success' : 'text-muted-foreground'
        }`} />
      </div>
    </header>
  );
};