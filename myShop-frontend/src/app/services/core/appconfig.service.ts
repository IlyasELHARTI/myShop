import { Injectable } from '@angular/core';
import { Config } from 'src/app/model/config';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {

  private config: Config = null;

  public getConfig() : Config {
    return this.config;
  }

  // Load config
    public load(): Promise<Config> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const url = './assets/config/config.json';
            xhr.open('GET', url);
            //xhr.setRequestHeader('Authorization', 'Basic ' + token);
            xhr.addEventListener('readystatechange', () => {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    if (xhr.responseText) {
                        this.config = JSON.parse(xhr.responseText);
                        resolve(this.config);
                    }
                } else if (xhr.readyState === XMLHttpRequest.DONE) {
                    resolve(null);
                }
            });
            xhr.send(null);

        });
    }
}
