import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { tap, flatMap, map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

export type DynamicEnvironment = any;
export const DYNAMIC_ENVIRONMENT = new InjectionToken<DynamicEnvironment>('DYNAMIC_ENVIRONMENT');

export function env(
  environment:any, 
  url:string='/assets/environments/environment.json'
): Observable<DynamicEnvironment> {
  return from(fetch(url)).pipe(
    flatMap(x => x.json()),
    map(x => Object.assign(environment, x) )
  );
}

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class NgxHttpEnvModule { }
