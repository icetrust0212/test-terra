import { getChainOptions, WalletProvider } from '@terra-money/wallet-provider';
import App from './App';
import ReactDOM from 'react-dom';
import './index.css';
import { Toaster } from 'react-hot-toast';

getChainOptions().then((chainOptions) => {
  ReactDOM.render(
    <WalletProvider {...chainOptions}>
      <Toaster toastOptions={{
        // Default options for specific types
        success: {
          duration: 3000,
          theme: {
            primary: 'green',
            secondary: 'black',
          },
        },
        error: {
          duration: 3000
        },
        loading: {
          duration: 3000,
          theme: {
            primary: 'yellow',
            secondary: 'black'
          }
        }
      }} />
      <App />
    </WalletProvider>,
    document.getElementById('root'),
  );
});
