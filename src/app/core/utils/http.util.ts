import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpUtil {

    static readonly CONTENT_TYPE: string = 'Content-Type';
    static readonly APPLICATION_JSON_UTF8: string = 'application/json; charset=utf-8';

    constructor(private readonly http: HttpClient) {
    }

    /**
     *
     *
     *      Send post and expect a json in response
     *
     * @param {string} url
     * @param body
     * @return {Observable<T>}
     * @author Jorge Silva Aguilera
     */
    public postJson<T>(url: string, body: any ): Observable<T> {
        let headersAux = new HttpHeaders();
        headersAux = headersAux.set(HttpUtil.CONTENT_TYPE, HttpUtil.APPLICATION_JSON_UTF8);
        return this.http.post<T>(url, body, {
            headers: headersAux,
            responseType: 'json'
        });
    }


    /**
     *      Send get and expect a json in response
     *
     * @param {string} url
     * @return {Observable<T>}
     * @author Jorge Silva Aguilera
     */
    public getJson<T>(url: string): Observable<T> {
        let headersAux = new HttpHeaders();
        headersAux = headersAux.set(HttpUtil.CONTENT_TYPE, HttpUtil.APPLICATION_JSON_UTF8);
        return this.http.get<T>(url, {headers: headersAux, responseType: 'json'});
    }


    /**
     *
     *      Send put and expect a json in response
     *
     * @param {string} url
     * @param {any | null} body
     * @return {Observable<T>}
     */
    public putJson<T>(url: string, body: any | null): Observable<T> {
        let headersAux = new HttpHeaders();
        headersAux = headersAux.set(HttpUtil.CONTENT_TYPE, HttpUtil.APPLICATION_JSON_UTF8);
        return this.http.put<T>(url, body, {
            headers: headersAux,
            responseType: 'json'
        });
    }
}
