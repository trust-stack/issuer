import { createAgent, ICredentialPlugin, IDIDManager, IKeyManager, IResolver } from '@veramo/core';
import { CredentialPlugin } from '@veramo/credential-w3c';
import { IDataStore } from '@veramo/data-store';
import { DIDManager } from '@veramo/did-manager';
import { WebDIDProvider } from '@veramo/did-provider-web';
import { DIDResolverPlugin } from '@veramo/did-resolver';
import { KeyManager } from '@veramo/key-manager';
import { KeyManagementSystem } from '@veramo/kms-local';
import { Resolver } from 'did-resolver';
import { getResolver as webDidResolver } from 'web-did-resolver';
import { db } from '../db';
import { DataStore } from './data-store';
import { DidStore } from './did-store';
import { KeyStore } from './key-store';
import { PrivateKeyStore } from './private-key-store';

export const agent = createAgent<
  IDIDManager & IKeyManager & IDataStore & IResolver & ICredentialPlugin
>({
  plugins: [
    new DataStore(db),
    new KeyManager({
      store: new KeyStore(),
      kms: {
        local: new KeyManagementSystem(new PrivateKeyStore()),
      },
    }),
    new DIDManager({
      store: new DidStore(),
      defaultProvider: 'did:web',
      providers: {
        'did:web': new WebDIDProvider({
          defaultKms: 'local',
        }),
      },
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...webDidResolver(),
      }),
    }),
    new CredentialPlugin(),
  ],
});

export type Agent = typeof agent;
