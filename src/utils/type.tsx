// https://github.com/Microsoft/TypeScript/issues/29729
//可提示字面量
export type LiteralUnion<T extends U, U = string> = T | (U & {});
// 排除部分字段
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
