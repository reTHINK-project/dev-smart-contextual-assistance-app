interface Runtime {
  requireHyperty(hypertyURL: string, reuse: boolean): Promise<any>
}

interface Rethink {
  install(config: any): Promise<Runtime>
}

declare let rethink: Rethink;

declare module "runtime-browser" {
  export default rethink;
}
