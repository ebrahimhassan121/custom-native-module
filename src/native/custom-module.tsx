import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

const module = NativeModules.CustomNativeModule;
const eventEmitter = new NativeEventEmitter(module);
export type METADATA = Record<string, string | number>;
export type EVENTMETADATA = METADATA & {seconds: number};
class CustomModule {
  readonly eventName = 'myEventName';
  interval: number;
  metaData: METADATA;
  linstner: EmitterSubscription | undefined;

  constructor(interval: number, metaData: METADATA) {
    this.interval = interval;
    this.metaData = metaData;
  }

  startEvent(onChange: (event: EVENTMETADATA) => void) {
    if (this.linstner) {
      return;
    }
    module.startEvent(this.interval, this.metaData);
    this.linstner = eventEmitter.addListener(this.eventName, onChange);
  }

  stopEvent() {
    module.stopEvent();
    this.linstner?.remove();
    this.linstner = undefined;
  }
}
export default CustomModule;
