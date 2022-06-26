export function checkEmailAddress(email: string): boolean {
    // https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const regexp =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    return regexp.test(email)
}
