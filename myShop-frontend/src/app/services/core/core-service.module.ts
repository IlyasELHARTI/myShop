import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfig } from './appconfig.service';
import { Config } from 'src/app/model/config';

export function initConfig(config: AppConfig): Promise<Config> {
  return config.load();
}

export function initApp(config: AppConfig) {
  return () => initConfig(config);
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [AppConfig]
    }
  ]
})
export class CoreServiceModule { }
