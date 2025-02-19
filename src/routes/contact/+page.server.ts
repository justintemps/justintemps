import type { Actions } from "./$types";

export const actions = {
  default: async (event) => {
    return { success: true };
  }
} satisfies Actions;
