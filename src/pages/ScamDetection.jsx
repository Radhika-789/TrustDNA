import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, AlertCircle, ShieldCheck } from 'lucide-react';

export default function ScamDetection() {
  const [messages, setMessages] = useState([
    { id: 1, sender: '+91 98765 43210', text: 'Dear Customer, your SBI YONO account will be BLOCKED today. Update KYC via link immediately: http://sbi-kyc-update.apk', isScam: true, language: 'English' },
    { id: 2, sender: 'SBI-ALERTS', text: 'OTP for your transaction of Rs. 1000 is 456123. Do not share this with anyone.', isScam: false, language: 'English' },
    { id: 3, sender: '+91 87654 32109', text: 'प्रिय ग्राहक, आपका YONO अकाउंट सस्पेंड हो गया है। इसे चालू करने के लिए तुरंत यह ऐप इंस्टॉल करें: http://yono-secure.apk', isScam: true, language: 'Hindi' },
  ]);

  const [selectedMsg, setSelectedMsg] = useState(messages[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Layer 2: Conversational Context AI</h1>
        <p className="text-slate-400 text-sm mt-1">Multilingual social engineering detection operating upstream of installation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Inbox */}
        <div className="glass-panel-light rounded-xl border border-white/10 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-white/5">
            <h3 className="font-medium text-white flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" /> Captured Messages
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {messages.map(msg => (
              <div 
                key={msg.id}
                onClick={() => setSelectedMsg(msg)}
                className={`p-3 rounded-lg cursor-pointer border transition-colors ${selectedMsg.id === msg.id ? 'bg-primary/10 border-primary/30' : 'bg-transparent border-transparent hover:bg-white/5'}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm text-slate-200">{msg.sender}</span>
                  {msg.isScam ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-danger/20 text-danger border border-danger/20">SCAM</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-success/20 text-success border border-success/20">SAFE</span>
                  )}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{msg.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Details */}
        <div className="lg:col-span-2 glass-panel-light rounded-xl border border-white/10 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <h3 className="font-medium text-white">NLP Threat Analysis</h3>
            <span className="text-xs text-slate-400">Model: IndicNLP-Sec-v2</span>
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            {/* Phone visualization */}
            <div className="mx-auto w-64 h-auto min-h-[120px] bg-slate-800 rounded-xl border-4 border-slate-700 p-4 mb-8 relative shadow-2xl">
              <div className="text-xs text-slate-400 mb-2 font-medium">{selectedMsg.sender}</div>
              <div className={`p-3 rounded-lg text-sm ${selectedMsg.isScam ? 'bg-slate-700 text-slate-200' : 'bg-slate-700 text-slate-200'}`}>
                {selectedMsg.text}
              </div>
              
              {selectedMsg.isScam && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -bottom-4 -right-4 bg-danger text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center border-2 border-slate-800 z-10"
                >
                  <AlertCircle className="w-3 h-3 mr-1" /> BLOCKED
                </motion.div>
              )}
            </div>

            {/* AI Breakdown */}
            <div className="flex-1">
              <h4 className="text-sm font-medium text-slate-300 mb-4 border-b border-white/10 pb-2">Contextual Breakdown</h4>
              
              {selectedMsg.isScam ? (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-danger mt-1.5 mr-3 shadow-[0_0_5px_var(--color-danger)]"></div>
                    <div>
                      <span className="text-sm text-slate-200 block font-medium">Urgency Phrase Detection</span>
                      <span className="text-xs text-slate-400">Detected "{selectedMsg.language === 'English' ? 'BLOCKED today' : 'सस्पेंड हो गया है'}". Induces panic to override rational judgment.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-danger mt-1.5 mr-3 shadow-[0_0_5px_var(--color-danger)]"></div>
                    <div>
                      <span className="text-sm text-slate-200 block font-medium">Suspicious Link Pattern</span>
                      <span className="text-xs text-slate-400">URL contains '.apk' extension from non-SBI domain. High risk indicator.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-warning mt-1.5 mr-3 shadow-[0_0_5px_var(--color-warning)]"></div>
                    <div>
                      <span className="text-sm text-slate-200 block font-medium">Sender Identity Anomaly</span>
                      <span className="text-xs text-slate-400">Financial alerts originating from unverified 10-digit mobile number instead of TRAI-registered header.</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-3 bg-danger/10 border border-danger/20 rounded-lg">
                    <div className="text-xs text-danger uppercase font-bold tracking-wider mb-1">Decision Engine</div>
                    <p className="text-sm text-slate-200">Confidence Score: <span className="text-danger font-bold">98.4%</span> (Social Engineering). Overlaid warning on device.</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <ShieldCheck className="w-12 h-12 text-success mb-3 opacity-50" />
                  <p className="text-slate-300 font-medium">Message is Safe</p>
                  <p className="text-xs text-slate-500 mt-1">Matches verified SBI transactional template. Sender header verified via L5 Registry.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
