import { useWallet, WalletStatus } from '@terra-money/wallet-provider';

export const ConnectWallet = () => {
  const {
    status,
    network,
    wallets,
    availableConnectTypes,
    availableConnections,
    connect,
    disconnect,
  } = useWallet();

  return (
    <div>
      {/* <section>
        <pre>
          {JSON.stringify(
            {
              status,
              network,
              wallets,
              availableConnectTypes,
            },
            null,
            2,
          )}
        </pre>
      </section> */}

      <div className="App-header">
        {status === WalletStatus.WALLET_NOT_CONNECTED && (
          <>
            {availableConnectTypes.map((connectType) => (
              <button
                key={'connect-' + connectType}
                onClick={() => connect(connectType)}
                className="bg-[#333] text-[white] p-3 m-4 rounded-[8px]"
              >
                Connect {connectType}
              </button>
            ))}
            <br />
            {availableConnections.map(
              ({ type, name, icon, identifier = '' }) => (
                <button
                  key={'connection-' + type + identifier}
                  onClick={() => connect(type, identifier)}
                >
                  <img
                    src={icon}
                    alt={name}
                    style={{ width: '1em', height: '1em' }}
                  />
                  {name} [{identifier}]
                </button>
              ),
            )}
          </>
        )}
        {status === WalletStatus.WALLET_CONNECTED && (
          <button onClick={() => disconnect()} className="bg-[#666] text-[white] p-3 m-4 rounded-[8px]">Disconnect</button>
        )}
      </div>
    </div>
  );
}
