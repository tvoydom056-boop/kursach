import React, { type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  title?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Ошибка рендера, перехваченная ErrorBoundary:', error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <section className="card error-boundary" role="alert">
          <p className="panel-label">Render error</p>
          <h2 className="subsection-title">
            {this.props.title ?? 'Не удалось отрисовать страницу'}
          </h2>
          <p className="body-text">
            Компонент столкнулся с ошибкой во время рендера. Приложение продолжает
            работать, а экран можно попробовать открыть повторно.
          </p>
          {this.state.error ? (
            <pre className="error-boundary-details">
              <code>{this.state.error.message}</code>
            </pre>
          ) : null}
          <button
            type="button"
            className="cta-button primary"
            onClick={this.handleReset}
            aria-label="Повторить рендер страницы после ошибки"
          >
            Попробовать снова
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
