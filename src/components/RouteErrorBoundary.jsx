import { Component } from 'react';

export default class RouteErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('App screen failed to render:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="route-error" role="alert">
          <p>{this.props.message}</p>
          <button className="btn primary" type="button" onClick={() => window.location.reload()}>
            {this.props.reloadLabel}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
