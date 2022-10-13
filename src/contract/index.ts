import type { Env } from "@terra-money/terrain";
import { FBLProjectClient } from './clients/FBLProjectClient';

export class Lib extends FBLProjectClient {
  env: Env;

  constructor(env: Env) {
    super(env.client, env.defaultWallet, env.refs['FBL-project'].contractAddresses.default);
    this.env = env;
  }
};

export default Lib;
