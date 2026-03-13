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
  <div className={`absolute rounded-full blur-[100px] opacity-20 pointer-events-none animate-float ${className}`} style={{ backgroundColor: color }} />
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
    <path d="M19.349 7.844c-2.115-3.04-6.075-4.137-9.452-2.316a.434.434 0 0 0-.158.62l.842 1.346a.434.434 0 0 0 .584.148c2.474-1.393 5.568-.426 7.152 2.031l.053.084.717 1.144a.432.432 0 0 0 .597.142l1.636-.957a.432.432 0 0 0 .15-.6l-2.121-1.642zm-15.06 6.883l-.533.313a.432.432 0 0 0-.15.6l1.396 2.233c1.725 2.756 5.166 3.86 8.358 2.5a.434.434 0 0 0 .224-.597l-.604-1.467a.434.434 0 0 0-.547-.238c-2.34-.825-4.99-.074-6.323-2.107l-.05-.077-.521-.832a.432.432 0 0 0-.597-.142l-1.653 1.014z" />
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
    <aside className="w-64 bg-surface border-y-0 border-l-0 border-r border-border h-screen sticky top-0 flex flex-col pt-8 font-sans z-50 rounded-none shadow-none">
      <div className="px-8 pb-8 flex items-center gap-3 border-b border-border mx-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl shadow-glow-primary flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <TriangleSvg className="w-5 h-5 text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        </div>
        <span className="font-extrabold text-textHeader tracking-tight text-xl">
          KORE<span className="text-cyanHighlight">.</span>
        </span>
      </div>

      <div className="px-4 py-8 flex-1 flex flex-col gap-2">
        <div className="text-[10px] font-bold text-textMuted uppercase tracking-widest px-4 mb-2">仪表盘</div>
        {[
          { id: 'home', icon: LayoutDashboard, label: '首页' },
          { id: 'models', icon: Box, label: '全局模型' },
          { id: 'keys', icon: Key, label: 'API 密钥' },
          { id: 'usage', icon: Activity, label: '算力资产' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 active:scale-95 ${
              activeTab === item.id 
                ? 'bg-surfaceHover border border-border text-textHeader shadow-sm' 
                : 'text-textMuted hover:text-textHeader hover:bg-surfaceHover/50 border border-transparent'
            }`}
          >
            <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-primary' : ''}`} /> {item.label}
          </button>
        ))}
      </div>

      {/* Compute Balance Widget */}
      <div className="m-4 p-5 rounded-2xl bg-surface border border-border shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <div className="text-[10px] font-bold text-textMuted uppercase tracking-widest flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-cyanHighlight" /> 每日算力
          </div>
          <span className="text-[9px] text-primary font-bold bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">PRO</span>
        </div>
        <div className="mb-2 flex justify-between items-baseline">
          <span className="text-textHeader font-mono text-xl font-bold">{tokensUsed} <span className="text-[10px] text-textMuted font-sans font-medium">/ {tokenLimit} Credit</span></span>
        </div>
        <div className="w-full bg-surfaceHover border border-border/50 h-1.5 rounded-full overflow-hidden mb-4 inset-shadow-sm">
          <div className="bg-gradient-to-r from-cyanHighlight to-primary h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${(tokensUsed / tokenLimit) * 100}%` }} />
        </div>
        <button className="text-[11px] font-medium text-textMuted hover:text-primary transition-colors hover:underline w-full text-left">
          质押更多 KORE 以提升算力
        </button>
      </div>

      <div className="p-5 border-t border-border flex items-center gap-3 text-sm text-textMuted hover:text-textHeader cursor-pointer transition-colors bg-surfaceHover/30">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyanHighlight/10 to-primary/10 border border-border flex flex-center shadow-sm relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-white" />
        </div>
        <div className="flex-1 truncate font-medium text-textMain">0x4F2e...A9c2</div>
        <LogOut className="w-4 h-4 hover:text-danger transition-colors" />
      </div>
    </aside>
  );
};

const TriangleSvg = ({ className }: { className: string }) => (
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
    <div className="bg-surface border border-border rounded-3xl overflow-hidden relative animate-fade-in-up delay-100 opacity-0 fill-mode-forwards shadow-bento hover:shadow-bento-hover transition-shadow duration-300">
      <div className="px-8 py-8 border-b border-border flex justify-between items-center relative z-10 bg-surface">
        <div>
          <h2 className="text-2xl font-extrabold text-textHeader flex items-center gap-2 tracking-tight">
            可用模型 <Sparkle />
          </h2>
          <p className="text-sm text-textMuted mt-1">通过去中心化网关原生路由，访问全球顶尖前沿模型。</p>
        </div>
        <button className="text-xs bg-surfaceHover border border-border hover:bg-border text-textMain px-5 py-2.5 rounded-xl transition-all duration-300 active:scale-95 flex items-center gap-2 shadow-sm font-medium">
          <Settings className="w-4 h-4" /> 管理路由
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left relative z-10">
          <thead className="bg-surfaceHover/50 text-textMuted text-[10px] uppercase tracking-widest border-b border-border font-bold">
            <tr>
              <th className="px-8 py-4">模型</th>
              <th className="px-6 py-4">上下文窗口</th>
              <th className="px-6 py-4">标准市场价</th>
              <th className="px-6 py-4">质押价格</th>
              <th className="px-8 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface">
            {models.map((model, i) => (
              <tr key={i} className={`hover:bg-surfaceHover/30 transition-colors group ${model.locked ? 'opacity-60 grayscale-[50%]' : ''}`}>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl border border-border bg-surface flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105 overflow-hidden relative">
                      {model.icon}
                    </div>
                    <div>
                      <div className="font-bold text-textHeader flex items-center gap-2 text-base tracking-tight group-hover:text-primary transition-colors">
                        {model.name} {model.locked && <Lock className="w-3.5 h-3.5 text-textMuted" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[9px] px-2 py-0.5 rounded-md bg-surfaceHover border border-border/50 text-textMuted font-bold tracking-widest uppercase shadow-sm">
                          {model.provider}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-textMuted font-mono text-xs font-medium">{model.context}</td>
                <td className="px-6 py-4">
                  <span className="text-textMuted line-through font-mono text-xs">${model.price} / 1M</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyanHighlight font-extrabold font-mono inline-block text-sm">$0.00</span>
                </td>
                <td className="px-8 py-4 text-right">
                  {model.locked ? (
                    <button className="bg-surfaceHover border border-border hover:border-borderHover text-textMuted hover:text-textMain px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 active:scale-95 shadow-sm">
                      质押解锁
                    </button>
                  ) : (
                    <button className="bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:border-primary px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 hover:text-white active:scale-95 flex items-center justify-center gap-2 ml-auto shadow-sm">
                      <CheckCircle2 className="w-4 h-4" /> 已就绪
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-textHeader flex items-center gap-2 tracking-tight">
            API 密钥管理 <Sparkle />
          </h2>
          <p className="text-sm text-textMuted mt-2">管理您的访问密钥，监控模型授权情况及实时用量。</p>
        </div>
        <button className="bg-textHeader text-white px-6 py-2.5 rounded-xl font-extrabold flex items-center gap-2 hover:bg-black transition-all duration-300 active:scale-95 shadow-md">
          <Plus className="w-5 h-5" /> 创建新密钥
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {apiKeys.map((key) => (
          <div key={key.id} className="bg-surface border border-border shadow-bento hover:shadow-bento-hover rounded-3xl overflow-hidden group hover:border-borderHover transition-all duration-500">
            <div className="px-8 py-6 border-b border-border flex justify-between items-start bg-surface">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-textHeader tracking-tight">{key.name}</h3>
                  <span className="px-2 py-0.5 rounded-md bg-success/10 border border-success/20 text-[9px] text-success font-bold uppercase tracking-widest shadow-sm">{key.status}</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-sm">
                  <span className="text-textHeader bg-surfaceHover px-4 py-2 rounded-xl border border-border/50 shadow-inner">
                    {showKey === key.id ? key.fullKey : key.key}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setShowKey(showKey === key.id ? null : key.id)}
                      className="text-textMuted hover:text-textMain bg-surfaceHover border border-border rounded-xl p-2.5 transition-all duration-300 active:scale-95 shadow-sm"
                    >
                      {showKey === key.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button className="text-textMuted hover:text-textMain bg-surfaceHover border border-border rounded-xl p-2.5 transition-all duration-300 active:scale-95 shadow-sm">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-1.5">已使用金额</div>
                <div className="text-2xl font-bold text-textHeader font-mono">${key.usage.toFixed(2)} <span className="text-sm text-textMuted font-sans">/ ${key.limit}</span></div>
              </div>
            </div>
            <div className="px-8 py-8 flex flex-col md:flex-row gap-10 bg-surfaceHover/30">
              <div className="flex-1">
                <h4 className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Box className="w-3.5 h-3.5" /> 已授权模型
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {key.models.map((model) => (
                     <span key={model} className="px-3.5 py-1.5 rounded-lg bg-surface border border-border text-xs font-semibold text-textMain flex items-center gap-2 hover:bg-surfaceHover transition-all cursor-default shadow-sm">
                      {model} 
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-72">
                <h4 className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" /> 额度概览
                </h4>
                <div className="space-y-3">
                  <div className="w-full bg-border h-2.5 rounded-full overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-primary to-cyanHighlight h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${(key.usage / key.limit) * 100}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-textMuted uppercase tracking-wider">
                    <span>进度: {((key.usage / key.limit) * 100).toFixed(1)}%</span>
                    <span className="text-textMain">剩余: ${(key.limit - key.usage).toFixed(2)}</span>
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
  <div className="bg-surface border border-border rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-500 shadow-bento hover:shadow-bento-hover">
    <div className="absolute inset-0 bg-surface pointer-events-none opacity-50" />

    <div className="flex justify-between items-start mb-10 relative z-10">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-surfaceHover flex items-center justify-center shadow-sm border border-border relative overflow-hidden group-hover:scale-105 transition-transform">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <Icon className="w-8 h-8 text-primary drop-shadow-sm" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-3xl font-black text-textHeader tracking-tight leading-none">{symbol}</h3>
            <Share2 className="w-4 h-4 text-textMuted hover:text-textMain cursor-pointer transition-colors" />
          </div>
          <p className="text-sm text-textMuted mt-2 max-w-[260px] leading-relaxed font-medium">{description}</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
      <div>
        <div className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-3">{symbol} 价格</div>
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-textMain font-mono tracking-tight">{price}</span>
            <span className={`text-[12px] font-bold px-2 py-0.5 rounded-md ${change.startsWith('+') ? 'bg-success/10 text-success border border-success/20' : 'bg-danger/10 text-danger border border-danger/20'}`}>{change}</span>
          </div>
          {/* Enhanced Price Sparkline */}
          <div className="h-16 w-full relative -ml-2">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`grad-${symbol}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="1" />
                  <stop offset="100%" stopColor="#0891B2" stopOpacity="1" />
                </linearGradient>
                <linearGradient id={`fill-${symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#0891B2" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0 40 L 0 35 ${priceTrendData.map((y: number, x: number) => `L ${(x / (priceTrendData.length - 1)) * 100} ${y}`).join(' ')} L 100 40 Z`}
                fill={`url(#fill-${symbol})`}
                className="opacity-50 group-hover:opacity-100 transition-opacity duration-700"
              />
              <path
                d={`M 0 35 ${priceTrendData.map((y: number, x: number) => `L ${(x / (priceTrendData.length - 1)) * 100} ${y}`).join(' ')}`}
                fill="none"
                stroke={`url(#grad-${symbol})`}
                strokeWidth="2.5"
                strokeLinecap="round"
                className="filter drop-shadow-[0_0_8px_rgba(37,99,235,0.3)]"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-3">市值 (MC)</div>
        <div className="text-3xl font-extrabold text-textMain font-mono tracking-tight">{marketCap}</div>
      </div>
    </div>

    <div className="mb-10 relative z-10">
      <div className="flex justify-between items-center mb-6">
        <div className="text-[10px] font-bold text-textMuted uppercase tracking-widest">{title} 指标</div>
        <div className="flex gap-1.5 p-1 bg-surfaceHover rounded-lg border border-border">
          {["1W", "1M", "3M", "6M"].map(t => (
            <button key={t} className={`text-[10px] font-bold px-3 py-1.5 rounded-md transition-all duration-300 ${t === '1M' ? 'bg-surface text-textHeader shadow-sm ring-1 ring-border' : 'text-textMuted hover:text-textMain hover:bg-surface/50'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="h-40 flex items-end gap-1.5 relative group/chart">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100%_25px] pointer-events-none" />
        {chartData.map((val: number, i: number) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <div
              className="w-full bg-gradient-to-t from-primary/20 to-cyanHighlight/50 rounded-t-sm transition-all duration-500 group-hover/chart:opacity-70 hover:!opacity-100 hover:scale-y-105 hover:from-primary/40 hover:to-cyanHighlight/80 transform origin-bottom cursor-pointer"
              style={{ height: `${val}%` }}
            />
          </div>
        ))}
      </div>
    </div>

    <div className="pt-8 border-t border-border relative z-10">
      <div className="flex justify-between items-baseline mb-5">
        <div className="text-[10px] font-bold text-textMuted uppercase tracking-widest">{distributionTitle}</div>
        <div className="text-xs font-bold text-textHeader uppercase tracking-widest bg-surfaceHover px-2.5 py-1 rounded-md border border-border">{totalValue}</div>
      </div>
      <div className="w-full bg-surfaceHover h-5 rounded-lg border border-border overflow-hidden flex shadow-inner">
        {distributionData.map((d: any, i: number) => (
          <div
            key={i}
            className={`h-full transition-all duration-500 hover:opacity-100 opacity-90 border-r border-surface last:border-0 ${d.color.replace('bg-white/30', 'bg-borderHover').replace('bg-white/10', 'bg-border')}`}
            style={{ width: `${d.percent}%` }}
            title={`${d.label}: ${d.value}`}
          />
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
        {distributionData.map((d: any, i: number) => (
          <div key={i} className="flex items-center gap-2.5 bg-surfaceHover px-3 py-1.5 rounded-lg border border-border">
            <div className={`w-2.5 h-2.5 rounded-full ${d.color.split(' ')[0].replace('bg-white/30', 'bg-borderHover').replace('bg-white/10', 'bg-border')}`} />
            <span className="text-[10px] font-bold text-textMuted uppercase tracking-widest">{d.label}</span>
            <span className="text-xs font-black text-textHeader font-mono">{d.value}</span>
          </div>
        ))}
      </div>
    </div>

    {footerExtra && (
      <div className="mt-8 pt-5 flex justify-between items-center text-[10px] font-bold text-textMuted uppercase tracking-widest border-t border-border relative z-10 w-full">
        <span>{footerExtra.label}</span>
        <div className="flex items-center gap-1.5 text-textMain hover:text-primary cursor-pointer transition-colors group/link bg-surfaceHover px-3 py-1.5 rounded-md border border-border hover:border-primary/30">
          {footerExtra.value} <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
        </div>
      </div>
    )}
  </div>
);

const ProtocolHealthSection = () => {
  const healthMetrics = [
    { label: "资金库余额", value: "$12,450,230", detail: "本月 +12.5%", color: "text-cyanHighlight" },
    { label: "回购力度", value: "High", detail: "实时执行中", color: "text-success" },
    { label: "节点在线率", value: "99.98%", detail: "SLA 符合", color: "text-primary" },
    { label: "通缩倍数", value: "1.24x", detail: "销毁/发行对比", color: "text-accent" }
  ];

  return (
    <div className="mb-14 animate-fade-in-up delay-100 opacity-0 fill-mode-forwards">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-extrabold text-textHeader flex items-center gap-2 tracking-tight">
            协议健康与回购透明度 <Sparkle className="text-primary"/>
          </h3>
          <p className="text-sm text-textMuted mt-2">实时透明度展示 $KORE 协议的回购动力与金库储备状态。</p>
        </div>
        <div className="flex text-[10px] font-bold text-textHeader uppercase tracking-widest bg-success/10 px-4 py-2 rounded-xl border border-success/20 items-center gap-2 shadow-sm">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          全系统正常运行中
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {healthMetrics.map((m, i) => (
          <div key={i} className="bg-surface border border-border shadow-sm rounded-2xl p-6 hover:shadow-md hover:border-borderHover transition-all duration-300 group overflow-hidden relative">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-surfaceHover rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
            <div className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-3 relative z-10">{m.label}</div>
            <div className={`text-2xl font-black ${m.color} mb-2 transition-transform duration-300 group-hover:translate-x-1 tracking-tight relative z-10`}>{m.value}</div>
            <div className="text-[9px] text-textMuted font-bold uppercase tracking-widest relative z-10">{m.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AssetsSection = () => {
  return (
    <div className="space-y-12 relative z-10 pb-24 animate-fade-in-up opacity-0 fill-mode-forwards">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border pb-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-textHeader mb-3 tracking-tighter uppercase flex items-center gap-4">
            算力资产 
            <span className="text-[12px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-xl border border-primary/20 tracking-widest shadow-sm">KORE 生态</span>
          </h2>
          <p className="text-textMuted text-base max-w-2xl">监控协议核心资本资产与算力资源分发。持有 $KORE 捕获算力生产价值。</p>
        </div>
        <button className="bg-surfaceHover hover:bg-border border border-border text-textMain px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 flex items-center gap-2 shadow-sm">
          <ExternalLink className="w-4 h-4" /> 链上浏览器
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
            { label: "已质押", value: "30.58M", percent: 45, color: "bg-[#22d3ee]" },
            { label: "流通中", value: "44.63M", percent: 40, color: "bg-white/30" }
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
            { label: "API 预估消耗", value: "28.77K", percent: 76, color: "bg-primary shadow-[0_0_15px_rgba(59,130,246,0.6)]" },
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
    { name: "GPT 5.4", officialPrice: "$15.00", stakedPrice: "$0.00", icon: <OpenAIIcon />, glow: "hover:-translate-y-2" },
    { name: "Claude 4.6 Opus", officialPrice: "$24.00", stakedPrice: "$0.00", icon: <AnthropicIcon />, glow: "hover:-translate-y-2" },
    { name: "Gemini 3.1 Pro", officialPrice: "$12.00", stakedPrice: "$0.00", icon: <GoogleIcon />, glow: "hover:-translate-y-2" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 animate-fade-in-up delay-200 opacity-0 fill-mode-forwards">
      {featured.map((m, i) => (
        <div key={i} className={`bg-surface shadow-bento hover:shadow-bento-hover rounded-3xl p-8 relative overflow-hidden group transition-all duration-500 border border-border hover:border-borderHover ${m.glow}`}>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-surfaceHover flex items-center justify-center border border-border shadow-sm overflow-hidden group-hover:scale-110 transition-transform duration-500">{m.icon}</div>
            <div className="text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2.5 py-1 rounded-md border border-primary/20 shadow-sm animate-pulse-slow">质押方案现已可用</div>
          </div>
          <h4 className="text-2xl font-bold text-textHeader mb-6 tracking-tight relative z-10 group-hover:text-primary transition-colors">{m.name}</h4>
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center text-sm">
              <span className="text-textMuted font-medium">官方 API 价格</span>
              <span className="text-textMuted line-through decoration-borderHover/80 font-mono">{m.officialPrice} <span className="text-[10px]">/1M</span></span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-border relative overflow-hidden">
              <span className="text-sm text-textMain font-bold relative z-10">KORE 质押价</span>
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyanHighlight font-mono relative z-10 group-hover:scale-105 transition-transform duration-300 origin-right">{m.stakedPrice}</span>
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
    <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up delay-300 opacity-0 fill-mode-forwards">
      <div>
        <h3 className="text-4xl font-black text-textHeader mb-5 flex items-center gap-3 tracking-tighter">
          一键集成，无缝切换 <Sparkle className="w-6 h-6 animate-pulse-slow text-primary" />
        </h3>
        <p className="text-textMuted text-base leading-relaxed mb-8 max-w-lg">
          完全兼容 OpenAI 与 Anthropic SDK。只需更改 <code className="bg-surfaceHover border border-border px-1.5 py-0.5 rounded-md font-mono text-sm shadow-sm text-textMain">baseURL</code> 即可接入 KORE 去中心化路由。
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3 text-sm text-textHeader font-bold bg-surface px-5 py-3 rounded-xl border border-border hover:border-borderHover shadow-sm transition-colors group cursor-default">
            <CheckCircle2 className="w-5 h-5 text-success group-hover:scale-110 transition-transform" /> 支持所有主流模型
          </div>
          <div className="flex items-center gap-3 text-sm text-textHeader font-bold bg-surface px-5 py-3 rounded-xl border border-border hover:border-borderHover shadow-sm transition-colors group cursor-default">
            <CheckCircle2 className="w-5 h-5 text-success group-hover:scale-110 transition-transform" /> 0 延迟网关路由
          </div>
        </div>
      </div>
      <div className="bg-surface border border-border rounded-[2rem] p-8 font-mono text-sm relative overflow-hidden shadow-bento hover:shadow-bento-hover group hover:-translate-y-2 transition-all duration-500">
        <div className="absolute inset-0 bg-surfaceHover/50 pointer-events-none" />
        
        {/* Animated Border Effect on Hover */}
        <div className="absolute inset-0 border-2 border-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(90deg, #2563EB 0%, #0891B2 50%, #7C3AED 100%)', backgroundOrigin: 'border-box', backgroundClip: 'content-box, border-box' }}></div>

        <div className="flex gap-2 mb-6 relative z-10">
          <div className="w-3 h-3 rounded-full bg-danger/80 group-hover:bg-danger transition-colors duration-300 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80 group-hover:bg-yellow-400 transition-colors duration-300 delay-75 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-success/80 group-hover:bg-success transition-colors duration-300 delay-150 shadow-sm" />
        </div>
        <pre className="text-textHeader/80 overflow-x-auto text-[13px] leading-loose relative z-10 transition-all duration-300">
          <code>{code}</code>
        </pre>
        <button className="absolute top-6 right-6 p-2.5 bg-surfaceHover hover:bg-border border border-border rounded-xl transition-all duration-300 active:scale-95 group-hover:opacity-100 sm:opacity-0 relative z-10 shadow-sm">
          <Copy className="w-4 h-4 text-textMain" />
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
    { time: "32s ago", msg: "Llama 3 路由至 US-East", saved: "$0.05" },
  ];

  return (
    <div className="bg-surface border border-border rounded-3xl p-8 mb-20 relative overflow-hidden shadow-bento hover:shadow-bento-hover animate-fade-in-up delay-400 opacity-0 fill-mode-forwards transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6 border-b border-border pb-5">
        <h3 className="text-[10px] font-bold text-textHeader uppercase tracking-widest flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" /> 实时路由动态
        </h3>
        <span className="flex items-center gap-2 text-[10px] text-success font-bold tracking-widest uppercase bg-success/10 px-2.5 py-1 rounded-md border border-success/20 shadow-sm">
          <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" /> LIVE
        </span>
      </div>
      <div className="space-y-4">
        {events.map((e, i) => (
          <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-mono group p-3 bg-surfaceHover/50 rounded-xl hover:bg-surfaceHover transition-colors border border-transparent hover:border-border">
            <div className="flex gap-4 items-center w-full sm:w-auto">
              <span className="text-textMuted w-14 shrink-0 font-medium">{e.time}</span>
              <span className="text-textMain group-hover:text-textHeader transition-colors truncate">{e.msg}</span>
            </div>
            <span className="text-primary font-bold bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20 shadow-sm shrink-0 mt-2 sm:mt-0">已节省 {e.saved}</span>
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
    <div className="bg-surface border border-border rounded-[2.5rem] p-10 mb-20 relative overflow-hidden shadow-bento animate-fade-in-up delay-500 opacity-0 fill-mode-forwards group">
       <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
       <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/[0.8] to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:animate-[shimmer_3s_infinite_linear]" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <h3 className="text-4xl font-black text-textHeader mb-4 uppercase tracking-tighter">年度节省计算器</h3>
          <p className="text-textMuted text-sm mb-10 leading-relaxed font-medium">滑动估算您每个月消耗的 Token 数量，对比“按量付费”与“KORE 质押”方案。</p>

          <div className="space-y-8 bg-surfaceHover p-8 rounded-3xl border border-border transition-colors group-hover:border-borderHover shadow-sm">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-textMuted uppercase tracking-widest">月度 Token 消耗量</span>
              <span className="text-3xl font-extrabold text-primary font-mono">{tokens}M <span className="text-xs text-textMuted font-sans">Tokens</span></span>
            </div>
            <input
              type="range"
              min="10"
              max="2000"
              value={tokens}
              onChange={(e) => setTokens(parseInt(e.target.value))}
              className="w-full h-2 bg-border border border-borderHover rounded-lg appearance-none cursor-pointer accent-primary outline-none hover:bg-borderHover transition-colors"
            />
            <div className="flex justify-between text-[10px] font-bold text-textMuted tracking-widest font-mono">
              <span>10M</span>
              <span>1000M</span>
              <span>2000M</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-surfaceHover border border-border shadow-sm rounded-3xl p-8 text-center flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
            <div className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-3">传统按量付费 (年)</div>
            <div className="text-3xl font-extrabold text-textMain font-mono">${(payAsYouGo * 12).toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-b from-primary/10 to-transparent border border-primary/20 shadow-glow-primary rounded-3xl p-8 text-center flex flex-col justify-center relative overflow-hidden group/card hover:-translate-y-1 transition-transform duration-300">
            <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3 relative z-10">KORE 质押后年度节省</div>
            <div className="text-4xl font-black text-textHeader font-mono group-hover/card:scale-105 transition-transform duration-500 relative z-10">${(koresavings * 12).toLocaleString()}</div>
            <div className="text-[10px] font-bold text-success mt-4 animate-pulse-slow bg-success/10 w-max mx-auto px-3 py-1 rounded-full border border-success/20 uppercase tracking-widest inline-block shadow-sm relative z-10">节省 100%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderSection = () => (
  <header className="py-24 relative z-10 flex flex-col items-center justify-center text-center animate-fade-in-up opacity-0 fill-mode-forwards">
    <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
      首个通缩型 AI API 网关
    </div>
    <div className="animate-text-reveal overflow-hidden px-4 mb-8">
      <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tighter text-textHeader leading-[1.1] max-w-5xl">
        将 AI 算力转化为 <br className="hidden sm:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-accent italic pb-2 pb-4 inline-block transform hover:scale-105 transition-transform duration-500">通缩资产</span>
      </h1>
    </div>
    <p className="text-textMuted text-lg sm:text-xl max-w-3xl leading-relaxed mb-16 px-6 font-medium animate-fade-in-up delay-300 opacity-0 fill-mode-forwards">
      KORE 捕获了 AI 模型官方价与协议套利成本之间的巨大利差。每一笔 API 调用都在为 $KORE 提供回购动力，构建最真实的 AI 价值底座。
    </p>

    {/* Metric Highlights */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mb-20 px-4 animate-fade-in-up delay-400 opacity-0 fill-mode-forwards">
      {[
        { label: "当前 API 折扣率", value: "92% OFF", color: "from-primary to-cyanHighlight" },
        { label: "每日回购金额", value: "$142,500", color: "from-blue-600 to-indigo-600" },
        { label: "累计销毁比例", value: "42.7%", color: "from-indigo-600 to-accent" }
      ].map((metric, i) => (
        <div key={i} className="bg-surface rounded-3xl p-8 shadow-bento hover:shadow-bento-hover hover:-translate-y-2 transition-all duration-500 group border border-border relative overflow-hidden">
          <div className="text-[10px] font-bold text-textMuted uppercase tracking-widest mb-4 group-hover:text-textMain transition-colors relative z-10">{metric.label}</div>
          <div className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br ${metric.color} tracking-tight group-hover:scale-110 transition-transform duration-500 origin-left relative z-10`}>
            {metric.value}
          </div>
        </div>
      ))}
    </div>

    {/* Central API Bar */}
    <div className="w-full max-w-3xl relative group px-4 animate-fade-in-up delay-500 opacity-0 fill-mode-forwards">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyanHighlight to-primary rounded-[2rem] blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-1000"></div>
      <div className="relative flex flex-col sm:flex-row items-center bg-surface border border-border rounded-[2rem] p-3 shadow-bento pl-6 sm:pl-8 gap-4 sm:gap-0 transform group-hover:-translate-y-1 transition-transform duration-500">
        <span className="text-textMuted font-mono text-sm tracking-wide select-none hidden sm:block">https://api.kore.so/v1</span>
        <div className="flex-1 w-full sm:w-auto flex justify-center py-4 px-6 bg-surfaceHover rounded-2xl border border-border/50 font-mono text-sm overflow-hidden mx-0 sm:mx-4 relative group/inner">
          <span className="text-textMain font-bold tracking-tight relative z-10">/chat/completions</span>
        </div>
        <button className="w-full sm:w-auto px-8 py-4 bg-textHeader text-white text-sm font-extrabold tracking-wide rounded-[1.25rem] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group/btn relative overflow-hidden">
          <Copy className="w-4 h-4 group-hover/btn:scale-110 transition-transform relative z-10" /> <span className="relative z-10">复制端点</span>
        </button>
      </div>
    </div>
  </header>
);


export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="h-screen bg-background text-textMain flex selection:bg-surfaceHover relative overflow-hidden font-sans">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <GlowOrb className="-top-48 -left-48 w-[600px] h-[600px] opacity-[0.2]" color="#2563EB" />
      <GlowOrb className="top-1/4 -right-48 w-[800px] h-[800px] opacity-[0.1]" color="#8B5CF6" />
      <GlowOrb className="-bottom-32 left-1/3 w-[600px] h-[600px] opacity-[0.15]" color="#0891B2" />

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-6 sm:p-10 lg:px-20 lg:py-16 overflow-y-auto relative z-10 custom-scrollbar">
        {activeTab === 'home' && (
          <div className="max-w-[1400px] mx-auto animate-fade-in-up">
            <HeaderSection />
            <FeaturedModels />
            <ROICalculator />
            <CodeIntegration />
            <LiveArbitrageTicker />
          </div>
        )}
        {activeTab === 'models' && <div className="max-w-[1200px] mx-auto pt-6"><ModelTable /></div>}
        {activeTab === 'keys' && <div className="max-w-[1200px] mx-auto pt-6"><KeysSection /></div>}
        {activeTab === 'usage' && <div className="max-w-[1400px] mx-auto pt-6"><AssetsSection /></div>}

        <footer className="mt-20 pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-textMuted font-medium pb-20 md:pb-0 relative z-10">
          <div className="flex items-center gap-2">
            <div className="text-sm">© 2024 KORE Network.</div>
            <div className="w-1.5 h-1.5 rounded-full bg-border mx-2 border shadow-sm"></div>
            <div className="text-xs uppercase tracking-widest opacity-70">去中心化 AI 网关</div>
          </div>
          <div className="flex gap-6 text-sm">
            <button className="hover:text-primary transition-colors">Twitter</button>
            <button className="hover:text-primary transition-colors">GitHub</button>
            <button className="hover:text-primary transition-colors">Docs</button>
            <button className="hover:text-primary transition-colors">Terms</button>
          </div>
        </footer>
      </main>
    </div>
  );
}
