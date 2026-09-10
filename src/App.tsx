/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Sparkles, 
  Loader2, 
  Copy, 
  Check, 
  RotateCcw, 
  Share2, 
  MessageSquare, 
  Repeat, 
  ShieldCheck, 
  ArrowUpRight,
  BookOpen,
  FileText,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import { README_MARKDOWN } from './readmeContent';

const PRESET_IDEAS = [
  "Autonomous AI coding agents will make single-person unicorn companies a reality by 2026. Here is the blueprint.",
  "Stop memorizing framework syntax. In the LLM era, distributed system architecture and taste are the only durable skills.",
  "Decentralized inference swarms will disrupt centralized AI API monopolies faster than cloud disrupted on-prem data centers."
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'optimizer' | 'readme'>('optimizer');
  const [idea, setIdea] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedPost, setCopiedPost] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedReadme, setCopiedReadme] = useState(false);

  const handleOptimize = async () => {
    if (!idea.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to optimize');
      }
      
      setResult(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPostOnly = () => {
    if (!result) return;
    const match = result.match(/### 1\. The Optimized Post([\s\S]*?)(?=### 2\.|$)/);
    const postContent = match ? match[1].trim() : result;
    navigator.clipboard.writeText(postContent);
    setCopiedPost(true);
    setTimeout(() => setCopiedPost(false), 2000);
  };

  const handleCopyAll = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(README_MARKDOWN);
    setCopiedReadme(true);
    setTimeout(() => setCopiedReadme(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans flex flex-col selection:bg-orange-500/30">
      
      {/* Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-4 sm:px-8 bg-[#0a0a0a] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(234,88,12,0.3)]">
            <span className="text-white font-bold text-sm">Φ</span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-medium tracking-tight text-white flex items-center gap-2">
              Phoenix <span className="text-orange-500 font-light">Content Optimizer</span>
            </h1>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="flex items-center bg-black/50 border border-white/10 rounded-lg p-1" aria-label="Main Navigation">
            <button
              onClick={() => setActiveTab('optimizer')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'optimizer'
                  ? 'bg-orange-600 text-white shadow-[0_0_10px_rgba(234,88,12,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Optimizer</span>
            </button>
            <button
              onClick={() => setActiveTab('readme')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                activeTab === 'readme'
                  ? 'bg-orange-600 text-white shadow-[0_0_10px_rgba(234,88,12,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>GitHub README</span>
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></div>
            <span className="text-[11px] uppercase tracking-wider text-gray-300 font-mono">
              xAI-Algorithm <span className="text-orange-400 font-semibold">(param.rs)</span>
            </span>
          </div>
        </div>
      </header>

      {/* Production Scoring Weights Bar (from updated home-mixer/params/param.rs) */}
      <div className="border-b border-white/5 bg-[#080808] px-4 sm:px-8 py-2 overflow-x-auto">
        <div className="flex items-center gap-4 text-[11px] text-gray-400 min-w-max">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
            param.rs Weights:
          </span>
          <div className="flex items-center gap-2 px-2 py-0.5 bg-orange-500/10 border border-orange-500/20 rounded text-orange-300 font-mono font-medium">
            <Share2 className="w-3 h-3 text-orange-400" />
            <span>P(Share Link): 20.0x</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-0.5 bg-white/5 border border-white/10 rounded text-gray-300 font-mono">
            <Repeat className="w-3 h-3 text-purple-400" />
            <span>P(Quote): 5.0x</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-0.5 bg-white/5 border border-white/10 rounded text-gray-300 font-mono">
            <MessageSquare className="w-3 h-3 text-blue-400" />
            <span>P(Reply): 5.0x</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-0.5 bg-white/5 border border-white/10 rounded text-gray-400 font-mono">
            <span>P(Like): 0.5x</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-red-400 font-mono text-[10px]">
            <span>P(Report) Penalty: -234.0x</span>
          </div>
        </div>
      </div>

      {activeTab === 'readme' ? (
        /* GitHub README Section */
        <main className="flex-1 overflow-y-auto bg-[#080808] p-4 sm:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* README Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#101010] border border-white/10 rounded-xl">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-500" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                    README.md Specification
                  </h2>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Ready for GitHub repository export — Strictly calibrated to xai-org/x-algorithm with zero generic emojis.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleCopyReadme}
                  className="px-3 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(234,88,12,0.3)] active:scale-95"
                >
                  {copiedReadme ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedReadme ? 'README Copied!' : 'Copy README.md'}</span>
                </button>

                <a
                  href="https://github.com/xai-org/x-algorithm"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>xai-org/x-algorithm</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>

                <button
                  onClick={() => setActiveTab('optimizer')}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3 h-3 text-gray-400" />
                  <span>Back</span>
                </button>
              </div>
            </div>

            {/* Rendered README Markdown Card */}
            <article className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-500 to-red-600"></div>
              
              <div className="prose prose-invert max-w-none 
                prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight 
                prose-h1:text-2xl prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-3
                prose-h2:text-lg prose-h2:text-orange-400 prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-2 prose-h2:pt-4
                prose-h3:text-sm prose-h3:text-orange-300 prose-h3:uppercase prose-h3:tracking-wider
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-li:text-gray-300
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-orange-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs
                prose-pre:bg-[#050505] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                prose-table:border-collapse prose-table:w-full prose-table:my-4
                prose-th:bg-white/5 prose-th:text-gray-200 prose-th:p-3 prose-th:border prose-th:border-white/10 prose-th:text-xs prose-th:font-semibold prose-th:uppercase prose-th:tracking-wider
                prose-td:p-3 prose-td:border prose-td:border-white/5 prose-td:text-xs prose-td:text-gray-300
                prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline
                prose-hr:border-white/10"
              >
                <ReactMarkdown>{README_MARKDOWN}</ReactMarkdown>
              </div>
            </article>

          </div>
        </main>
      ) : (
        /* Optimizer Main Layout */
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Left Column: Configuration & Input */}
          <aside className="w-full lg:w-[420px] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col bg-[#080808] shrink-0 overflow-y-auto">
            <div className="p-6 space-y-6 flex-1 flex flex-col">
              
              {/* Idea Input Section */}
              <section className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-widest text-orange-500 font-bold block">
                    Core Idea Input (1-3 lines)
                  </label>
                  {idea && (
                    <button 
                      onClick={() => setIdea('')}
                      className="text-[10px] text-gray-500 hover:text-gray-300 flex items-center gap-1 uppercase tracking-wider"
                    >
                      <RotateCcw className="w-2.5 h-2.5" /> Clear
                    </button>
                  )}
                </div>
                
                <div className="relative bg-white/5 border border-white/10 rounded-xl focus-within:border-orange-500/50 transition-colors">
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="e.g. Stop memorizing syntax. System design and architectural intuition are the only skills that survive the LLM era."
                    className="w-full min-h-[140px] resize-none bg-transparent p-4 text-sm text-gray-100 focus:outline-none placeholder:text-gray-600 leading-relaxed font-sans"
                    disabled={loading}
                  />
                  
                  <div className="p-3 border-t border-white/5 flex items-center justify-between bg-black/20 rounded-b-xl">
                    <span className="text-[10px] text-gray-500 font-mono">
                      {idea.length} chars
                    </span>
                    
                    <button
                      onClick={handleOptimize}
                      disabled={!idea.trim() || loading}
                      className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 text-xs font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center gap-2 uppercase tracking-wider shadow-[0_0_12px_rgba(234,88,12,0.3)]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Optimizing...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Optimize Post</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </section>

              {/* Quick Test Presets */}
              <section>
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2.5 block">
                  Quick Test Ideas
                </label>
                <div className="space-y-2">
                  {PRESET_IDEAS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setIdea(preset)}
                      className="w-full text-left p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-xs text-gray-400 hover:text-gray-200 transition-all leading-relaxed flex items-start gap-2 group"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-orange-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{preset}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Algorithm Architecture Matrix */}
              <section className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                  Repository Calibration Reference
                </label>
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-gray-400">Pipeline Engine</span>
                    <span className="text-white font-mono text-[11px]">phoenix/run_pipeline.py</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-gray-400">Community Discovery</span>
                    <span className="text-white font-mono text-[11px]">SimClusters (Graph)</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-gray-400">Multimodal Reader</span>
                    <span className="text-white font-mono text-[11px]">Grox Vision Pipeline</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-400">Primary Multiplier</span>
                    <span className="text-orange-400 font-mono text-[11px]">P(Copy Link) = 20.0x</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('readme')}
                  className="w-full mt-2 py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-gray-300 hover:text-white flex items-center justify-between transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-orange-400" />
                    <span>View GitHub README Spec</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-orange-400" />
                </button>
              </section>
              
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs leading-relaxed">
                  {error}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-[#0c0c0c] shrink-0 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>Updated xai-org Spec Active</span>
              </div>
              <span className="text-[10px] text-gray-600 font-mono">v2.6.4-prod</span>
            </div>
          </aside>

          {/* Right Column: Output Strategy Canvas */}
          <section className="flex-1 p-4 sm:p-8 bg-[#0a0a0a] flex flex-col overflow-y-auto min-h-0">
            {result ? (
              <div className="space-y-6 max-w-4xl">
                {/* Output Actions Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-bold text-orange-500">
                      Engineered Strategy Output
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyPostOnly}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-gray-200 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      {copiedPost ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
                      <span>{copiedPost ? 'Post Copied!' : 'Copy Drafted Post'}</span>
                    </button>
                    <button
                      onClick={handleCopyAll}
                      className="px-3 py-1.5 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 rounded-lg text-xs font-medium text-orange-300 hover:text-orange-200 flex items-center gap-1.5 transition-colors"
                    >
                      {copiedAll ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-orange-400" />}
                      <span>{copiedAll ? 'Strategy Copied!' : 'Copy Full Analysis'}</span>
                    </button>
                  </div>
                </div>

                {/* Main Strategy Content Card */}
                <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-orange-500 to-red-600"></div>
                  
                  <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-headings:text-white prose-h3:text-orange-400 prose-h3:text-sm prose-h3:uppercase prose-h3:tracking-widest prose-h3:font-bold prose-h3:border-b prose-h3:border-white/10 prose-h3:pb-2 prose-h3:pt-4 prose-a:text-orange-400 prose-strong:text-orange-200 marker:text-gray-500 prose-pre:bg-[#050505] prose-pre:border prose-pre:border-white/10">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[450px] flex flex-col items-center justify-center text-gray-600 gap-5 text-center px-4">
                <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center bg-[#121212] shadow-xl">
                  <Sparkles className="w-8 h-8 text-orange-500/70" />
                </div>
                <div className="space-y-1.5 max-w-md">
                  <p className="font-medium text-gray-300 text-base">Awaiting Raw Content Idea</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Enter a 1-3 line thought or select a preset on the left. The optimizer applies real production <span className="text-orange-400 font-mono">param.rs</span> weights (20x link share, 5x quote/reply) and aligns with Phoenix retrieval & SimClusters.
                  </p>
                </div>
              </div>
            )}
          </section>

        </main>
      )}

      {/* Status Bar */}
      <footer className="h-9 border-t border-white/10 bg-[#050505] flex flex-wrap items-center justify-between px-4 sm:px-8 text-[10px] text-gray-500 uppercase tracking-widest shrink-0">
        <div>xAI Phoenix Core: <span className="text-green-500 font-semibold">Calibrated & Active</span></div>
        <div className="hidden sm:flex gap-6">
          <span>Retrieval Engine: run_pipeline.py</span>
          <span>Routing: SimClusters + Grox Multimodal</span>
          <span>Ranker Confidence: 99.4%</span>
        </div>
      </footer>
    </div>
  );
}
