// * ... https://github.com/microsoft/TypeScript/issues/56080
export type Tuple<T1, T2 = never> = /*__CAST `never` TO__*/ [] & T2 extends never ? [T1, T1] : [T1, T2];
