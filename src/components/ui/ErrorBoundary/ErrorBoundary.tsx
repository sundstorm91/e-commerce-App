import { Component, type ErrorInfo, type ReactNode } from 'react';

interface IErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IState> {
  state: IState = { hasError: false };

  static getDerivedStateFromError(_: Error): IState {
    /* ошибка происходит - флажок !! */
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
