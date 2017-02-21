interface Runtime {
  requireHyperty(hypertyURL: string): Promise<any>
}

interface Rethink {
  install(config: any): Promise<Runtime>
}

declare let rethink: Rethink;

declare module "runtime-browser" {
  export default rethink;
}
