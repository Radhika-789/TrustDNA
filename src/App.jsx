import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Smartphone, MessageSquareWarning, Activity, Globe, Menu, X, Fingerprint } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import Dashboard from './pages/Dashboard';
import APKScanner from './pages/APKScanner';
import ScamDetection from './pages/ScamDetection';
import BehavioralAuth from './pages/BehavioralAuth';
import ThreatRegistry from './pages/ThreatRegistry';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Fraud Intelligence', icon: Activity },
    { path: '/apk-scanner', label: 'L1/L3: APK Analysis', icon: Shield },
    { path: '/scam-detection', label: 'L2: Context AI', icon: MessageSquareWarning },
    { path: '/behavioral-auth', label: 'L4: Behavioral Auth', icon: Fingerprint },
    { path: '/threat-registry', label: 'L5: Threat Registry', icon: Globe },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={{ width: 260 }}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="glass-panel flex flex-col z-20 h-full border-r border-white/5 relative transition-all duration-300"
      >
        <div className="flex items-center h-16 px-4 border-b border-white/5">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 text-primary">
            <Shield className="w-6 h-6" />
          </div>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-3 font-bold text-xl tracking-tight"
            >
              <span className="text-white">Trust</span><span className="text-primary">DNA</span>
            </motion.div>
          )}
          
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="ml-auto text-slate-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative",
                  isActive 
                    ? "bg-primary/20 text-primary shadow-[0_0_15px_rgba(0,180,216,0.3)]" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
                title={!isSidebarOpen ? item.label : undefined}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md shadow-[0_0_10px_#00b4d8]" 
                  />
                )}
                <Icon className={clsx("w-5 h-5 flex-shrink-0", isActive ? "text-primary" : "group-hover:text-primary transition-colors")} />
                
                {isSidebarOpen && (
                  <span className="ml-3 font-medium whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/5">
          <div className={clsx("flex items-center", !isSidebarOpen && "justify-center")}>
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-sm font-medium overflow-hidden">
               <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="Admin" />
            </div>
            {isSidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium text-white">System Admin</p>
                <p className="text-xs text-slate-400">SOC Level 3</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 glass-panel z-10">
          <div className="flex items-center text-sm text-slate-400">
            <span className="flex items-center text-success">
              <span className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse shadow-[0_0_8px_#06d6a0]"></span>
              System Active & Monitoring
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1 rounded-full bg-danger/10 border border-danger/20 text-danger text-xs font-semibold flex items-center">
              <Activity className="w-3 h-3 mr-1" />
              12 Active Threats
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/apk-scanner" element={<APKScanner />} />
            <Route path="/scam-detection" element={<ScamDetection />} />
            <Route path="/behavioral-auth" element={<BehavioralAuth />} />
            <Route path="/threat-registry" element={<ThreatRegistry />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
