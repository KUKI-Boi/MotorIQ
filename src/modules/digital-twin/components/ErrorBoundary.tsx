import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class DigitalTwinErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Digital Twin Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-background border border-navigation rounded-xl p-6 text-center">
          <AlertOctagon className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-sora font-semibold text-text-primary mb-2">3D Viewer Unavailable</h3>
          <p className="text-sm text-text-secondary max-w-sm mb-6">
            We encountered an error loading the digital twin model. This may be due to an unsupported WebGL context or missing model files.
          </p>
          <button 
            className="px-4 py-2 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 transition-colors"
            onClick={() => this.setState({ hasError: false })}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
