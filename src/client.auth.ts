import { FirebaseApp, initializeApp } from 'firebase/app'
import {
    getAuth,
    isSignInWithEmailLink,
    onAuthStateChanged,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    signOut,
    User,
} from 'firebase/auth'
import { useEffect, useState } from 'react'

// main doc https://firebase.google.com/docs/auth/web/email-link-auth

export const LOCAL_STORAGE_EMAIL = 'emailForSignIn'

let firebaseApp: FirebaseApp | null = null

export function initFirebaseApp() {
    // prevent double initialization
    if (!firebaseApp) {
        // https://firebase.google.com/docs/web/setup
        const firebaseConfig = {
            apiKey: 'AIzaSyCF5qkzsY95L3b-8W-hVsAVo1-j68BTygU',
            authDomain: 'tv-shows-calendar.firebaseapp.com',
            projectId: 'tv-shows-calendar',
            storageBucket: 'tv-shows-calendar.appspot.com',
            messagingSenderId: '130288006280',
            appId: '1:130288006280:web:a0c1cae89cdc17c7149b3d',
        }
        firebaseApp = initializeApp(firebaseConfig)
    }
}

// Signin or signup, it's the exact same process
export async function onSigninSubmit(email: string): Promise<void> {
    const auth = getAuth()
    await sendSignInLinkToEmail(auth, email, {
        // The domain has to be authorized in the Firebase Console
        url: `http://${window.location.host}/signinlink`,
        handleCodeInApp: true,
    })
    window.localStorage.setItem(LOCAL_STORAGE_EMAIL, email)
}

export async function onEmailConfirmSubmit(email: string): Promise<void> {
    await signInWithEmailLink(getAuth(), email, window.location.href)
    window.localStorage.removeItem(LOCAL_STORAGE_EMAIL)
    window.location.href = '/'
}

export async function tryToSignIfComingFromLink(): Promise<
    'success' | 'needEmailConfirmation' | 'error' | 'notASigninLink'
> {
    if (isSignInWithEmailLink(getAuth(), window.location.href)) {
        let email = window.localStorage.getItem(LOCAL_STORAGE_EMAIL)
        if (email) {
            try {
                await signInWithEmailLink(
                    getAuth(),
                    email,
                    window.location.href,
                )
                window.localStorage.removeItem(LOCAL_STORAGE_EMAIL)
                window.location.href = '/'
                return 'success'
            } catch (e) {
                console.error(e)
                return 'error'
            }
        } else {
            // The user clicked the link on a different device, we have to ask for his email again (cf Firebase doc)
            return 'needEmailConfirmation'
        }
    }
    return 'notASigninLink'
}

export async function doSignOut(): Promise<void> {
    const auth = getAuth()
    await signOut(auth)
}

export function useUser(): User | null {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        // on profite que la topBar est partout
        initFirebaseApp()
        onAuthStateChanged(getAuth(), (u) => {
            setUser(u)
        })
    }, [setUser])
    return user
}
