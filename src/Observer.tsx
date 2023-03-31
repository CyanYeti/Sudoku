import {Observable} from './backend/Observable';
export interface Observer {
    Update(state: Observable): void;
}