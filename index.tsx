
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Mounting error:", error);
  rootElement.innerHTML = `<div style="padding: 20px; text-align: center;">
    <h1 style="font-family: serif;">Something went wrong.</h1>
    <p>Please check the console for details.</p>
  </div>`;
}
