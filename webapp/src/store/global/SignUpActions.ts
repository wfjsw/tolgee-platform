import {singleton} from 'tsyringe';
import {SignUpService} from '../../service/SignUpService';
import {AbstractLoadableActions, StateWithLoadables} from "../AbstractLoadableActions";

export class SignUpState extends StateWithLoadables<SignUpActions> {
}

@singleton()
export class SignUpActions extends AbstractLoadableActions<SignUpState> {
    readonly loadableDefinitions = {
        signUp: this.createLoadableDefinition(v => {
            v.callbackUrl = window.location.protocol + "//" + window.location.host
            return this.service.signUp(v);
        }),
        verifyEmail: this.createLoadableDefinition((userId, code) => this.service.verifyEmail(userId, code))
    };

    constructor(private service: SignUpService) {
        super(new SignUpState());
    }

    get prefix(): string {
        return 'SIGN_UP';
    }
}