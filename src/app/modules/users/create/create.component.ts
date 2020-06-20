import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserDto } from "@core/dto/user.dto";
import { FormMessages } from "@core/constants";
import { Router } from "@angular/router";
import { UsersService } from "@core/services/users.service";
import { CustomsValidators } from "@core/validators/customs.validators";
import { StandardResponseDto } from "@core/dto/standard-response.dto";
import { NgbDate, NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { NgbDateCustomParserFormatter } from "@core/utils/dateformat.util";
import * as moment from "moment";
import { UserBirthdateDto } from "@core/dto/user-birthdate.dto";

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    providers: [
        {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
    ]
})
export class CreateComponent implements OnInit {

    // form to register
    public createUserForm: FormGroup;

    // dto for handle form validations
    public userDto: UserDto = {
        firstname: '',
        lastname: '',
        birthdate: '',
    };

    // variable for check if form was try to submit
    public formSubmitted = false;

    // variable to animate buttons or others when front is connecting to backend service.
    public loadingButton = false;

    // form error/info messages
    public _messages = FormMessages;

    // date format
    readonly DT_FORMAT = 'DD-MM-YYYY';

    // show results for user data
    public showResult = false;

    // dto to handle data of response
    public userBirthdate: UserBirthdateDto;

    // service errors
    public businessErrorMsg = '';

    /**
     *
     *  Contructor
     *
     * @author Jorge Silva Aguilera
     */
    constructor(
        private formBuilder: FormBuilder,
        private userService: UsersService,
    ) {
    }


    /**
     *
     *  Initialize stuffs. ex.: form rules
     *
     * @author Jorge Silva Aguilera
     */
    ngOnInit() {

        const dto: UserDto = this.userDto;
        this.createUserForm = this.formBuilder.group({
            firstname: [
                dto.firstname, Validators.compose([
                    CustomsValidators.notBlank,
                    Validators.required,
                    Validators.maxLength(140),
                ]),
            ],
            lastname: [
                dto.lastname, Validators.compose([
                    CustomsValidators.notBlank,
                    Validators.required,
                    Validators.maxLength(140),
                ]),
            ],
            birthdate: [
                dto.birthdate, Validators.compose([
                    CustomsValidators.notBlank,
                    Validators.required,
                    Validators.maxLength(10),
                    Validators.minLength(10),
                ]),
            ],
        });
    }


    /**
     *
     *      Obtain controls of formcontrol var
     *
     * @author Jorge Silva Aguilera
     */
    public get form() { return this.createUserForm.controls; }


    /**
     *
     *      Keybind enter submit form
     *
     * @param event KeyboardEvent
     * @author Jorge Silva Aguilera
     */
    @HostListener('document:keypress', ['$event'])
    async handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            await this.create();
        }
    }


    /**
     *
     *      Perform valid form rules and run animations.
     *
     * @author Jorge Silva Aguilera
     */
    public isValid() {

        this.loadingButton = true;
        this.formSubmitted = true;
        this.businessErrorMsg = '';

        // Si el formulario no es válido, termina aquí
        if (!this.createUserForm.valid) {
            setTimeout(() => { this.loadingButton = false; }, 300);
            return false;
        } else {
            return true;
        }
    }


    /**
     *
     *      Check data and call to service
     *
     * @author Jorge Silva Aguilera
     */
    public async create() {

        if (!this.isValid()) {
            return false;
        }

        const birthdate: NgbDate = this.createUserForm.controls['birthdate'].value;
        const mdt = moment([birthdate.year, birthdate.month - 1, birthdate.day]);

        this.userDto = {
            firstname: this.createUserForm.controls['firstname'].value,
            lastname: this.createUserForm.controls['lastname'].value,
            birthdate: mdt.format(this.DT_FORMAT),
        };

        let resp: StandardResponseDto;

        try {

            resp = await this.userService.create(this.userDto).toPromise();

        } catch (e) {
            this.loadingButton = false;
            this.formSubmitted = false;
            this.businessErrorMsg = 'Ha ocurrido un error al intentar conectarse a nuestros servidores.';
            return false;
        }

        if ( resp !== null && resp !== undefined && resp.status === 'success' && resp.data.age !== null ) {

            this.userBirthdate = resp.data;

            this.showResult = true;
            this.loadingButton = false;
            this.formSubmitted = false;

            return true;

        } else if (resp !== null && resp.status === 'error' ) {
            this.showResult = false;
            this.loadingButton = false;
            this.formSubmitted = false;

            this.businessErrorMsg = resp.message;
            return true;

        } else {
            this.showResult = false;
            this.loadingButton = false;
            this.formSubmitted = false;

            this.businessErrorMsg = 'Ha ocurrido un error desconocido al procesar su solicitud.';
        }
    }


    /**
     *
     *      Show form and hide results.
     *
     *
     * @author Jorge Silva Aguilera
     */
    public startOver() {
        this.showResult = false;
    }
}
