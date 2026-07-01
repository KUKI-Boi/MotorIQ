import type { LucideIcon } from 'lucide-react';
import { PageContainer, PageHeader } from '@/components/PageContainer';
import { motion } from 'framer-motion';

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  description?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, subtitle, icon: Icon, description }) => (
  <PageContainer>
    <PageHeader title={title} subtitle={subtitle} />
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-b from-card to-card/50 border border-navigation/50 rounded-3xl shadow-sm p-6"
    >
      <div className="p-8 bg-navigation/30 rounded-full mb-8 relative group">
        <div className="absolute inset-0 bg-primary/5 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        <Icon className="w-20 h-20 text-primary/80 relative z-10" strokeWidth={1.5} />
      </div>
      <h2 className="text-3xl font-sora font-semibold text-text-primary mb-3">Coming Soon</h2>
      <p className="text-text-secondary max-w-md text-center text-lg">
        {description || "This view is scheduled for implementation in the next milestone."}
      </p>
    </motion.div>
  </PageContainer>
);
