export function isSubsetOf(set: any[], subset: any[]) {
  return Array.from(new Set([...set, ...subset])).length === set.length;
}
