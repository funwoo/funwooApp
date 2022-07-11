import EE from 'eventemitter3';
import {LoadingStatus} from '../components/feature/Spinner';

const funwooEvent = new EE();

export const loadingEventEmitter = {
  on: (fn: (status: LoadingStatus) => void) => funwooEvent.on('loading', fn),
  off: (fn: (status: LoadingStatus) => void) => funwooEvent.off('loading', fn),
  emit: (status: LoadingStatus) => funwooEvent.emit('loading', status),
};
