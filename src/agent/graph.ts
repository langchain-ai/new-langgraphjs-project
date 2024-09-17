/**
 * Empty LangGraph Template
 *
 * Make this code your own!
 */

import { StateGraph } from "@langchain/langgraph";
import { StateAnnotation, State } from "./state.js";
import { AIMessage } from "@langchain/core/messages";
import { ensureConfiguration } from "./configuration.js";
import { RunnableConfig } from "@langchain/core/runnables";

// Define nodes, these do the work:

const callModel = async (_state: State, config: RunnableConfig) => {
  // Do some work... (e.g. call an LLM)
  const configuration = ensureConfiguration(config);
  return {
    messages: [new AIMessage(`Hi, there! This is ${configuration.modelName}`)],
  };
};

// Define conditional edge logic:

/**
 * Routing function: Determines whether to continue research or end the builder.
 * This function decides if the gathered information is satisfactory or if more research is needed.
 *
 * @param state - The current state of the research builder
 * @returns Either "callModel" to continue research or END to finish the builder
 */
export const _route = (state: State): "__end__" | "callModel" => {
  if (state.messages.length > 0) {
    return "__end__";
  }
  // Loop back
  return "callModel";
};

// Finally, create the graph itself.
const builder = new StateGraph(StateAnnotation)
  // Add the nodes to do the work.
  // Chaining the nodes together in this way
  // updates the types of the StateGraph instance
  // so you have static type checking when it comes time
  // to add the edges.
  .addNode("callModel", callModel)
  // Regular edges mean "always transition to node B after node A is done"
  // The "__start__" and "__end__" nodes are "virtual" nodes that are always present
  // and represent the beginning and end of the builder.
  .addEdge("__start__", "callModel")
  // Conditional edges optionally route to different nodes (or end)
  //
  .addConditionalEdges("callModel", _route);

export const graph = builder.compile();
graph.name = "New Agent";
