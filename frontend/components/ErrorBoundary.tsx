'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="glass-card rounded-xl p-10 max-w-md text-center">
            <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '48px' }}>
              error_outline
            </span>
            <h1 className="font-headline-md text-headline-md text-on-surface mb-3">
              משהו השתבש
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              אירעה שגיאה בלתי צפויה. נסו לרענן את הדף.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-electric text-white px-6 py-2 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-widest hover:scale-105 transition-all glow-purple"
            >
              רענן
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
