import {
  createAgent,
  ICredentialIssuer,
  IDIDManager,
  IKeyManager,
  IResolver,
} from "@veramo/core";
import {CredentialIssuer} from "@veramo/credential-w3c";
import {DIDManager} from "@veramo/did-manager";
import {WebDIDProvider} from "@veramo/did-provider-web";
import {DIDResolverPlugin} from "@veramo/did-resolver";
import {
  KeyManager,
  MemoryKeyStore,
  MemoryPrivateKeyStore,
} from "@veramo/key-manager";
import {KeyManagementSystem} from "@veramo/kms-local";
import {Resolver} from "did-resolver";
import {getResolver as webDidResolver} from "web-did-resolver";
import {db} from "../db";
import {DataStore} from "./data-store";
import {DidStore} from "./did-store";

export const agent = createAgent<
  IResolver & IDIDManager & IKeyManager & ICredentialIssuer
>({
  plugins: [
    new DataStore(db),
    new KeyManager({
      store: new MemoryKeyStore(),
      kms: {
        local: new KeyManagementSystem(new MemoryPrivateKeyStore()),
      },
    }),
    new DIDManager({
      store: new DidStore(),
      defaultProvider: "did:web",
      providers: {
        "did:web": new WebDIDProvider({
          defaultKms: "local",
        }),
      },
    }),
    new CredentialIssuer(),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...webDidResolver(),
      }),
    }),
  ],
});

export type Agent = typeof agent;
