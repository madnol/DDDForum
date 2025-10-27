

import { httpClient } from "./httpClient";

import type { RegistrationInput } from "../components/registrationForm";

export const api = {
    posts: {
        getPosts: async () => httpClient.get('/posts?sort=recent')
    },
    register: (input: RegistrationInput) => httpClient.post('/users/new', {
        ...input
    })

}