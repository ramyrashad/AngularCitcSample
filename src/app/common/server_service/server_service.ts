import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HTMLModel } from "../server_models/server_model";


@Injectable({
    providedIn: 'root'
})
export class ServerService {

    constructor(private http: HttpClient) { }

    getHTMLContent() {
        const baseToken = this.generateBaseAuthorizationToken();
        return this.http.get<HTMLModel>("https://individualsui.saudisystems.net/ui", {
            headers: { 'Authorization': 'Basic ' + baseToken }
        }).toPromise();
    }

    private generateBaseAuthorizationToken(): string {
        return btoa(environment.ClientId + ':' + environment.ClientSecret);
    }
}