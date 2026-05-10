import { motion } from 'framer-motion';
import { ShieldAlert, Users, Smartphone, Globe, ShieldCheck } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, colorClass, danger }) => (
  <div className="glass-panel-light p-5 rounded-xl border-l-4" style={{ borderLeftColor: danger ? 'var(--color-danger)' : 'var(--color-primary)' }}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1 tracking-tight text-white">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className={danger ? "text-danger font-medium" : "text-success font-medium"}>{change}</span>
      <span className="text-slate-500 ml-2">vs last 24h</span>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Fraud Intelligence Center</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time overview of TrustDNA ecosystem protection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Phishing Campaigns" 
          value="12" 
          change="+3 new" 
          icon={ShieldAlert}
          colorClass="bg-danger/20 text-danger"
          danger={true}
        />
        <StatCard 
          title="Total Devices Protected" 
          value="45.2M" 
          change="+120k" 
          icon={Smartphone}
          colorClass="bg-primary/20 text-primary"
        />
        <StatCard 
          title="Threats Blocked (Today)" 
          value="8,492" 
          change="+12%" 
          icon={ShieldCheck}
          colorClass="bg-success/20 text-success"
        />
        <StatCard 
          title="Federated Nodes" 
          value="34" 
          change="All Active" 
          icon={Globe}
          colorClass="bg-secondary/20 text-secondary"
        />
      </div>

      {/* Map Placeholder */}
      <div className="glass-panel-light rounded-xl p-6 h-96 relative flex items-center justify-center overflow-hidden border border-white/10">
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/4b/India_location_map.svg')] bg-contain bg-center bg-no-opacity opacity-10 blur-[1px]"></div>
        <div className="text-center z-10">
          <Globe className="w-16 h-16 text-primary mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-medium text-white">Live Threat Map</h3>
          <p className="text-slate-400 mt-2">Connecting to federated intelligence nodes...</p>
        </div>
      </div>
    </motion.div>
  );
}
