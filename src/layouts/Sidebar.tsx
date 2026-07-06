import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Activity, Sliders, ScrollText, Settings as SettingsIcon, 
  Wrench, Cpu, Network, PenTool, Lock, ShieldCheck, X
} from 'lucide-react';
import { AppLogo } from '@/components/AppLogo';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '@/store/useUiStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Switch } from '@/components/ui/form/Switch';

const ENGINEER_PASSWORD = 'motoriq2026';

const OPERATOR_NAV = [
  { path: '/overview', label: 'Overview', icon: LayoutDashboard },
  { path: '/analytics', label: 'Analytics', icon: Activity },
  { path: '/controls', label: 'Controls', icon: Sliders },
  { path: '/logs', label: 'Logs', icon: ScrollText },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
];

const ENGINEER_NAV = [
  { path: '/overview', label: 'Overview', icon: LayoutDashboard },
  { path: '/diagnostics', label: 'Diagnostics', icon: Wrench },
  { path: '/calibration', label: 'Calibration', icon: PenTool },
  { path: '/device', label: 'Device', icon: Cpu },
  { path: '/network', label: 'Network', icon: Network },
  { path: '/analytics', label: 'Analytics', icon: Activity },
  { path: '/logs', label: 'Logs', icon: ScrollText },
  { path: '/controls', label: 'Controls', icon: Sliders },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
];

export const Sidebar: React.FC = () => {
  const isCollapsed = useUiStore((state) => state.isSidebarCollapsed);
  const { role, setRole } = useAuthStore();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const NAV_ITEMS = role === 'ENGINEER' ? ENGINEER_NAV : OPERATOR_NAV;

  const handleRoleToggle = () => {
    if (role === 'ENGINEER') {
      // Switching back to operator — no password needed
      setRole('OPERATOR');
    } else {
      // Switching to engineer — require password
      setShowPasswordModal(true);
      setPassword('');
      setPasswordError(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ENGINEER_PASSWORD) {
      setRole('ENGINEER');
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  return (
    <>
      <aside 
        className={cn(
          "h-full bg-card border-r border-navigation/80 flex flex-col pt-6 pb-4 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className={cn("mb-10 flex", isCollapsed ? "justify-center px-0" : "px-6")}>
          <AppLogo iconOnly={isCollapsed} />
        </div>

        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto overflow-x-hidden no-scrollbar">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path + item.label}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center rounded-xl transition-all duration-200",
                  "text-text-secondary hover:text-text-primary hover:bg-navigation/50",
                  isActive && "text-primary font-medium bg-navigation/30",
                  isCollapsed ? "justify-center py-3 px-0" : "px-4 py-3 gap-3"
                )
              }
              title={isCollapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={cn("w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110", isActive && "text-primary")} />
                  {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Info & Role Toggle Footer */}
        {!isCollapsed ? (
          <div className="px-4 mt-auto">
            <div className="p-3 bg-navigation/40 rounded-xl border border-navigation/60 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0",
                  role === 'ENGINEER' 
                    ? "bg-primary/10 border-primary/40" 
                    : "bg-background border-navigation"
                )}>
                  {role === 'ENGINEER' ? (
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  ) : (
                    <span className="text-sm font-bold text-text-primary">OP</span>
                  )}
                </div>
                <div className="overflow-hidden flex-1">
                  <p className="text-sm font-semibold text-text-primary truncate">
                    {role === 'ENGINEER' ? 'Engineer' : 'Operator'}
                  </p>
                  <p className="text-xs text-text-secondary truncate">
                    {role === 'ENGINEER' ? 'Elevated Access' : 'Standard Access'}
                  </p>
                </div>
              </div>
              {/* Toggle Switch */}
              <div className="flex items-center justify-between pt-2 border-t border-navigation/50">
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-text-secondary" />
                  <span className="text-xs font-medium text-text-secondary">Eng. Mode</span>
                </div>
                <Switch 
                  checked={role === 'ENGINEER'} 
                  onCheckedChange={handleRoleToggle} 
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-auto flex flex-col items-center gap-3 pb-2">
            <Switch 
              checked={role === 'ENGINEER'} 
              onCheckedChange={handleRoleToggle}
              className="scale-75"
            />
            <div className={cn(
              "w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0",
              role === 'ENGINEER' 
                ? "bg-primary/10 border-primary/40" 
                : "bg-background border-navigation"
            )}>
              {role === 'ENGINEER' ? (
                <ShieldCheck className="w-4 h-4 text-primary" />
              ) : (
                <span className="text-xs font-bold text-text-primary">OP</span>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* Engineer Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-card border border-navigation/60 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-sora font-semibold text-text-primary">Engineer Access</h3>
                    <p className="text-xs text-text-secondary">Enter password to continue</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPasswordModal(false)}
                  className="p-1.5 rounded-lg hover:bg-navigation/50 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }}
                  placeholder="Enter engineer password"
                  autoFocus
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border bg-background text-text-primary text-sm font-monospace",
                    "placeholder:text-text-secondary/50 outline-none transition-all",
                    "focus:ring-2 focus:ring-primary/30 focus:border-primary/50",
                    passwordError 
                      ? "border-danger ring-2 ring-danger/20" 
                      : "border-navigation/60"
                  )}
                />
                {passwordError && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-danger mt-2 flex items-center gap-1.5"
                  >
                    <Lock className="w-3 h-3" /> Incorrect password. Access denied.
                  </motion.p>
                )}

                <div className="flex gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-navigation/60 text-text-secondary text-sm font-medium hover:bg-navigation/30 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors active:scale-[0.98]"
                  >
                    Authenticate
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
