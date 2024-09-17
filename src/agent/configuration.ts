/**
 * Define the configurable parameters for the agent.
 */

import { RunnableConfig } from "@langchain/core/runnables";

export interface Configuration {
  /**
   * Placeholder: you can define custom configuration to change the behavior of
   * your graph!
   */
  modelName: string;
}

export function ensureConfiguration(config?: RunnableConfig): Configuration {
  /**
   * Create a Configuration instance from a RunnableConfig object.
   */
  const configurable = config?.configurable ?? {};
  return {
    modelName: configurable.modelName ?? "my-model",
  };
}
