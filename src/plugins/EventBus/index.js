import EventBus from "./MinEventBus"

export default new EventBus()

// function useEventBus(){
//   let instance = {
//     eventMap: new Map(),
//     on: bus.on,
//     once: bus.once,
//     clear(){
//       this.eventMap.forEach((list, key)=>{
//         list.forEach(cb=>{
//           bus.off(key, cb)
//         })
//       });
//       eventMap.clear()
//     }
//   }
//   let eventMap = new Map()
//   const on = (key, cb)=>{
//     instance.on(key, cb);
//     bus.on(key, cb);
//   }

//   const once = (key, cb) => {
//     instance.once(key, cb);
//     bus.once(key, cb);
//   }
// }