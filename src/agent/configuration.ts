/**
 * Define the configurable parameters for the agent.
 */

import { RunnableConfig } from "@langchain/core/runnables";

export interface Configuration {
  /**
   * Placeholder: you can define custom configuration to change the behavior of
   * your graph!
   */
  model: string;
}

export function ensureConfiguration(config: RunnableConfig): Configuration {
  /**
   * Pull a default `configurable` field from a RunnableConfig object.
   */
  const configurable = config.configurable ?? {};
  return {
    model: configurable.model ?? "my-model",
  };
}
