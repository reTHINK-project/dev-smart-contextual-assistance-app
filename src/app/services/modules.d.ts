interface Runtime {
  requireHyperty(hypertyURL: string, reuse: boolean): Promise<any>
}

interface Rethink {

  default: {
    install(config: any): Promise<Runtime>
  },

  install(config: any): Promise<Runtime>
}

declare let rethink: Rethink;

declare module "runtime-browser" {
  export default rethink;
}
