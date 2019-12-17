import ErrorHandlerPopUp from './ErrorHandlerPopUp.js'

export default function SubscribeOnError(err,popUpParameter) {
    var errorHandlerPopUp = new ErrorHandlerPopUp();
    errorHandlerPopUp.open(err, popUpParameter);
}