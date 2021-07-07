import countapi from 'countapi-js';
import { Dispatch, SetStateAction } from 'react';

export class Counter {
  namespace: string;
  key: string;
  setCounter: Dispatch<SetStateAction<number>>;

  constructor(
    namespace: string,
    key: string,
    setCounter: Dispatch<SetStateAction<number>>
  ) {
    this.namespace = namespace;
    this.key = key;
    this.setCounter = setCounter;
  }

  async getValue() {
    const result = await countapi.get(this.namespace, this.key);
    if (result.status === 200) {
      this.setCounter(result.value);
      return;
    }

    throw new Error('Could not fetch counter value');
  }

  async increment() {
    const result = await countapi.update(this.namespace, this.key, 1);
    if (result.status === 200) {
      this.setCounter(result.value);
      return;
    }

    throw new Error('Could not increment counter');
  }

  async decrement() {
    const result = await countapi.update(this.namespace, this.key, -1);
    if (result.status === 200) {
      this.setCounter(result.value);
      return;
    }

    throw new Error('Could not decrement counter');
  }
}
