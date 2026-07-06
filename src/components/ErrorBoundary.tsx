import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';
import { Button } from './ui/button/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/layout';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center p-6 bg-background">
          <Card className="max-w-md w-full border-danger/20">
            <CardHeader>
              <CardTitle className="text-danger flex items-center gap-2">
                <AlertOctagon className="w-5 h-5" />
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-surface rounded-md border border-navigation overflow-auto max-h-48 text-sm font-mono text-text-secondary">
                {this.state.error?.message || 'Unknown application error'}
              </div>
              <p className="text-sm text-text-secondary">
                The application encountered an unexpected error. You can try recovering by resetting the view.
              </p>
              <Button onClick={this.handleReset} variant="outline" className="w-full justify-center">
                <RefreshCw className="w-4 h-4 mr-2" /> Try again
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
