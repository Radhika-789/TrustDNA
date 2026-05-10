import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileSearch, ShieldAlert, AlertTriangle, Loader2, FileCode } from 'lucide-react';

export default function APKScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleScan = () => {
    if (!selectedFile) return;
    setIsScanning(true);
    setProgress(0);
    setScanComplete(false);
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsScanning(true);
          setTimeout(() => {
            setIsScanning(false);
            setScanComplete(true);
          }, 500);
          return 100;
        }
        return p + 5;
      });
    }, 200);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setScanComplete(false);
      setProgress(0);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setScanComplete(false);
      setProgress(0);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center">
          Layer 1 & 3: APK Identity & Sandbox Verification
        </h1>
        <p className="text-slate-400 text-sm mt-1">Upload a suspicious APK to verify against the TrustDNA registry.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div 
          className={`glass-panel-light p-8 rounded-xl border flex flex-col items-center justify-center text-center transition-all duration-200 ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-white/10'}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".apk"
            onChange={handleFileChange}
          />
          
          {!selectedFile ? (
            <>
              <div 
                className="w-24 h-24 rounded-full bg-white/5 border border-dashed border-white/20 flex items-center justify-center mb-6 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                 <UploadCloud className={`w-10 h-10 ${isDragging ? 'text-white' : 'text-primary'}`} />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Drag & Drop APK File</h3>
              <p className="text-sm text-slate-400 mb-6">Or click to browse (Max size: 50MB)</p>
            </>
          ) : (
            <>
              <div 
                className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                 <FileCode className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-white mb-1 truncate w-full px-4">{selectedFile.name}</h3>
              <p className="text-sm text-slate-400 mb-6">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for analysis</p>
            </>
          )}
          
          <button 
            onClick={handleScan}
            disabled={isScanning || !selectedFile}
            className={`px-6 py-3 font-medium rounded-lg transition-colors flex items-center ${
              !selectedFile ? 'bg-white/10 text-slate-400 cursor-not-allowed' : 
              isScanning ? 'bg-primary/50 text-white cursor-not-allowed' : 
              'bg-primary hover:bg-primary/90 text-background cursor-pointer shadow-[0_0_15px_rgba(0,180,216,0.4)]'
            }`}
          >
            {isScanning ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...</>
            ) : (
              <><FileSearch className="w-5 h-5 mr-2" /> Start Analysis</>
            )}
          </button>
        </div>

        <div className="glass-panel-light p-6 rounded-xl border border-white/10 relative overflow-hidden">
          {isScanning && (
            <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          )}
          
          <h3 className="text-lg font-medium text-white mb-4 z-10 relative">TrustDNA Verification Results</h3>
          
          {!isScanning && !scanComplete ? (
            <div className="flex flex-col items-center justify-center h-48 text-slate-500 z-10 relative">
              <ShieldAlert className="w-12 h-12 mb-3 opacity-20" />
              <p>Waiting for file upload...</p>
            </div>
          ) : (
            <div className="space-y-4 relative z-10">
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Analysis Progress</span>
                  <span className="text-primary font-mono">{progress}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all duration-200" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className={`flex justify-between items-center p-3 rounded bg-background/50 border ${progress > 20 ? (scanComplete ? 'border-danger/30' : 'border-primary/30') : 'border-white/5'}`}>
                  <span className="text-slate-300">L1: Developer Certificate Hash</span>
                  {progress > 20 && <span className={scanComplete ? "text-danger" : "text-primary animate-pulse"}>{scanComplete ? "MISMATCH (Fake)" : "Verifying..."}</span>}
                </div>
                <div className={`flex justify-between items-center p-3 rounded bg-background/50 border ${progress > 40 ? (scanComplete ? 'border-danger/30' : 'border-primary/30') : 'border-white/5'}`}>
                  <span className="text-slate-300">L1: Backend API Endpoint Set</span>
                  {progress > 40 && <span className={scanComplete ? "text-danger" : "text-primary animate-pulse"}>{scanComplete ? "UNAUTHORIZED DOMAINS" : "Verifying..."}</span>}
                </div>
                <div className={`flex justify-between items-center p-3 rounded bg-background/50 border ${progress > 60 ? (scanComplete ? 'border-success/30' : 'border-primary/30') : 'border-white/5'}`}>
                  <span className="text-slate-300">L3: UI Rendering Sequence Hash</span>
                  {progress > 60 && <span className={scanComplete ? "text-success" : "text-primary animate-pulse"}>{scanComplete ? "MATCH (Visual Clone)" : "Verifying..."}</span>}
                </div>
                <div className={`flex justify-between items-center p-3 rounded bg-background/50 border ${progress > 80 ? (scanComplete ? 'border-danger/30' : 'border-primary/30') : 'border-white/5'}`}>
                  <span className="text-slate-300">L3: Pre-Install Sandbox</span>
                  {progress > 80 && <span className={scanComplete ? "text-danger" : "text-primary animate-pulse"}>{scanComplete ? "SMS READ REQUESTED" : "Running Sandbox..."}</span>}
                </div>
              </div>

              {scanComplete && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-danger/10 border border-danger/30 rounded-lg flex items-start"
                >
                  <AlertTriangle className="w-6 h-6 text-danger mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-danger font-bold">HIGH RISK: FAKE APP DETECTED</h4>
                    <p className="text-sm text-danger/80 mt-1">TrustDNA Match Score: 12%. Installation blocked. Structural anomalies found in signing cert and network endpoints.</p>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
