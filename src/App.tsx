import { useState } from 'react';
import { 
  Key, 
  Activity, 
  Settings,
  Cpu,
  LayoutDashboard,
  Box,
  LogOut,
  Lock,
  CheckCircle2,
  Copy,
  ExternalLink,
  Sparkles,
  Eye,
  EyeOff,
  Plus,
  ArrowRight,
  Share2
} from 'lucide-react';

const GlowOrb = ({ className, color }: { className: string, color: string }) => (
  <div className={`absolute rounded-full blur-[120px] opacity-20 pointer-events-none ${className}`} style={{ backgroundColor: color }} />
);

const Sparkle = ({ className }: { className?: string }) => (
  <Sparkles className={`w-4 h-4 text-primary animate-pulse ${className}`} />
);

// --- SVGs for Providers ---
const OpenAIIcon = () => (
  <img src="/logos/gpt.png" alt="GPT" className="w-full h-full object-cover" />
);

const AnthropicIcon = () => (
  <img src="/logos/claude.png" alt="Claude" className="w-full h-full object-cover" />
);

const MetaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent">
    <path d="M19.349 7.844c-2.115-3.04-6.075-4.137-9.452-2.316a.434.434 0 0 0-.158.62l.842 1.346a.434.434 0 0 0 .584.148c2.474-1.393 5.568-.426 7.152 2.031l.053.084.717 1.144a.432.432 0 0 0 .597.142l1.636-.957a.432.432 0 0 0 .15-.6l-2.121-1.642zm-15.06 6.883l-.533.313a.432.432 0 0 0-.15.6l1.396 2.233c1.725 2.756 5.166 3.86 8.358 2.5a.434.434 0 0 0 .224-.597l-.604-1.467a.434.434 0 0 0-.547-.238c-2.34.825-4.99-.074-6.323-2.107l-.05-.077-.521-.832a.432.432 0 0 0-.597-.142l-1.653 1.014z" />
  </svg>
);

const GoogleIcon = () => (
  <img src="/logos/gemini.png" alt="Gemini" className="w-full h-full object-cover" />
);

const DeepSeekIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-primary">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
)

// --- Layout Components ---

const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  const [tokensUsed] = useState(200);
  const [tokenLimit] = useState(1000);
  
  return (
    <aside className="w-64 bg-surface/40 backdrop-blur-md border-r border-border/50 h-screen sticky top-0 flex flex-col pt-6 font-sans">
      <div className="px-6 pb-6 flex items-center gap-3 border-b border-border/50">
         <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-indigo-900 border border-borderHover rounded-lg shadow-sm flex items-center justify-center">
            <TriangleSvg className="w-4 h-4 text-cyanHighlight" />
         </div>
         <span className="font-bold text-textHeader tracking-tight uppercase">
            <span className="text-cyanHighlight">K</span>ORE
         </span>
      </div>

      <div className="px-4 py-6 flex-1 flex flex-col gap-1.5">
        <div className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-2 px-2">仪表盘</div>
        <button className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'home' ? 'bg-primary/10 border border-primary/20 text-textHeader shadow-glow-primary' : 'text-textMuted hover:text-textMain hover:bg-surface/60 border border-transparent'}`} onClick={() => setActiveTab('home')}>
          <LayoutDashboard className="w-4 h-4" /> 首页
        </button>
        <button className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'models' ? 'bg-primary/10 border border-primary/20 text-textHeader shadow-glow-primary' : 'text-textMuted hover:text-textMain hover:bg-surface/60 border border-transparent'}`} onClick={() => setActiveTab('models')}>
          <Box className="w-4 h-4" /> 全局模型
        </button>
        <button className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'keys' ? 'bg-primary/10 border border-primary/20 text-textHeader shadow-glow-primary' : 'text-textMuted hover:text-textMain hover:bg-surface/60 border border-transparent'}`} onClick={() => setActiveTab('keys')}>
          <Key className="w-4 h-4" /> API 密钥
        </button>
        <button className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'usage' ? 'bg-primary/10 border border-primary/20 text-textHeader shadow-glow-primary' : 'text-textMuted hover:text-textMain hover:bg-surface/60 border border-transparent'}`} onClick={() => setActiveTab('usage')}>
          <Activity className="w-4 h-4" /> 算力资产
        </button>
      </div>

      {/* Compute Balance Widget */}
      <div className="p-5 border-t border-border/50 bg-background/30 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-3">
          <div className="text-xs font-semibold text-textHeader flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-textMuted" /> 每日算力
          </div>
          <span className="text-[10px] text-cyanHighlight font-bold bg-cyanHighlight/10 px-1.5 py-0.5 rounded border border-cyanHighlight/20">PRO</span>
        </div>
        <div className="mb-2 flex justify-between text-xs items-end">
           <span className="text-textHeader font-mono text-lg">{tokensUsed} <span className="text-[10px] text-textMuted uppercase font-sans">/ {tokenLimit} Credit</span></span>
        </div>
        <div className="w-full bg-surface border border-border h-1.5 rounded-full overflow-hidden mb-3">
          <div className="bg-cyanHighlight h-full rounded-full shadow-[0_0_8px_#00f5ff]" style={{ width: `${(tokensUsed/tokenLimit)*100}%` }} />
        </div>
        <button className="text-[11px] text-textMuted hover:text-cyanHighlight transition-colors hover:underline w-full text-left">
          质押更多 KORE 以提升算力
        </button>
      </div>

      <div className="p-4 border-t border-border/50 flex items-center gap-3 text-sm text-textMuted hover:text-textMain cursor-pointer transition-colors bg-surface/40">
        <div className="w-6 h-6 rounded-md bg-background/50 border border-border/50 flex items-center justify-center font-mono text-[10px] text-textHeader">usr</div>
        <div className="flex-1 truncate">0x4F2e...A9c2</div>
        <LogOut className="w-4 h-4" />
      </div>
    </aside>
  );
};

const TriangleSvg = ({className}: {className: string}) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
     <path d="M12 3L20 20H4L12 3Z" strokeLinejoin="round" />
  </svg>
)

const ModelTable = () => {
  const models = [
    { name: "GPT-5.4-pro", provider: "OpenAI", icon: <OpenAIIcon />, context: "512k", price: "8.00", locked: false },
    { name: "GPT-5.4", provider: "OpenAI", icon: <OpenAIIcon />, context: "256k", price: "2.50", locked: false },
    { name: "Claude 4.6 Opus", provider: "Anthropic", icon: <AnthropicIcon />, context: "1M", price: "20.00", locked: true },
    { name: "Claude 4.6 Sonnet", provider: "Anthropic", icon: <AnthropicIcon />, context: "500k", price: "5.00", locked: false },
    { name: "Gemini 3.1 Pro", provider: "Google", icon: <GoogleIcon />, context: "2M", price: "4.00", locked: false },
    { name: "DeepSeek V3", provider: "DeepSeek", icon: <DeepSeekIcon />, context: "128k", price: "0.20", locked: false },
    { name: "Llama 3.1 405B", provider: "Meta", icon: <MetaIcon />, context: "128k", price: "1.00", locked: true },
  ];

  return (
    <div className="border border-border/30 rounded-3xl shadow-glass bg-surface/30 backdrop-blur-xl overflow-hidden relative animate-fade-in-up delay-100 opacity-0 fill-mode-forwards">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="px-8 py-6 border-b border-border/30 bg-white/5 flex justify-between items-center relative z-10">
        <div>
          <h2 className="text-xl font-bold text-textHeader flex items-center gap-2">
            可用模型 <Sparkle />
          </h2>
          <p className="text-xs text-textMuted mt-1">通过去中心化网关原生路由，访问全球顶尖前沿模型。</p>
        </div>
        <button className="text-xs bg-surface/50 border border-border/50 hover:border-primary/50 text-textMain px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-sm">
          <Settings className="w-3.5 h-3.5" /> 管理路由
        </button>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="bg-surface/50 text-textMuted text-xs uppercase border-b border-border/50 relative z-10">
          <tr>
            <th className="px-6 py-3 font-medium tracking-wide">模型</th>
            <th className="px-6 py-3 font-medium tracking-wide">上下文窗口</th>
            <th className="px-6 py-3 font-medium tracking-wide">标准市场价</th>
            <th className="px-6 py-3 font-medium tracking-wide">质押价格</th>
            <th className="px-6 py-3 font-medium tracking-wide text-right">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/20 relative z-10">
          {models.map((model, i) => (
            <tr key={i} className={`hover:bg-white/5 transition-all group ${model.locked ? 'opacity-60' : ''}`}>
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 overflow-hidden">
                    {model.icon}
                  </div>
                  <div>
                    <div className="font-bold text-textHeader flex items-center gap-2 text-base">
                      {model.name} {model.locked && <Lock className="w-3.5 h-3.5 text-textMuted" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium tracking-wide">
                        {model.provider}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-textMuted font-mono text-xs">{model.context}</td>
              <td className="px-6 py-4">
                <span className="text-textMuted line-through decoration-borderHover font-mono text-xs">${model.price} / 1M</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-bold font-mono inline-block">$0.00</span>
              </td>
              <td className="px-6 py-4 text-right">
                {model.locked ? (
                  <button className="bg-white/5 border border-white/10 hover:border-textMuted text-textMuted hover:text-textMain px-5 py-2 rounded-xl text-xs font-semibold transition-all">
                    质押解锁
                  </button>
                ) : (
                  <button className="bg-primary border border-primary/50 text-white hover:brightness-110 px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 w-full sm:w-auto sm:ml-auto shadow-glow-primary">
                    <CheckCircle2 className="w-4 h-4" /> 已就绪
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const KeysSection = () => {
  const [showKey, setShowKey] = useState<number | null>(null);
  
  const apiKeys = [
    {
      id: 1,
      name: "生产环境密钥",
      key: "sk-kore-8a2f...9kd2",
      fullKey: "sk-kore-8a2f9kd2lsh3920skf29",
      models: ["GPT-5.4-pro", "Claude 4.6 Sonnet", "Gemini 3.1 Pro", "DeepSeek V3"],
      usage: 125,
      limit: 1000,
      status: "活跃"
    },
    {
      id: 2,
      name: "开发测试密钥",
      key: "sk-kore-2d1e...5xP1",
      fullKey: "sk-kore-2d1e5xP1zma2910lqp81",
      models: ["GPT-5.4", "Gemini 3.1 Pro"],
      usage: 12,
      limit: 500,
      status: "活跃"
    }
  ];

  return (
    <div className="space-y-8 relative z-10 animate-fade-in-up delay-100 opacity-0 fill-mode-forwards">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-textHeader flex items-center gap-2">
            API 密钥管理 <Sparkle />
          </h2>
          <p className="text-sm text-textMuted mt-1">管理您的访问密钥，监控模型授权情况及实时用量。</p>
        </div>
        <button className="bg-primary text-white px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 shadow-glow-primary hover:brightness-110 transition-all">
          <Plus className="w-5 h-5" /> 创建新密钥
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {apiKeys.map((key) => (
          <div key={key.id} className="border border-border/30 rounded-3xl bg-surface/30 backdrop-blur-xl shadow-glass overflow-hidden group">
             <div className="px-8 py-6 border-b border-border/20 flex justify-between items-start bg-white/5">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-textHeader">{key.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-bold uppercase tracking-wider">{key.status}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-sm">
                    <span className="text-textHeader bg-surface/80 px-3 py-1.5 rounded-xl border border-border/30">
                      {showKey === key.id ? key.fullKey : key.key}
                    </span>
                    <button 
                      onClick={() => setShowKey(showKey === key.id ? null : key.id)}
                      className="text-textMuted hover:text-primary transition-colors p-2"
                    >
                      {showKey === key.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button className="text-textMuted hover:text-primary transition-colors p-2">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                   <div className="text-xs text-textMuted mb-2">已使用金额</div>
                   <div className="text-xl font-bold text-textHeader">${key.usage.toFixed(2)} <span className="text-sm text-textMuted font-normal">/ ${key.limit}</span></div>
                </div>
             </div>
             <div className="px-8 py-6 flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                   <h4 className="text-xs font-bold text-textMuted uppercase tracking-wider mb-4 flex items-center gap-2">
                     <Box className="w-3.5 h-3.5" /> 已授权模型
                   </h4>
                   <div className="flex flex-wrap gap-2">
                      {key.models.map((model) => (
                        <span key={model} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-textMain flex items-center gap-2 group-hover:border-primary/30 transition-all">
                          {model} <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                      ))}
                   </div>
                </div>
                <div className="w-full md:w-64">
                   <h4 className="text-xs font-bold text-textMuted uppercase tracking-wider mb-4 flex items-center gap-2">
                     <Activity className="w-3.5 h-3.5" /> 额度概览
                   </h4>
                   <div className="space-y-3">
                      <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${(key.usage / key.limit) * 100}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-textMuted">
                        <span>进度: {((key.usage / key.limit) * 100).toFixed(1)}%</span>
                        <span>剩余: ${(key.limit - key.usage).toFixed(2)}</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AssetCard = ({ 
  title, 
  symbol, 
  description, 
  price, 
  change, 
  marketCap, 
  icon: Icon,
  chartData,
  priceTrendData,
  distributionTitle,
  distributionData,
  totalValue,
  footerExtra
}: any) => (
  <div className="bg-[#0a0f1e]/80 backdrop-blur-2xl border border-white/5 rounded-2xl p-8 relative overflow-hidden group animate-fade-in-up opacity-0 fill-mode-forwards">
    {/* Corner Accents - Reference Implementation */}
    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-xl pointer-events-none" />
    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-xl pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-xl pointer-events-none" />

    <div className="flex justify-between items-start mb-8">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg border border-white/10 ring-4 ring-white/5">
           <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
           <div className="flex items-center gap-2">
             <h3 className="text-2xl font-black text-white uppercase tracking-wider">{symbol}</h3>
             <Share2 className="w-4 h-4 text-textMuted hover:text-cyanHighlight cursor-pointer transition-colors" />
           </div>
           <p className="text-xs text-textMuted mt-1 max-w-[240px] leading-relaxed italic">{description}</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      <div>
        <div className="text-[10px] font-bold text-textMuted uppercase tracking-[0.2em] mb-2">{symbol} 价格</div>
        <div className="flex items-center gap-6">
           <div>
              <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-black text-white font-mono">{price}</span>
                 <span className={`text-[11px] font-bold ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{change}</span>
              </div>
           </div>
           {/* Price Sparkline */}
           <div className="flex-1 h-12 w-32 relative">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`grad-${symbol}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#00f5ff" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id={`fill-${symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d={`M 0 40 L 0 35 ${priceTrendData.map((y: number, x: number) => `L ${(x/(priceTrendData.length-1))*100} ${y}`).join(' ')} L 100 40 Z`}
                  fill={`url(#fill-${symbol})`}
                />
                <path 
                  d={`M 0 35 ${priceTrendData.map((y: number, x: number) => `L ${(x/(priceTrendData.length-1))*100} ${y}`).join(' ')}`}
                  fill="none"
                  stroke={`url(#grad-${symbol})`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_rgba(0,245,255,0.3)]"
                />
              </svg>
           </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[10px] font-bold text-textMuted uppercase tracking-[0.2em] mb-2">市值 (MC)</div>
        <div className="text-2xl font-black text-white font-mono">{marketCap}</div>
      </div>
    </div>

    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <div className="text-[10px] font-bold text-textMuted uppercase tracking-[0.2em]">{title} 指标</div>
        <div className="flex gap-2">
           {["1W", "1M", "3M", "6M"].map(t => (
             <button key={t} className={`text-[10px] font-bold px-2 py-1 rounded transition-all ${t === '1M' ? 'bg-white/10 text-white shadow-sm' : 'text-textMuted hover:text-white'}`}>
                {t}
             </button>
           ))}
        </div>
      </div>
      <div className="h-44 flex items-end gap-1.5 px-1 py-1 bg-white/[0.02] border border-white/[0.05] rounded-xl overflow-hidden relative">
         {/* Subtle Background Grid Lines */}
         <div className="absolute inset-x-0 top-1/4 border-t border-white/[0.03] pointer-events-none" />
         <div className="absolute inset-x-0 top-2/4 border-t border-white/[0.03] pointer-events-none" />
         <div className="absolute inset-x-0 top-3/4 border-t border-white/[0.03] pointer-events-none" />
         
         {chartData.map((val: number, i: number) => (
           <div key={i} className="flex-1 flex flex-col justify-end group/bar">
              <div 
                className="w-full bg-gradient-to-t from-blue-600/20 to-cyanHighlight/80 transition-all hover:scale-x-110 hover:to-white group-hover/bar:from-blue-500/40" 
                style={{ height: `${val}%` }} 
              />
           </div>
         ))}
      </div>
    </div>

    <div className="pt-8 border-t border-white/10">
       <div className="flex justify-between items-baseline mb-4">
          <div className="text-[10px] font-bold text-textMuted uppercase tracking-[0.2em]">{distributionTitle}</div>
          <div className="text-[10px] font-bold text-white uppercase tracking-widest">{totalValue}</div>
       </div>
       <div className="w-full bg-white/5 h-6 rounded-lg border border-white/10 overflow-hidden flex shadow-inner">
          {distributionData.map((d: any, i: number) => (
            <div 
              key={i} 
              className={`h-full transition-all hover:opacity-100 opacity-90 border-r border-black/20 last:border-0 ${d.color}`} 
              style={{ width: `${d.percent}%` }}
              title={d.label}
            />
          ))}
       </div>
       <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
          {distributionData.map((d: any, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-sm ${d.color.split(' ')[0]}`} />
              <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider">{d.label}</span>
              <span className="text-[10px] font-black text-white font-mono">{d.value}</span>
            </div>
          ))}
       </div>
    </div>

    {footerExtra && (
      <div className="mt-8 pt-4 flex justify-between items-center text-[10px] font-bold text-textMuted border-t border-white/5">
         <span>{footerExtra.label}</span>
         <div className="flex items-center gap-1.5 hover:text-cyanHighlight cursor-pointer">
            {footerExtra.value} <Plus className="w-3 h-3" />
         </div>
      </div>
    )}
  </div>
);

const ProtocolHealthSection = () => {
  const healthMetrics = [
    { label: "资金库余额", value: "$12,450,230", detail: "+12.5% 本月", color: "text-cyanHighlight" },
    { label: "回购力度", value: "High", detail: "实时执行中", color: "text-green-400" },
    { label: "节点在线率", value: "99.98%", detail: "SLA 符合", color: "text-blue-400" },
    { label: "通缩倍数", value: "1.24x", detail: "销毁/发行对比", color: "text-purple-400" }
  ];

  return (
    <div className="mb-12 animate-fade-in-up delay-100 opacity-0 fill-mode-forwards">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            协议健康与回购透明度 <Sparkle />
          </h3>
          <p className="text-xs text-textMuted mt-1">实时透明度展示 $KORE 协议的回购动力与金库储备状态。</p>
        </div>
        <div className="hidden sm:flex text-[10px] font-bold text-textMuted uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          全系统正常运行中
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((m, i) => (
          <div key={i} className="bg-surface/30 backdrop-blur-xl border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all group overflow-hidden relative">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />
            <div className="text-[10px] font-bold text-textMuted uppercase tracking-wider mb-2">{m.label}</div>
            <div className={`text-xl font-black ${m.color} mb-1 transition-transform group-hover:translate-x-1`}>{m.value}</div>
            <div className="text-[10px] text-textMuted font-medium italic">{m.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AssetsSection = () => {
  return (
    <div className="space-y-12 relative z-10 pb-20 animate-fade-in-up opacity-0 fill-mode-forwards">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">算力资产 <span className="text-cyanHighlight transition-pulse italic">KORE ECOSYSTEM</span></h2>
          <p className="text-textMuted text-sm">监控协议核心资本资产与算力资源分发。持有 $KORE 捕获算力生产价值。</p>
        </div>
        <button className="bg-white/5 border border-white/10 hover:border-cyanHighlight/30 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
           <ExternalLink className="w-3.5 h-3.5" /> 链上浏览器
        </button>
      </div>

      <ProtocolHealthSection />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <AssetCard 
          title="KORE 供应"
          symbol="KORE"
          description="KORE 协议的核心资本。质押 KORE 以捕获 API 套利收益并获取算力 Credit。"
          price="$5.80"
          change="+132%"
          marketCap="$259.00M"
          icon={Cpu}
          chartData={[30, 45, 40, 55, 52, 60, 58, 65, 62, 70, 68, 75, 72, 80]}
          priceTrendData={[35, 32, 28, 30, 25, 22, 18, 15, 12, 10, 8, 5]}
          distributionTitle="代币供应/分布"
          totalValue="78.97M KORE"
          distributionData={[
            { label: "已锁定", value: "7.78M", percent: 15, color: "bg-[#8b5cf6]" },
            { label: "已质押", value: "30.58M", percent: 45, color: "bg-[#00f5ff]" },
            { label: "流通中", value: "44.63M", percent: 40, color: "bg-white/20" }
          ]}
          footerExtra={{ label: "治理提案 active", value: "进入治理控制台" }}
        />

        <AssetCard 
          title="CREDIT 使用"
          symbol="CREDIT"
          description="CREDIT 是 KORE 网络内的使用凭证。1 Credit 等于 $1 的 API 使用额度。"
          price="$156.00"
          change="+15600%"
          marketCap="$27.01M"
          icon={Activity}
          chartData={[80, 75, 82, 78, 85, 82, 88, 84, 90, 86, 92, 88, 95, 98]}
          priceTrendData={[32, 34, 30, 28, 25, 20, 18, 15, 12, 10, 5, 2]}
          distributionTitle="CREDIT 使用状况"
          totalValue="37.54K sKORE"
          distributionData={[
            { label: "API 预估消耗", value: "28.77K", percent: 76, color: "bg-cyanHighlight shadow-[0_0_10px_#00f5ff]" },
            { label: "剩余额度", value: "8.77K", percent: 24, color: "bg-white/10" }
          ]}
          footerExtra={{ label: "铸造比率: 1 sKORE = 0.0016 KORE", value: "资产兑换" }}
        />
      </div>
    </div>
  )
}

const FeaturedModels = () => {
  const featured = [
    { name: "GPT 5.4", officialPrice: "$15.00", stakedPrice: "$0.00", icon: <OpenAIIcon />, color: "from-blue-500/20" },
    { name: "Claude 4.6 Opus", officialPrice: "$24.00", stakedPrice: "$0.00", icon: <AnthropicIcon />, color: "from-indigo-500/20" },
    { name: "Gemini 3.1 Pro", officialPrice: "$12.00", stakedPrice: "$0.00", icon: <GoogleIcon />, color: "from-green-500/20" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {featured.map((m, i) => (
        <div key={i} className={`bg-gradient-to-br ${m.color} to-transparent border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all`}>
           <div className="flex justify-between items-start mb-4">
             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden">{m.icon}</div>
             <div className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-md border border-primary/20">质押方案现已可用</div>
           </div>
           <h4 className="text-lg font-bold text-white mb-4">{m.name}</h4>
           <div className="space-y-3">
             <div className="flex justify-between items-center text-xs">
               <span className="text-textMuted">官方 API 价格</span>
               <span className="text-textMuted line-through font-mono">{m.officialPrice} <span className="text-[10px]">/1M</span></span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-xs text-textHeader font-bold">KORE 质押价</span>
               <span className="text-2xl font-black text-cyanHighlight font-mono">{m.stakedPrice}</span>
             </div>
           </div>
        </div>
      ))}
    </div>
  );
};

const CodeIntegration = () => {
  const code = `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-kore-...", 
  baseURL: "https://api.kore.so/v1",
});

const response = await client.chat.completions.create({
  model: "gpt-5.4",
  messages: [{ role: "user", content: "Optimize this request" }],
});`;

  return (
    <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div>
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          一键集成，无缝切换 <Sparkle />
        </h3>
        <p className="text-textMuted text-sm leading-relaxed mb-6">
          完全兼容 OpenAI 与 Anthropic SDK。只需更改 <code>baseURL</code> 即可接入 KORE 去中心化路由。
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-xs text-textMain bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> 支持所有主流模型
          </div>
          <div className="flex items-center gap-2 text-xs text-textMain bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> 0 延迟网关路由
          </div>
        </div>
      </div>
      <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 font-mono text-sm relative overflow-hidden shadow-2xl">
        <div className="flex gap-1.5 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
        </div>
        <pre className="text-blue-200 overflow-x-auto">
          <code>{code}</code>
        </pre>
        <button className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors group">
          <Copy className="w-4 h-4 text-textMuted group-hover:text-cyanHighlight" />
        </button>
      </div>
    </div>
  );
};

const LiveArbitrageTicker = () => {
  const events = [
    { time: "2s ago", msg: "GPT-4o 路由至 DE 集群", saved: "$0.45" },
    { time: "8s ago", msg: "Claude 3.5 路由至套利节点 0x42", saved: "$1.20" },
    { time: "15s ago", msg: "模型加载符合 99.98% SLA", saved: "$0.12" },
  ];

  return (
    <div className="border border-border/30 rounded-3xl bg-surface/30 backdrop-blur-xl p-6 mb-16 relative overflow-hidden shadow-glass">
      <div className="flex items-center justify-between mb-4 border-b border-border/20 pb-4">
        <h3 className="text-xs font-bold text-textHeader uppercase tracking-widest flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-cyanHighlight" /> 实时路由动态
        </h3>
        <span className="flex items-center gap-1.5 text-[10px] text-primary animate-pulse">
           <div className="w-1.5 h-1.5 bg-primary rounded-full" /> LIVE
        </span>
      </div>
      <div className="space-y-4">
        {events.map((e, i) => (
          <div key={i} className="flex justify-between items-center text-[11px] font-mono group">
            <div className="flex gap-4 items-center">
              <span className="text-textMuted w-12">{e.time}</span>
              <span className="text-textMain group-hover:text-cyanHighlight transition-colors">{e.msg}</span>
            </div>
            <span className="text-cyanHighlight font-bold bg-cyanHighlight/5 px-2 py-0.5 rounded border border-cyanHighlight/10">已节省 {e.saved}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ROICalculator = () => {
  const [tokens, setTokens] = useState(500); // 500M tokens
  
  const payAsYouGo = tokens * 15; // Assume avg $15/1M
  const koresavings = payAsYouGo; // Since KORE staking is free after stake

  return (
    <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-8 mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
           <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">年度节省计算器</h3>
           <p className="text-textMuted text-sm mb-8 italic">滑动估算您每个月消耗的 Token 数量，对比“按量付费”与“KORE 质押”方案。</p>
           
           <div className="space-y-6">
             <div className="flex justify-between items-end">
               <span className="text-xs font-bold text-textHeader uppercase tracking-wider">月度 Token 消耗量</span>
               <span className="text-xl font-bold text-cyanHighlight font-mono">{tokens}M <span className="text-xs text-textMuted uppercase">Tokens</span></span>
             </div>
             <input 
               type="range" 
               min="10" 
               max="2000" 
               value={tokens} 
               onChange={(e) => setTokens(parseInt(e.target.value))}
               className="w-full h-2 bg-surface border border-border rounded-lg appearance-none cursor-pointer accent-cyanHighlight"
             />
             <div className="flex justify-between text-[10px] font-bold text-textMuted tracking-widest">
               <span>10M</span>
               <span>1000M</span>
               <span>2000M</span>
             </div>
           </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
           <div className="bg-surface/50 border border-white/5 rounded-2xl p-6 text-center">
             <div className="text-[10px] font-bold text-textMuted uppercase mb-2">传统按量付费 (年)</div>
             <div className="text-2xl font-black text-white font-mono">${(payAsYouGo * 12).toLocaleString()}</div>
           </div>
           <div className="bg-cyanHighlight/10 border border-cyanHighlight/20 rounded-2xl p-6 text-center shadow-glow-primary">
             <div className="text-[10px] font-bold text-cyanHighlight uppercase mb-2">KORE 质押后年度节省</div>
             <div className="text-3xl font-black text-primary font-mono">${(koresavings * 12).toLocaleString()}</div>
             <div className="text-[10px] font-bold text-green-400 mt-1 animate-bounce">SAVED 100%</div>
           </div>
        </div>
      </div>
    </div>
  );
};

const HeaderSection = () => (
  <header className="mb-20 relative z-10 flex flex-col items-center justify-center text-center animate-fade-in-up opacity-0 fill-mode-forwards">
    <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-8 leading-[1.15] max-w-5xl">
      将 AI 算力转化为 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanHighlight via-blue-400 to-indigo-500 py-1 px-1">通缩资产</span>
    </h1>
    <p className="text-gray-400 text-lg max-w-3xl leading-relaxed mb-14 px-4 text-center font-medium">
      KORE 捕获了 AI 模型官方价与协议套利成本之间的巨大利差。<br className="hidden sm:block" />
      每一笔 API 调用都在为 $KORE 提供回购动力，构建最真实的 AI 价值底座。
    </p>

    {/* Metric Highlights */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mb-14">
      {[
        { label: "当前 API 折扣率", value: "92% OFF", color: "from-cyan-400 to-blue-500" },
        { label: "每日回购金额", value: "$142,500", color: "from-blue-400 to-indigo-500" },
        { label: "累计销毁比例", value: "42.7%", color: "from-indigo-400 to-purple-500" }
      ].map((metric, i) => (
        <div key={i} className="bg-surface/30 backdrop-blur-xl border border-border/30 rounded-3xl p-6 shadow-glass hover:border-cyanHighlight/30 transition-all group">
          <div className="text-xs font-bold text-textMuted uppercase tracking-widest mb-3">{metric.label}</div>
          <div className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${metric.color} group-hover:scale-105 transition-transform`}>
            {metric.value}
          </div>
        </div>
      ))}
    </div>
    
    {/* Central API Bar - bltcy reference */}
    <div className="w-full max-w-2xl relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyanHighlight to-blue-600 rounded-[28px] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative flex items-center bg-surface/80 backdrop-blur-2xl border border-white/10 rounded-[24px] p-1.5 shadow-2xl pl-6">
        <span className="text-textMuted font-mono text-sm mr-4 select-none">https://api.kore.so/v1</span>
        <div className="flex-1 flex justify-center py-2.5 px-4 bg-white/5 rounded-2xl border border-white/5 text-primary-light font-mono text-sm overflow-hidden">
          <span className="text-cyanHighlight animate-pulse">/chat/completions</span>
        </div>
        <button className="ml-1.5 px-6 py-3 bg-gradient-to-r from-cyanHighlight to-blue-600 hover:from-cyanHighlight hover:to-blue-500 text-black text-sm font-black rounded-2xl transition-all flex items-center gap-2 shadow-lg">
          <Copy className="w-4 h-4" /> 复制端点
        </button>
      </div>
    </div>
  </header>
);


export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="h-screen bg-transparent text-textMain flex selection:bg-surfaceHover relative overflow-hidden">
      {/* Background Orbs - bltcy aesthetic */}
      <GlowOrb className="-top-24 -left-24 w-[500px] h-[500px]" color="#2563EB" />
      <GlowOrb className="top-1/4 -right-48 w-[600px] h-[600px] opacity-10" color="#8B5CF6" />
      <GlowOrb className="bottom-0 left-1/3 w-[500px] h-[500px] opacity-[0.05]" color="#0EA5E9" />

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-8 lg:px-20 lg:py-16 overflow-y-auto relative z-10">
        {activeTab === 'home' && (
          <div className="animate-fade-in-up">
            <HeaderSection />
            <FeaturedModels />
            <ROICalculator />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              <div className="xl:col-span-2">
                <CodeIntegration />
              </div>
              <div className="xl:col-span-1">
                <LiveArbitrageTicker />
              </div>
            </div>
          </div>
        )}
        {activeTab === 'models' && <ModelTable />}
        {activeTab === 'keys' && <KeysSection />}
        {activeTab === 'usage' && <AssetsSection />}
      </main>
    </div>
  );
}
