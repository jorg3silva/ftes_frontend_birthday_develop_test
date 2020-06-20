import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpUtil } from '@core/utils/http.util';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StandardResponseDto } from '@core/dto/standard-response.dto';
import { map } from 'rxjs/operators';
import { UserDto } from "@core/dto/user.dto";


@Injectable({
    providedIn: 'root'
})

export class UsersService {

    private baseUrl = environment.api_url;

    constructor(
        private httpService: HttpUtil,
        private router: Router
    ) {
    }


    /**
     *
     *
     *      Create user
     *
     * @param user: UserDto = user object
     * @return StandardResponseDto and data of user.
     * @author Jorge Silva Aguilera
     */
    create( user: UserDto ): Observable<StandardResponseDto> {
        const param = {
            firstNames: user.firstname,
            lastNames: user.lastname,
            birthDate: user.birthdate,
        };

        return this.httpService.postJson<StandardResponseDto>(`${this.baseUrl}/users/create`, param)
            .pipe(map( response => {
                return response;
            }));
    }
}
