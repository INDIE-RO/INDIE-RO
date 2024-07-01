import { Component, ElementType, ErrorInfo, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  fallback: ElementType;
}

interface State {
  hasError: boolean;
  info: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, info: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, info: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    const { hasError, info } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <this.props.fallback error={info} />;
    }

    return children;
  }
}

export default ErrorBoundary;
