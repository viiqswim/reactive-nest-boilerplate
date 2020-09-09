import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import * as serviceAccountJson from '../../firebase-service-account.json';

const serviceAccount = serviceAccountJson as firebaseAdmin.ServiceAccount;
const firebaseApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    const authToken = headers.authtoken;
    const isRequestValid = this.validateRequest(authToken);

    return isRequestValid;
  }

  async validateRequest(authToken) {
    const triggerUnauthorized = () => {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    };

    if (!authToken || authToken === 'undefined') {
      triggerUnauthorized();
    }

    const verified = await firebaseApp.auth().verifyIdToken(authToken);
    if (!verified.uid) {
      triggerUnauthorized();
    }

    return true;
  }
}
