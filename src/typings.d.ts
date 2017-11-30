/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// interface Runtime {
//   requireHyperty(hypertyURL: string, reuse: boolean): Promise<any>
// }

// interface Rethink {

//   default: {
//     install(config: any): Promise<Runtime>
//   },

//   install(config: any): Promise<Runtime>
// }

// declare let rethink: Rethink;

// declare module "runtime-browser" {
//   export default rethink;
// }

declare module "runtime-browser" {

  interface Runtime {
    requireHyperty(hypertyURL: string, reuse: boolean): Promise<any>
  }

  interface Rethink {

    default: {
      install(config: any): Promise<Runtime>
    },

    install(config: any): Promise<Runtime>
  }

  const rethink:Rethink;

  export default rethink;

}
