import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background p-container-padding">
        <h1 className="text-title font-bold text-center">
          Local To-Do
        </h1>
      </header>

      {/* Content Area */}
      <main className="flex-1 p-container-padding">
        <div className="max-w-2xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background p-container-padding">
        <div className="text-small text-center opacity-70">
          Local-only To-Do App
        </div>
      </footer>
    </div>
  );
}
