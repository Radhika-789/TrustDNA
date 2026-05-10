import { motion } from 'framer-motion';
import { Globe, Database, ArrowRight, Network } from 'lucide-react';

export default function ThreatRegistry() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Layer 5: Federated Threat Registry</h1>
        <p className="text-slate-400 text-sm mt-1">National ecosystem converting local detection into global prevention.</p>
      </div>

      <div className="glass-panel-light p-8 rounded-xl border border-white/10 flex flex-col items-center justify-center min-h-[400px]">
        <Network className="w-16 h-16 text-secondary mb-6 opacity-80" />
        <h2 className="text-xl font-medium text-white mb-2">Federated Node Connected</h2>
        <p className="text-slate-400 text-center max-w-lg mb-8">
          This node is actively sharing anonymized threat signatures with 34 partner institutions. A threat blocked by one bank instantly protects all connected banks.
        </p>
        
        <div className="w-full max-w-3xl border border-white/5 rounded-lg overflow-hidden bg-background/50">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 bg-white/5 border-b border-white/5">
              <tr>
                <th className="px-4 py-3 font-medium">Timestamp</th>
                <th className="px-4 py-3 font-medium">Threat Signature (Hash)</th>
                <th className="px-4 py-3 font-medium">Source Node</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-slate-400 font-mono text-xs">10:42:05</td>
                <td className="px-4 py-3 text-white font-mono text-xs">e3b0c44298fc1c14...</td>
                <td className="px-4 py-3 text-slate-300">HDFC_Node_02</td>
                <td className="px-4 py-3"><span className="text-success text-xs bg-success/20 px-2 py-0.5 rounded border border-success/30">PROPAGATED</span></td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-slate-400 font-mono text-xs">10:41:12</td>
                <td className="px-4 py-3 text-white font-mono text-xs">8d969eef6ecad3c2...</td>
                <td className="px-4 py-3 text-slate-300">SBI_TrustDNA_Main</td>
                <td className="px-4 py-3"><span className="text-success text-xs bg-success/20 px-2 py-0.5 rounded border border-success/30">PROPAGATED</span></td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-slate-400 font-mono text-xs">10:38:44</td>
                <td className="px-4 py-3 text-white font-mono text-xs">9a2a953e5e6e737d...</td>
                <td className="px-4 py-3 text-slate-300">ICICI_Sec_Gateway</td>
                <td className="px-4 py-3"><span className="text-success text-xs bg-success/20 px-2 py-0.5 rounded border border-success/30">PROPAGATED</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
