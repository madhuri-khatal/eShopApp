declare module 'react-native-voice' {
  export function start(language: string): Promise<void>;
  export function stop(): Promise<void>;
  export function cancel(): Promise<void>;
  export function destroy(): Promise<void>;

  export interface VoiceEvent {
    value: string[];
  }

  export const onSpeechResults: (event: VoiceEvent) => void;
  export const onSpeechStart: () => void;
  export const onSpeechEnd: () => void;

  export function addEventListener(
    event: string,
    callback: (event: any) => void,
  ): void;
  export function removeEventListener(
    event: string,
    callback: (event: any) => void,
  ): void;

  export function removeAllListeners(removeAllListeners: any) {
    throw new Error('Function not implemented.');
  }
}
